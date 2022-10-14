/** @format */

import React from "react";
import RN, { StyleSheet } from "react-native";
import * as Blur from "@react-native-community/blur";
import Quote from "/assets/icons/quote.svg";
import Tools from "~core";

interface Props extends RN.ViewProps {
	message: string;
	greeting?: string;
}

const MessageProfessor: React.FC<Props> = props => {
	const { message, greeting } = props;
	return (
		<RN.View
		// style={styles.greetingViewBackground}
		// onLayout={({ nativeEvent: { layout } }) => {
		// 	if (!heightGreeting) {
		// 		setHeightGreeting(layout.height + 20);
		// 	}
		// }}
		>
			<RN.View style={{ justifyContent: "center", alignItems: "center" }}>
				<RN.View
					style={{
						width: 180,
						height: 180,
						borderRadius: 90,
						overflow: "hidden",
					}}
				>
					<Blur.BlurView blurAmount={5} blurType={"light"} style={{ flex: 1 }} blurRadius={25}>
						<RN.Image
							source={require("/assets/555700cf-dcb3-42df-9704-13c96936d70d.png")}
							style={styles.professor}
							resizeMethod={"scale"}
							resizeMode={"center"}
						/>
					</Blur.BlurView>
				</RN.View>
				<RN.View style={styles.greetingView}>
					{greeting && (
						<>
							<RN.Text style={styles.greeting}>{greeting}</RN.Text>
							<RN.View
								style={{
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "flex-start",
									marginVertical: 17,
								}}
							>
								<RN.View style={styles.lineBR} key={"leftLine"} />
								<Quote />
								<RN.View style={styles.lineBR} key={"rightLine"} />
							</RN.View>
						</>
					)}

					{message && <RN.Text style={styles.catchPhrases}>{message}</RN.Text>}
				</RN.View>
			</RN.View>
		</RN.View>
	);
};

const styles = StyleSheet.create({
	image: {
		backgroundColor: "rgba(0, 0, 0, 0.2)",
	},
	imageGreeting: {
		justifyContent: "flex-start",
		width: "100%",
		paddingBottom: 20,
	},
	professor: {
		width: 147,
		height: 147,
		alignSelf: "center",
	},
	userButton: {
		marginLeft: 20,
		marginTop: 20,
		alignSelf: "flex-start",
	},
	greetingViewBackground: {
		paddingTop: 5,
		justifyContent: "flex-start",
		width: "100%",
		marginBottom: 40,
	},
	title: {
		color: "#555555",
		fontSize: RN.Dimensions.get("window").width * 0.026,
		lineHeight: 23,
		...Tools.gStyle.font("400"),
		marginBottom: 7,
	},
	description: {
		color: "#A0A0A0",
		fontSize: RN.Dimensions.get("window").width * 0.018,
		lineHeight: 16,
		...Tools.gStyle.font("400"),
		marginBottom: 12,
	},
	statisticsMeditation: {
		marginVertical: 22,
	},
	userProfile: {
		alignSelf: "flex-start",
		marginLeft: 20,
	},
	feed: {
		backgroundColor: "#FFFFFF",
		minHeight: RN.Dimensions.get("window").height,
		paddingTop: 20,
		paddingHorizontal: 20,
	},
	greeting: {
		fontSize: RN.Dimensions.get("window").height * 0.035,
		color: "#FFFFFF",
		textAlign: "center",
		...Tools.gStyle.font("700"),
	},
	greetingView: {
		alignSelf: "center",
		alignItems: "center",
	},
	lineBR: {
		width: "20%",
		height: 1,
		backgroundColor: "#FFFFFF",
		marginHorizontal: 5,
	},
	catchPhrases: {
		fontSize: RN.Dimensions.get("screen").height * 0.018,
		textAlign: "center",
		color: "#FFFFFF",
		lineHeight: 20,
		maxWidth: "68%",
		...Tools.gStyle.font("400"),
	},
});

export default MessageProfessor;
