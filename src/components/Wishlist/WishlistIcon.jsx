/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Text, useToast } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Portal, Snackbar } from "react-native-paper";
import { useMutation } from "react-query";
import { queryClient } from "../../api";
import { client } from "../../client";
import { accentColor, deleteColor, primaryColor, successColor } from "../../Constant/color";
import { UserState } from "../../context/state/userState";
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../../graphql/mutation";

export const addToWishlist = async variables => {
  const data = await client.request(ADD_TO_WISHLIST, variables);
  return data;
};

export const removeFromWishlist = async variables => {
  const data = await client.request(REMOVE_FROM_WISHLIST, variables);
  return data;
};

const WishlistIcon = ({ product, size }) => {
  const {
    state: {
      user: {
        role,
        myWishlist: { products },
      },
      isAuthenticated,
    },
  } = UserState();

  const toast = useToast();

  const [isInWishlist, setisInWishlist] = useState(false);

  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState("");

  const useAddToWishlist = () =>
    useMutation(addToWishlist, {
      onMutate: async d => {
        const previousUserData = await queryClient.cancelQueries("authUser");
        queryClient.setQueryData("authUser", old => {
          return {
            ...old,
            myWishlist: {
              products: [...old.myWishlist.products, { product: { _id: product._id } }],
            },
          };
        });
        return { previousUserData };
      },
      onError: (err, variables, ctx) => {
        // queryClient.setQueryData("authUser", ctx.previousUserData);
        queryClient.invalidateQueries("authUser");
      },
      onSuccess: data => {
        setVisible1("Added to wishlist");

        // toast.show({
        //   duration: 2000,
        //   render: () => {
        //     return (
        //       <Flex bg={primaryColor} direction='row' px='2' py='1' rounded='sm' mb={5}>
        //         <Icon name={"check-circle"} type='material' color={successColor} />
        //         <Text color={accentColor} ml={2}>
        //           Add to wishlist
        //         </Text>
        //       </Flex>
        //     );
        //   },
        // });

        queryClient.invalidateQueries("authUser");
      },
      onSettled: () => {
        queryClient.invalidateQueries("authUser");
      },
    });

  const useRemoveFromWishlist = () =>
    useMutation(removeFromWishlist, {
      onMutate: async d => {
        const previousUserData = await queryClient.cancelQueries("authUser");
        queryClient.setQueryData("authUser", old => {
          return {
            ...old,
            myWishlist: {
              products: old.myWishlist.products.filter(p => p.product._id !== product?._id),
            },
          };
        });
        return { previousUserData };
      },
      onError: (err, variables, ctx) => {
        queryClient.invalidateQueries("authUser");

        // queryClient.setQueryData("authUser", ctx.previousUserData);
      },
      onSuccess: data => {
        setVisible1("Remove from wishlist");

        // toast.show({
        //   duration: 2000,
        //   render: () => {
        //     return (
        //       <Flex bg={primaryColor} direction='row' px='2' py='1' rounded='sm' mb={5}>
        //         <Icon name={"check-circle"} type='material' color={successColor} />
        //         <Text color={accentColor} ml={2}>
        //           Remove from wishlist
        //         </Text>
        //       </Flex>
        //     );
        //   },
        // });

        queryClient.invalidateQueries("authUser");
      },
      onSettled: () => {
        queryClient.invalidateQueries("authUser");
      },
    });

  const addWishlistMutation = useAddToWishlist();

  const removeFromWishlistMutation = useRemoveFromWishlist();

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    if (products) {
      setisInWishlist(products.some(p => p?.product?._id === product?._id));
    }
  }, [products, product]);

  const handelAddWishlist = useCallback(() => {
    if (!isAuthenticated) {
      onToggleSnackBar();
      // toast.show({
      //   render: () => {
      //     return (
      //       <Flex bg={accentColor} px='2' py='1' rounded='sm' mb={5}>
      //         <Icon name='error' type='material' color={deleteColor} />
      //         <Text color={primaryColor} ml={2}>
      //           Please login to wishlisting a product
      //         </Text>
      //       </Flex>
      //     );
      //   },
      // });
      return;
    } else {
      if (isInWishlist) {
        removeFromWishlistMutation.mutate(
          {
            removeFromWishlistProductIds: [product._id],
          },
          {}
        );
      } else {
        addWishlistMutation.mutate(
          {
            addToWishlistQuantity: product.minOrder,
            addToWishlistProductId: product._id,
          },
          {}
        );
      }
    }
  }, [
    addWishlistMutation,
    isAuthenticated,
    isInWishlist,
    onToggleSnackBar,
    product._id,
    product.minOrder,
    removeFromWishlistMutation,
  ]);

  return (
    <Box>
      {addWishlistMutation?.isLoading || removeFromWishlistMutation?.isLoading ? (
        <ActivityIndicator size='small' color={"#ff4343"} />
      ) : (
        <TouchableOpacity onPress={handelAddWishlist}>
          {isInWishlist ? (
            <Box>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='20px'
                viewBox='0 0 24 24'
                width='20px'
                fill={"#ff4343"}>
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
              </svg>
            </Box>
          ) : (
            <Box>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='20px'
                viewBox='0 0 24 24'
                width='20px'
                fill={"#ff4343"}>
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z' />
              </svg>
            </Box>
          )}
        </TouchableOpacity>
      )}

      <Portal>
        <Snackbar
          style={{ marginHorizontal: "auto", maxWidth: 1000, backgroundColor: accentColor }}
          wrapperStyle={{
            position: "absolute",
            bottom: 66,
          }}
          duration={1500}
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            // eslint-disable-next-line react/display-name
            icon: () => <Icon name='error' type='material' color={deleteColor} />,
          }}>
          <Text color={primaryColor}>Please login to wishlisting a product</Text>
        </Snackbar>
      </Portal>

      <Portal>
        <Snackbar
          style={{ marginHorizontal: "auto", maxWidth: 1000, backgroundColor: accentColor }}
          wrapperStyle={{
            position: "absolute",
            bottom: 66,
          }}
          duration={1000}
          visible={visible1 !== ""}
          onDismiss={() => setVisible1("")}
          action={{
            // eslint-disable-next-line react/display-name
            icon: () => <Icon name={"check-circle"} type='material' color={successColor} />,
          }}>
          <Text color={primaryColor}>{visible1}</Text>
        </Snackbar>
      </Portal>
    </Box>
  );
};

export default WishlistIcon;

const styles = StyleSheet.create({});

// {router.pathname === "/product/[id]" && (
//     )}

// <Icon
//   type="material"
//   name={isInWishlist ? "favorite" : "favorite-border"}
//   size={size}
//   color="#ff4343"
// />;
