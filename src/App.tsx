/** @format */

import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Alert, Platform, UIManager, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import RootRoutes from "./routes";
import Store, { actions } from "./store";
import "./TaskManager";
import { SafeAreaProvider } from "react-native-safe-area-context";

import GlobalSheet from "src/styles/sheet";

GoogleSignin.configure({
	webClientId: "878799007977-cj3549ni87jre2rmg4eq0hiolp08igh2.apps.googleusercontent.com",
});

if (Platform.OS === "android") {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}
const AppCore = () => {
	React.useEffect(() => {
		console.log(GlobalSheet());
		// (async () => {
		// 	await SplashScreen.preventAutoHideAsync();
		// 	try {
		// 		await Store.dispatch(actions.initialization()).unwrap();
		// 		await SplashScreen.hideAsync();
		// 	} catch (error) {
		// 		console.error(error);
		// 		if (error instanceof Error) Alert.alert(`Ошибка при загрузке. ${error.name}`, error.message);
		// 	}
		// })();
	}, []);

	return (
		<View style={{ backgroundColor: "red", flex: 1 }} />
		// <SafeAreaProvider>
		// 	<GestureHandlerRootView style={{ flex: 1 }}>
		// 		<NavigationContainer>
		// 			<RootRoutes />
		// 		</NavigationContainer>
		// 	</GestureHandlerRootView>
		// </SafeAreaProvider>
	);
};

export default () => (
	<Provider store={Store}>
		<AppCore />
	</Provider>
);
