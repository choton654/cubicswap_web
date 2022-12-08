/* eslint-disable react/display-name */
import router from "next/router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dialog, Icon, Input } from "react-native-elements";
import { Dialog as PDialog, Portal, Snackbar } from "react-native-paper";
import { useMutation } from "react-query";
import { queryClient } from "../../api";
import {
	accentColor,
	lightText,
	primaryColor,
	successColor,
} from "../../Constant/color";
import { UserState } from "../../context/state/userState";
import { useAddToCart } from "../Product/OneProduct";
import { addToWishlist } from "../Wishlist/WishlistIcon";

const AddToCart = ({ p, wishlist }) => {
	const {
		state: {
			isAuthenticated,
			user: { role },
		},
	} = UserState();

	const useAddToWishlist = () =>
		useMutation(addToWishlist, {
			onSuccess: (data) => {
				queryClient.refetchQueries("authUser");
				queryClient.refetchQueries("myWishlists");
			},
			onSettled: () => {
				queryClient.refetchQueries("authUser");
				queryClient.refetchQueries("myWishlists");
			},
		});

	const addCartmutation = useAddToCart(false);

	const addWishlistMutation = useAddToWishlist();

	const [showDialog, setShowDialog] = useState("");

	const [price, setPrice] = useState(p.price);

	const [newOrderQty, setNewOrderQty] = useState(
		p?.minOrder?.toString() || "0"
	);

	const hideDialog = () => {
		setShowDialog("");
	};
	const getDialog = () => {
		setShowDialog("A");
	};

	useEffect(() => {
		if (newOrderQty) {
			p?.rangePerUnit?.find((r, i) => {
				if (i + 1 === p.rangePerUnit.length) {
					if (parseFloat(newOrderQty) >= r.qty) {
						setPrice(p?.rangePerUnit[i].pricePerUnit);
					}
				} else if (
					parseFloat(newOrderQty) >= r.qty &&
					parseFloat(newOrderQty) <= p.rangePerUnit[i + 1].qty - 1
				) {
					setPrice(p?.rangePerUnit[i].pricePerUnit);
				}
			});
		}

		// if (addCartmutation.isSuccess) {
		//   setShowDialog("Added to cart");
		// }
		// if (addWishlistMutation.isSuccess) {
		//   setShowDialog("Update quantity");
		// }
	}, [
		addCartmutation.isSuccess,
		addWishlistMutation.isSuccess,
		newOrderQty,
		p.rangePerUnit,
	]);

	return (
		<>
			{wishlist ? (
				<>
					<TouchableOpacity
						onPress={getDialog}
						style={{
							justifyContent: "center",
							flexDirection: "row",
							padding: 4,
							gridGap: 8,
							backgroundColor: lightText,
							borderRadius: 5,
						}}>
						<Text
							style={{ fontWeight: "500", color: accentColor, fontSize: 12 }}>
							Qty {wishlist.qty}
						</Text>
						<Icon type='material' name='unfold-more' size={20} />
					</TouchableOpacity>
				</>
			) : (
				role === "user" && (
					<TouchableOpacity
						style={{
							padding: 10,
							backgroundColor: accentColor,
							borderRadius: 5,
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={getDialog}>
						<Text
							style={{
								fontWeight: "500",
								fontSize: 15,
								color: primaryColor,
							}}>
							Add to cart
						</Text>
					</TouchableOpacity>
				)
			)}

			<Dialog
				visible={showDialog === "A"}
				onDismiss={hideDialog}
				onBackdropPress={hideDialog}
				overlayStyle={{}}>
				{isAuthenticated ? (
					<>
						<Dialog.Title title='Enter Quantity' />
						{addCartmutation.isLoading && <Dialog.Loading />}
						<View style={{ gridGap: 10 }}>
							<Text>
								{/* <Text style={{ fontWeight: "500", fontSize: 15 }}>
                  Min order is
                </Text>{" "} */}
								{p.minOrder && (
									<Text style={{ fontSize: 15 }}>
										Min Order is {p.minOrder}{" "}
										{p.minOrder > 1 ? `${p.unit}s` : `${p.unit}`}
									</Text>
								)}
							</Text>
							<Text>
								<Text style={{ fontWeight: "500", fontSize: 15 }}>Price </Text>₹{" "}
								{price} / {p.unit}
							</Text>
						</View>
						<Input
							inputStyle={{ maxWidth: 180 }}
							value={newOrderQty}
							keyboardType='numeric'
							errorMessage={
								Number(newOrderQty) < Number(p.minOrder)
									? `min order is ${p.minOrder}`
									: ""
							}
							onChangeText={(e) => {
								setNewOrderQty(e);
							}}
						/>
						<View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
							<Dialog.Button title='Cancel' onPress={hideDialog} />
							<Dialog.Button
								disabled={
									addCartmutation.isLoading || addWishlistMutation.isLoading
								}
								title={wishlist ? "Update" : "Add"}
								onPress={() => {
									if (!Number(newOrderQty)) {
										return;
									} else if (Number(newOrderQty) < Number(p.minOrder)) {
										return;
									} else if (wishlist) {
										addWishlistMutation.mutate(
											{
												addToWishlistQuantity: parseFloat(newOrderQty),
												addToWishlistProductId: p?._id,
											},
											{
												onSettled: () => {
													queryClient.refetchQueries("myWishlists");
												},
												onSuccess: () => {
													setShowDialog("");
												},
											}
										);
									} else {
										addCartmutation.mutate(
											{
												productId: p?._id,
												quantity: parseFloat(newOrderQty),
											},
											{
												onSuccess: () => {
													setShowDialog("");
												},
											}
										);
									}
								}}
							/>
						</View>
					</>
				) : (
					<>
						<Dialog.Title title='You are not logged in' />
						<Dialog.Button
							title='Login here'
							onPress={() => router.push("/signIn")}
						/>
					</>
				)}
			</Dialog>

			<Portal>
				<PDialog
					visible={
						showDialog === "Added to cart" || showDialog === "Update quantity"
					}
					onDismiss={() => setShowDialog("")}>
					<Snackbar
						duration={1000}
						visible={
							showDialog === "Added to cart" || showDialog === "Update quantity"
						}
						onDismiss={() => setShowDialog("")}
						action={{
							icon: () => (
								<Icon
									name='check-circle'
									type='material'
									color={successColor}
								/>
							),
						}}>
						{showDialog}
					</Snackbar>
				</PDialog>
			</Portal>
		</>
	);
};

export default AddToCart;

const styles = StyleSheet.create({});

{
	/* <DataTable.Cell>
  <TouchableOpacity onPress={getDialog}>
    <Icon size={20} type="material" name="add-shopping-cart" />
  </TouchableOpacity>
</DataTable.Cell>; */
}
