/**
 * Файл содержит в себе инструкции для различных медитационных практик
 * @format */

import i18n from "src/i18n";
import { Instruction } from "./types";

export const instructionForRelaxation: Instruction = {
	title: i18n.t("relaxation"),
	description: i18n.t("2b9df2f2-66c6-47cf-b92e-4789321a2c7a"),
	data: [
		{ text: i18n.t("43ef8835-26ca-4ee5-b640-5c67fa163eea") },
		{ text: i18n.t("5bcac3ad-6e5d-4799-95fb-9534f4934990") },
		{ text: i18n.t("a7e95854-d46d-4aad-89a4-676f05a609ce") },
		{ text: i18n.t("44b97143-fe11-4628-8f55-d35a610bc413") },
		{ text: i18n.t("33ffd924-4abc-4abb-ae8d-844a17517bf0") },
		{ text: i18n.t("4d413410-c9ad-47db-ad82-b1c654cb0559") },
		{ text: i18n.t("0a471888-4def-4430-9d1f-b5f0e25fa770") },
	],
};

export const instructionForDirectionalVisualization: Instruction = {
	title: i18n.t("directionalVisualizations"),
	description: i18n.t("397f9ba6-a05a-4c18-a8fb-989a63ed30d9"),
	data: [
		{ text: i18n.t("86cdb58d-52d9-4a6d-b069-78a6206a3cc9") },
		{ text: i18n.t("ac7d2551-5a28-432d-891d-75e0e6dadcce") },
		{ text: i18n.t("df9cb984-078c-4da5-a8c6-fef3000a1489") },
		{ text: i18n.t("9483f05b-c730-4b7d-adb1-26d22ba5fdf3") },
		{ text: i18n.t("be5a48c5-26a8-4595-86e9-479c48ad061d") },
		{ text: i18n.t("deb804f6-39ee-4007-b297-5a0db495ac2a") },
		{ text: i18n.t("f001611d-f7ce-461b-a5df-ad20e5d981ad") },
	],
};
