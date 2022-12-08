import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, CheckBox } from "react-native-elements";
import {
	accentColor,
	deleteColor,
	lightText,
	primaryColor,
	textColor,
} from "../../Constant/color";

const WishlishHeader = ({
	wishlist,
	selected,
	removeFromWishlistMutation,
	addWishlistToCartMutation,
	handelRemoveFromWishlist,
	handelAddToCart,
	handelAllToggle,
}) => {
	return (
		<View
			style={{
				flexDirection: "row",
				padding: 10,
				justifyContent: "flex-start",
				alignItems: "center",
				gridGap: 10,
				flexWrap: "wrap",
			}}
		>
			<CheckBox
				checked={selected.length === wishlist.products.length}
				containerStyle={{ marginTop: 5, margin: 0, padding: 0 }}
				onPress={handelAllToggle}
			/>
			<View
				style={{
					justifyContent: "center",
					flexDirection: "row",
					gridGap: 8,
					padding: 5,
					backgroundColor: lightText,
					borderRadius: 5,
				}}
			>
				<Text style={{ fontWeight: "500", color: accentColor, fontSize: 15 }}>
					{selected.length}
				</Text>
				<Text style={{ fontWeight: "500", color: accentColor, fontSize: 15 }}>
					Selected
				</Text>
			</View>
			<Button
				title="Remove"
				buttonStyle={{ backgroundColor: deleteColor }}
				titleStyle={{
					fontWeight: "500",
					color: textColor,
					fontSize: 12,
				}}
				disabled={
					removeFromWishlistMutation.isLoading ||
					addWishlistToCartMutation.isLoading
				}
				loading={
					removeFromWishlistMutation.isLoading ||
					addWishlistToCartMutation.isLoading
				}
				onPress={handelRemoveFromWishlist}
			/>
			<Button
				title="Add to cart"
				buttonStyle={{ backgroundColor: primaryColor }}
				titleStyle={{
					fontWeight: "500",
					color: accentColor,
					fontSize: 12,
				}}
				onPress={handelAddToCart}
				disabled={
					removeFromWishlistMutation.isLoading ||
					addWishlistToCartMutation.isLoading
				}
				loading={
					removeFromWishlistMutation.isLoading ||
					addWishlistToCartMutation.isLoading
				}
			/>
		</View>
	);
};

export default WishlishHeader;

const styles = StyleSheet.create({});
