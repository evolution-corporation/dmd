/** @format */

import { useDimensions } from "@react-native-community/hooks";
import React from "react";
import { Image } from "react-native";
import CloseCross from "~components/Elements/close-cross";
import DefaultText from "~components/Text/default-text";
import HeaderText from "~components/Text/header-text";
import ScreenModal from "~components/containers/screen-modal";
import ViewPaddingList, { Direction } from "~components/containers/view-padding-list";
import { ColorButton, TextButton } from "~components/dump";
import { PracticesMeditation, RootScreenProps } from "~types";

const EndMeditation: RootScreenProps<"EndMeditation"> = ({ navigation, route }) => {
	const { window } = useDimensions();
	const widthModal = window.width - 50;

	const removeLastScreen = () => {
		navigation.pop(2);
	};

	return (
		<ScreenModal
			styleContentBlock={{
				backgroundColor: "#FFF",
				borderRadius: 20,
				alignItems: "center",
				paddingHorizontal: 39,
				width: widthModal,
			}}
			styleNoContentElement={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
		>
			<CloseCross />

			<ViewPaddingList direction={Direction.Vertical} paddings={[47, 15, 12, 12, 15, 30]}>
				<HeaderText>Конец медитации</HeaderText>

				<DefaultText color="rgba(64, 64, 64, 0.71)" style={{ textAlign: "center" }}>
					Пусть с этой минуты твоя жизнь станет радостней
				</DefaultText>
				<Image
					source={require("assets/Визуализация1.png")}
					style={{ width: widthModal, height: (widthModal / 335) * 264 }}
					resizeMode={"contain"}
				/>

				<ColorButton
					styleButton={{ backgroundColor: "#9765A8", paddingHorizontal: 25 }}
					styleText={{ color: "#FFF" }}
					onPress={() => {
						removeLastScreen();
					}}
				>
					Выйти
				</ColorButton>
			</ViewPaddingList>
		</ScreenModal>
	);
};

export default EndMeditation;
