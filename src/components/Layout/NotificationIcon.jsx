/** @format */

import { Box } from "native-base";
import router from "next/router";
import React from "react";
import { View } from "react-native";
import { Avatar, Badge } from "react-native-elements";
import { Appbar } from "react-native-paper";
import { UserState } from "../../context/state/userState";

function NotificationIcon() {
	const {
		state: {
			user: { myNotifications },
			isAuthenticated,
		},
	} = UserState();

	return (
		<>
			<Appbar.Action
				animated={false}
				onPress={() => router.replace("/notification", undefined, { shallow: true })}
				icon={() => (
					<View
						style={{
							height: "100%",
							display: "flex",
							position: "relative",
							justifyContent: "center",
							alignItems: "center",
						}}>
						{/* <Avatar
              size="medium"
              rounded
              icon={{
                name: "notifications",
                type: "material",
                color:
                  router.pathname === "/notification"
                    ? "rgb(240, 191, 76)"
                    : "rgba(240, 191, 76, 0.6)",
              }}
              activeOpacity={0.7}
            /> */}
						<Box>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								height='24px'
								viewBox='0 0 24 24'
								width='24px'
								fill={router.pathname === "/notification" ? "rgb(240, 191, 76)" : "rgba(240, 191, 76, 0.6)"}>
								<path d='M0 0h24v24H0V0z' fill='none' />
								<path d='M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z' />
							</svg>
						</Box>
						{isAuthenticated && myNotifications.length > 0 && (
							<Badge
								value={myNotifications.length}
								status='primary'
								containerStyle={{ position: "absolute", top: -4, right: -2 }}
								textStyle={{
									color: "rgb(240, 191, 76)",
									fontSize: 10,
									fontWeight: "bold",
								}}
								badgeStyle={{ width: 18, height: 18, borderRadius: 50 }}
							/>
						)}
					</View>
				)}
			/>
		</>
	);
}

export default NotificationIcon;
