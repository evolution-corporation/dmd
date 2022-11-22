/** @format */

import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { RootScreenProps, SubscribeType } from "~types";
import { WebView } from "react-native-webview";
import { Request } from "~api";
import { SupportType } from "src/api/types";
import { Screen } from "~components/containers";

const Payment: RootScreenProps<"Payment"> = ({ navigation, route }) => {
	const { selectSubscribe } = route.params;
	const [dataForRequest, setDataForRequest] = React.useState<{ uri: string; header: { Authorization: string } } | null>(
		null
	);
	React.useEffect(() => {
		let ty: SupportType.SubscribeType | undefined = undefined;
		switch (selectSubscribe) {
			case SubscribeType.HALF_YEAR:
				ty = "Month6";
				break;
			case SubscribeType.MONTH:
				ty = "Month";
				break;
			case SubscribeType.WEEK:
				ty = "Week";
				break;
		}
		if (ty !== undefined) {
			Request.redirectPaymentURL(ty).then(r => {
				console.log(r);
				setDataForRequest(r);
			});
		}
	}, []);
	return (
		<Screen backgroundColor={"#9765A8"} paddingHorizontalOff>
			{dataForRequest !== null ? (
				<WebView
					source={dataForRequest}
					style={{ width: "100%", height: "100%" }}
					onNavigationStateChange={({ url }) => {
						if (url === "https://securepay.tinkoff.ru/html/payForm/success.html") {
							console.log("sus");
						} else if (url === "https://securepay.tinkoff.ru/html/payForm/fail.html") {
							console.log("erro");
						} else {
							console.log(url);
						}
					}}
				/>
			) : (
				<ActivityIndicator color={"#FFF"} />
			)}
		</Screen>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
});

export default Payment;