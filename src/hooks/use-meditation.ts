/** @format */

import React from "react";
import { Audio, AVPlaybackSource } from "expo-av";
import * as Notification from "expo-notifications";

const useMeditation = (
	source: [AVPlaybackSource, AVPlaybackSource] | [AVPlaybackSource],
	currentTime: number,
	options?: { autoPlay?: boolean }
) => {
	const audioList = React.useRef<[Audio.Sound, Audio.Sound] | [Audio.Sound]>(
		source.length === 2 ? [new Audio.Sound(), new Audio.Sound()] : [new Audio.Sound()]
	).current;
	const [isLoaded, setIsLoaded] = React.useState<[boolean, boolean]>([false, false]);

	const play = async () => {
		if (audioList.length === 1) {
			const audioStatus = await audioList[0].getStatusAsync();
			if (audioStatus.isLoaded && (audioStatus.durationMillis ?? 0) > currentTime) {
				await audioList[0].playAsync();
			}
		} else if (audioList.length === 2) {
			const audioStatus = [await audioList[0].getStatusAsync(), await audioList[1].getStatusAsync()];
			if (audioStatus[0].isLoaded && audioStatus[1].isLoaded) {
				if ((audioStatus[0].durationMillis ?? 0) > currentTime) {
					await audioList[0].playAsync();
				} else if ((audioStatus[1].durationMillis ?? 0) + (audioStatus[0].durationMillis ?? 0) > currentTime) {
					await audioList[1].playAsync();
				}
			}
		}
	};

	const pause = async () => {
		if (audioList.length === 1) {
			const audioStatus = await audioList[0].getStatusAsync();
			if (audioStatus.isLoaded) {
				await audioList[0].pauseAsync();
			}
		} else if (audioList.length === 2) {
			const audioStatus = [await audioList[0].getStatusAsync(), await audioList[1].getStatusAsync()];
			if (audioStatus[0].isLoaded && audioStatus[1].isLoaded) {
				await audioList[0].pauseAsync();
				await audioList[1].pauseAsync();
			}
		}
	};

	const setPosition = async (milliseconds: number) => {
		if (audioList.length === 1) {
			const audioStatus = await audioList[0].getStatusAsync();
			if (audioStatus.isLoaded && (audioStatus.durationMillis ?? 0) >= milliseconds) {
				await audioList[0].setPositionAsync(milliseconds);
			}
		} else if (audioList.length === 2) {
			const audioStatus = [await audioList[0].getStatusAsync(), await audioList[1].getStatusAsync()];
			if (audioStatus[0].isLoaded && audioStatus[1].isLoaded) {
				const isPlay = audioStatus[0].isPlaying && audioStatus[1].isPlaying;
				const [lengthFirstAudio, lengthSecondAudio] = [
					audioStatus[0].durationMillis ?? 0,
					audioStatus[1].durationMillis ?? 0,
				];
				// await audioList[0].pauseAsync();
				// await audioList[1].pauseAsync();
				if (lengthFirstAudio > milliseconds) {
					await audioList[0].setPositionAsync(milliseconds);
					await audioList[1].setPositionAsync(0);
				} else if (lengthFirstAudio + lengthSecondAudio > milliseconds) {
					await audioList[0].setPositionAsync(lengthFirstAudio);
					await audioList[1].setPositionAsync(milliseconds - lengthFirstAudio);
				}
			}
		}
	};

	const stop = async () => {
		if (audioList.length === 1) {
			const audioStatus = await audioList[0].getStatusAsync();
			if (audioStatus.isLoaded) {
				await audioList[0].stopAsync();
			}
		} else if (audioList.length === 2) {
			const audioStatus = [await audioList[0].getStatusAsync(), await audioList[1].getStatusAsync()];
			if (audioStatus[0].isLoaded && audioStatus[1].isLoaded) {
				await audioList[0].stopAsync();
				await audioList[1].stopAsync();
			}
		}
	};

	React.useEffect(() => {
		if (audioList.length === 1) {
			audioList[0].setOnPlaybackStatusUpdate(status => {
				setIsLoaded(previousValue => [status.isLoaded, status.isLoaded]);
			});
		} else if (audioList.length === 2) {
			audioList[0].setOnPlaybackStatusUpdate(status => {
				setIsLoaded(previousValue => [status.isLoaded, previousValue[1]]);
			});
			audioList[1].setOnPlaybackStatusUpdate(status => {
				setIsLoaded(previousValue => [previousValue[0], status.isLoaded]);
			});
		}

		Audio.setAudioModeAsync({
			staysActiveInBackground: true,
			shouldDuckAndroid: false,
			playThroughEarpieceAndroid: false,
			allowsRecordingIOS: false,
			playsInSilentModeIOS: true,
		});

		Notification.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: false,
				shouldPlaySound: true,
				shouldSetBadge: false,
			}),
			handleSuccess: console.log,
		});
		const init = async () => {
			const sourceFix = source.map(onceSource => {
				if (typeof onceSource === "object") {
					onceSource.uri = `${onceSource.uri}.mp3`;
				}
				return onceSource;
			});
			if (audioList.length === 1) {
				const status = await audioList[0].getStatusAsync();
				if (!status.isLoaded) await audioList[0].loadAsync(Array.isArray(sourceFix) ? sourceFix[0] : sourceFix, {});

				if (options?.autoPlay ?? false) audioList[0].playAsync();
			} else if (audioList.length === 2 && Array.isArray(sourceFix)) {
				const statusFirst = await audioList[0].getStatusAsync();
				if (!statusFirst.isLoaded) await audioList[0].loadAsync(sourceFix[0], {});
				const statusSecond = await audioList[1].getStatusAsync();
				if (!statusSecond.isLoaded) await audioList[1].loadAsync(sourceFix[1], {});
				audioList[0].setOnPlaybackStatusUpdate(statusOfSubscribe => {
					setIsLoaded(previousValue => [statusOfSubscribe.isLoaded, previousValue[1]]);
					if (statusOfSubscribe.isLoaded && statusOfSubscribe.didJustFinish) {
						audioList[1].playAsync();
					}
				});

				if (options?.autoPlay ?? false) {
					audioList[0].playAsync();
					audioList[1].playAsync();
				}
			}
		};

		init();

		const end = async () => {
			if (audioList.length === 1) {
				const status = await audioList[0].getStatusAsync();
				if (!status.isLoaded) await audioList[0].unloadAsync();
			} else if (audioList.length === 2 && Array.isArray(source)) {
				const statusFirst = await audioList[0].getStatusAsync();
				if (!statusFirst.isLoaded) await audioList[0].unloadAsync();
				const statusSecond = await audioList[1].getStatusAsync();
				if (!statusSecond.isLoaded) await audioList[1].unloadAsync();
			}
		};
		return () => {
			Notification.cancelScheduledNotificationAsync("EndMeditation");
			// end();
			audioList.forEach(audio => {
				audio.stopAsync();
				audio.unloadAsync();
			});
		};
	}, []);

	return { play, pause, setPosition, isLoading: isLoaded[0] && isLoaded[1], stop };
};
export default useMeditation;
