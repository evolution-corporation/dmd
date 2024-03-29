/** @format */

import { createReducer } from "@reduxjs/toolkit";
import { Converter } from "~api";
import { State } from "~types";

import Actions from "../actions";

export interface CurrentData {
	displayName?: string;
	image: string;
	birthday: string;
	nickName: string;
	gender: "MALE" | "FEMALE" | "OTHER";
}

export interface AccountState {
	uid?: string;
	currentData?: CurrentData;
	changeData: {
		nickname?: string;
		image?: string;
		displayName?: string;
		birthday?: string;
		gender?: "MALE" | "FEMALE" | "OTHER";
		lastCheckNicknameAndResult?: [string, boolean];
	};
	subscribe?: {
		type: "WEEK" | "MONTH" | "HALF_YEAR";
		whenSubscribe: string;
		autoPayment: boolean;
		endSubscribe: string;
	};
	status: "REGISTRATION" | "NO_REGISTRATION" | "NO_AUTHENTICATION" | "IS_LOADING";
	isNewUser: boolean;
}

export default createReducer<AccountState>(
	{
		changeData: {},
		status: "IS_LOADING",
		isNewUser: false,
	},
	builder => {
		builder.addCase(Actions.initialization.fulfilled, (state, { payload }) => {
			if (payload.account === null) {
				state.status = "NO_AUTHENTICATION";
			} else {
				const { user, subscribe, id } = payload.account;
				state.uid = id;
				if (user !== null) {
					state.status = "REGISTRATION";
					state.currentData = {
						nickName: user.nickName,
						birthday: user.birthday,
						displayName: user.displayName,
						image: user.image,
						gender: user.gender,
					};

					if (subscribe !== null) {
						state.subscribe = {
							autoPayment: subscribe.autoPayment,
							type: subscribe.type,
							whenSubscribe: subscribe.whenSubscribe,
							endSubscribe: subscribe.endSubscribe
						};
					}
				} else {
					state.status = "NO_REGISTRATION";
				}
			}
		});
		builder.addCase(Actions.signInAccount.fulfilled, (state, { payload }) => {
			const { user, subscribe, id } = payload;
			state.uid = id;
			if (user !== null) {
				state.status = "REGISTRATION";
				state.currentData = {
					nickName: user.nickName,
					birthday: user.birthday,
					displayName: user.displayName,
					image: user.image,
					gender: user.gender,
				};
				state.isNewUser = false;
				if (subscribe !== null) {
					state.subscribe = {
						autoPayment: subscribe.autoPayment,
						type: subscribe.type,
						whenSubscribe: subscribe.whenSubscribe,
						endSubscribe: subscribe.endSubscribe,
					};
				}
			} else {
				state.status = "NO_REGISTRATION";
			}
		});
		builder.addCase(Actions.signOutAccount.fulfilled, (state, { payload }) => {
			state.status = "NO_AUTHENTICATION";
			state.currentData = undefined;
			state.changeData = {};
			state.uid = undefined;
			state.subscribe = undefined;
			state.isNewUser = false;
		});
		builder.addCase(Actions.registrationAccount.fulfilled, (state, { payload }) => {
			state.currentData = payload;
			state.uid = payload.uid;
			state.changeData = {};
			state.isNewUser = true;
		});
		builder.addCase(Actions.updateAccount.fulfilled, (state, { payload }) => {
			state.changeData = {};
			state.currentData = payload;
			state.isNewUser = false;
		});
		builder.addCase(Actions.removeChangedInformationUser, state => {
			state.changeData = {};
		});
		builder.addCase(Actions.addChangedInformationUser.fulfilled, (state, { payload }) => {
			state.changeData = {
				...Object.fromEntries(Object.entries(state.changeData).filter(([key, value]) => value !== undefined)),
				...Object.fromEntries(Object.entries(payload).filter(([key, value]) => value !== undefined)),
			};
		});
		builder.addCase(Actions.setRegistrationAccountStatus, state => {
			state.status = "REGISTRATION";
		});
		builder.addCase(Actions.setNotNewUser, state => {
			state.isNewUser = false;
		});
		builder.addCase(Actions.getSubs.fulfilled, (state, { payload }) => {
			state.subscribe = Converter.composeSubscribe(payload) ?? undefined;
		});
		builder.addCase(Actions.removeSubscribe.fulfilled, state => {
			if (state.subscribe !== undefined) state.subscribe = { ...state.subscribe, autoPayment: false };
		});

	}
);
