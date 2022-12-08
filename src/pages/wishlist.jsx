/* eslint-disable react/display-name */
import jwtDecode from "jwt-decode";
import { parseCookies } from "nookies";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { Dialog, Portal, Snackbar } from "react-native-paper";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../api";
import { client, ssrClient } from "../client";
import Layout from "../components/Layout";
import Footer from "../components/Layout/Footer";
import WishlishHeader from "../components/Wishlist/WishlishHeader";
import { removeFromWishlist } from "../components/Wishlist/WishlistIcon";
import WishlistItem from "../components/Wishlist/WishlistItem";
import { successColor } from "../Constant/color";
import { ADD_WISHLIST_TO_CART } from "../graphql/mutation";
import { GET_MY_WISHLIST } from "../graphql/query";

const addWishlistToCart = async (variables) => {
	const data = await client.request(ADD_WISHLIST_TO_CART, variables);
	return data;
};

const WishList = ({ userId, wishlist: ssrWishlist }) => {
	const { data: wishlist } = useQuery(
		"myWishlists",

		async () => {
			const { getMyWishlist } = await client.request(GET_MY_WISHLIST, {
				getMyWishlistFilter: { user: userId },
			});
			return getMyWishlist;
		},
		{
			// getNextPageParam: (lastPage, pages) => {
			//   return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
			// },
			// getPreviousPageParam: (firstPage, allPages) => {
			//   return firstPage.hasPreviousPage;
			// },
			initialData: ssrWishlist,
			// enabled: isAuthenticated,
			retry: false,
			refetchOnWindowFocus: false,
			retryOnMount: false,
			refetchOnReconnect: false,
		}
	);

	const useAddWishlistToCart = () => useMutation(addWishlistToCart);

	const useRemoveFromWishlist = () =>
		useMutation(removeFromWishlist, {
			onSuccess: (data) => {
				queryClient.refetchQueries("authUser");
				queryClient.refetchQueries("myWishlists");
			},
			onSettled: () => {
				queryClient.refetchQueries("authUser");
				queryClient.refetchQueries("myWishlists");
			},
		});

	const [selected, setselected] = useState([]);

	const [visible, setVisible] = React.useState("");

	const [alreadyinCart, setAlreadyinCart] = useState([]);

	const addWishlistToCartMutation = useAddWishlistToCart();

	const removeFromWishlistMutation = useRemoveFromWishlist();

	useEffect(() => {
		if (queryClient.getQueryData("authUser")) {
			setAlreadyinCart(
				queryClient
					.getQueryData("authUser")
					.myCart.products.filter((p) =>
						wishlist.products.some(
							(w) => p.product._id.toString() === w.product._id.toString()
						)
					)
			);
		}
	}, [wishlist.products]);

	const handelToggle = useCallback(
		(id) => {
			if (selected.some((s) => s.product.toString() === id.toString())) {
				setselected(
					selected.filter((s) => s.product.toString() !== id.toString())
				);
			} else {
				const setPro = wishlist.products.find(
					(p) => p.product._id.toString() === id.toString()
				);
				setselected([
					...selected,
					{
						quantity: setPro.quantity,
						rangePreUnitIdx: setPro.rangePreUnitIdx,
						product: setPro.product._id.toString(),
					},
				]);
			}
		},
		[selected, wishlist.products]
	);

	const handelAllToggle = useCallback(() => {
		if (selected.length === wishlist.products.length) {
			setselected([]);
		} else if (selected.length > 0 || selected.length === 0) {
			setselected(
				wishlist.products.map((p) => ({
					quantity: p.quantity,
					rangePreUnitIdx: p.rangePreUnitIdx,
					product: p.product._id.toString(),
				}))
			);
		}
	}, [selected.length, wishlist.products]);

	const handelAddToCart = useCallback(() => {
		if (selected.length === 0) {
			return;
		}
		addWishlistToCartMutation.mutate(
			{
				addWishlistToCartWishListItems: selected,
			},
			{
				onError: (e) => console.log(e),
				onSuccess: (d) => {
					setVisible("Added to cart");
					console.log(d);
					queryClient.refetchQueries("authUser");
					queryClient.refetchQueries("myWishlists");
				},
			}
		);
	}, [addWishlistToCartMutation, selected]);

	const handelRemoveFromWishlist = useCallback(() => {
		if (selected.length === 0) {
			return;
		}
		removeFromWishlistMutation.mutate(
			{
				removeFromWishlistProductIds: selected.map((s) => s.product.toString()),
			},
			{
				onError: (e) => console.log(e),
				onSuccess: (d) => {
					setVisible("remove from wishlist");
					console.log(d);
					queryClient.refetchQueries("authUser");
					queryClient.refetchQueries("myWishlists");
					setselected([]);
				},
			}
		);
	}, [removeFromWishlistMutation, selected]);

	return (
		<Layout title='My Wishlist'>
			<View style={{ position: "relative", flex: 1 }}>
				{wishlist.products.length > 0 && (
					<WishlishHeader
						wishlist={wishlist}
						selected={selected}
						removeFromWishlistMutation={removeFromWishlistMutation}
						addWishlistToCartMutation={addWishlistToCartMutation}
						handelRemoveFromWishlist={handelRemoveFromWishlist}
						handelAddToCart={handelAddToCart}
						handelAllToggle={handelAllToggle}
					/>
				)}
				<View
				// style={{ maxHeight: screenHeight - 170 }}
				>
					<View>
						{wishlist.products.length > 0 ? (
							<View>
								{wishlist.products.map((item, i) => (
									<WishlistItem
										key={i}
										item={item}
										alreadyinCart={alreadyinCart}
										selected={selected}
										handelToggle={handelToggle}
									/>
								))}
							</View>
						) : (
							<View
								style={{
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
									maxHeight: "100%",
								}}>
								<Text>Your wishlist is empty</Text>
							</View>
						)}
					</View>
				</View>
				<Portal>
					<Dialog visible={visible !== ""} onDismiss={() => setVisible("")}>
						<Snackbar
							style={{ marginHorizontal: "auto", maxWidth: 1000 }}
							duration={1500}
							visible={visible !== ""}
							onDismiss={() => setVisible("")}
							action={{
								icon: () => (
									<Icon
										name='check-circle'
										type='material'
										color={successColor}
									/>
								),
							}}>
							{visible}
						</Snackbar>
					</Dialog>
				</Portal>
			</View>
			<Footer />
		</Layout>
	);
};

export default WishList;

const styles = StyleSheet.create({});

export async function getServerSideProps(ctx) {
	const { token } = parseCookies(ctx);
	if (!token) {
		return {
			props: { token: null },
		};
	}

	const decode = jwtDecode(token);

	if (decode.role === "seller") {
		return {
			notFound: true,
		};
	}
	try {
		const { getMyWishlist } = await ssrClient(token).request(GET_MY_WISHLIST, {
			getMyWishlistFilter: { user: decode.id },
		});
		console.log(getMyWishlist);
		return {
			props: { wishlist: getMyWishlist, token, userId: decode.id },
		};
	} catch (error) {
		console.error(error);
		return {
			notFound: true,
		};
	}
}

// <FlatList
//   data={wishlist.products}
//   keyExtractor={(item, idx) => idx.toString()}
//   key={(item, idx) => idx.toString()}
//   centerContent
//   renderItem={({ item }) => (
//     <WishlistItem
//       item={item}
//       alreadyinCart={alreadyinCart}
//       selected={selected}
//       handelToggle={handelToggle}
//     />
//   )}
// />;
