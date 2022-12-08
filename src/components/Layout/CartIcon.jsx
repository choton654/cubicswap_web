/** @format */

import { Box } from "native-base";
import router from "next/router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Badge } from "react-native-elements";
import { Appbar } from "react-native-paper";
import { primaryColor } from "../../Constant/color";

const CartIcon = ({ products }) => {
	return (
		<Appbar.Action
			animated={false}
			onPress={() => {
				router.push("/cart");
			}}
			icon={() => (
				<View style={styles.c}>
					<Box>
						<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill={"rgb(240, 191, 76)"}>
							<path d='M0 0h24v24H0z' fill='none' />
							<path d='M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z' />
						</svg>
					</Box>

					<Badge value={products?.length} status='error' containerStyle={styles.d} textStyle={styles.e} badgeStyle={styles.f} />
				</View>
			)}
		/>
	);
};

export default CartIcon;

const styles = StyleSheet.create({
	c: {
		height: "100%",
		display: "flex",
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
	},
	d: {
		position: "absolute",
		top: -4,
		right: -2,
	},
	e: {
		color: primaryColor,
		fontSize: 10,
		fontWeight: "bold",
	},
	f: {
		width: 18,
		height: 18,
		borderRadius: 50,
	},
});

{
	/* <Avatar
            size="medium"
            rounded
            icon={{
              name: "shopping-cart",
              type: "material",
              color: primaryColor,
            }}
            activeOpacity={0.7}
          /> */
}
