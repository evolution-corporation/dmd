/** @format */

import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Platform, UIManager, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import RootRoutes from "./routes";
import Store, { actions } from "./store";
import "./TaskManager";

if (Platform.OS === "android") {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}
const AppCore = () => {
	React.useEffect(() => {
		console.log("AppLoading");
		(async () => {
			await SplashScreen.preventAutoHideAsync();
			try {
				await Store.dispatch(actions.initialization()).unwrap();
			} catch (error) {
				console.info(error);
			}
			await SplashScreen.hideAsync();
		})();
	}, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NavigationContainer>
				<RootRoutes />
			</NavigationContainer>
		</GestureHandlerRootView>
	);
};

export default () => (
	<Provider store={Store}>
		<AppCore />
	</Provider>
);
