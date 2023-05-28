/** @format */

import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { adapty } from "react-native-adapty";
import { useAppSelector } from "src/store/index";

const useIsActivateSubscribe = () => {

		return useAppSelector(store => {
			if (store.account.subscribe === undefined) {
				return false;
			} else {
				const endSubscribe = new Date(store.account.subscribe.whenSubscribe);

				endSubscribe.setDate(
					endSubscribe.getDate() +
						(() => {
							switch (store.account.subscribe.type) {
								case "WEEK": {
									return 7;
								}
								case "MONTH": {
									return 30;
								}
								case "HALF_YEAR": {
									return 180;
								}
								default: {
									return 0;
								}
							}
						})()
				);
				return endSubscribe.getTime() > Date.now();
			}
		});
	};


export default useIsActivateSubscribe;
