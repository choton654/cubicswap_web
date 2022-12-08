/* eslint-disable react/display-name */
import jwtDecode from "jwt-decode";
import { Box, Flex, Text, useToast } from "native-base";
import router from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import { Modal, ScrollView, View } from "react-native";
import { Icon } from "react-native-elements";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../../api";
import { client, ssrClient } from "../../client";
import CartBottom from "../../components/Cart/CartBottom";
import CartCard from "../../components/Cart/CartCard";
import EmptyCart from "../../components/Cart/EmptyCart";
import PriceDertails from "../../components/Cart/PriceDertails";
import Layout from "../../components/Layout";
import CustomLoader from "../../components/Layout/CustomLoader";
import Footer from "../../components/Layout/Footer";
import { accentColor, primaryColor, successColor } from "../../Constant/color";
import { UserState } from "../../context/state/userState";
import { ADD_TO_CART, ADD_TO_CHECKOUT, REMOVE_FROM_CART } from "../../graphql/mutation";
import { GET_MY_CART } from "../../graphql/query";

export const addNewCart = async variables => {
  const { addToCart } = await client.request(ADD_TO_CART, variables);
  return addToCart;
};

export const addNewCheckout = async variables => {
  const { addToCheckout } = await client.request(ADD_TO_CHECKOUT, variables);
  return addToCheckout;
};

export const removeFromCart = async variables => {
  const { removeFromCart } = await client.request(REMOVE_FROM_CART, variables);
  return removeFromCart;
};

export const useAddToCartMutation = () =>
  useMutation(addNewCart, {
    onMutate: async v => {
      await queryClient.cancelQueries("cartData");
      const previousCartData = queryClient.getQueryData("cartData");
      queryClient.setQueryData("cartData", old => {
        return {
          products: old.products.map((p, i) =>
            p.product._id === v.productId ? { ...p, quantity: v.quantity } : p
          ),
        };
      });
      return { previousCartData };
    },
    onError: (err, newcartData, context) => {
      queryClient.setQueryData("cartData", context.previousCartData);
    },

    onSettled: () => {
      queryClient.invalidateQueries("cartData");
    },
  });

const Cart = ({ token, cart }) => {
  const {
    state: { user: me, isAuthenticated },
  } = UserState();
  const toast = useToast();

  // get cart data
  const {
    isLoading: getCartLoading,
    isError,
    data,
  } = useQuery(
    "cartData",
    async () => {
      const { getMyCart } = await client.request(GET_MY_CART, { user: me._id });

      return getMyCart;
    },
    {
      initialData: cart,
      enabled: !!token && isAuthenticated,
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  // add to cart
  const addCartmutation = useAddToCartMutation();

  //  remove from cart
  const {
    isLoading: removeCartLoading,
    mutate: removeCartMutate,
    isError: removeCartError,
  } = useMutation(removeFromCart, {
    onMutate: async d => {
      await queryClient.cancelQueries("cartData");
      await queryClient.cancelQueries("authUser");
      await queryClient.cancelQueries("checkoutData");
      const previousCartData = queryClient.getQueryData("cartData");
      const previousCheckoutData = queryClient.getQueryData("checkoutData");

      queryClient.setQueryData("authUser", old => {
        return {
          ...old,
          myCart: {
            products: old.myCart.products.filter(p => p.product._id !== p._id),
          },
        };
      });

      queryClient.setQueryData("cartData", old => {
        return {
          products: old.products.filter((p, i) => p.product._id !== d.productId),
        };
      });

      if (previousCheckoutData?.products?.length > 0) {
        queryClient.setQueryData("checkoutData", old => {
          return {
            ...old,
            products: old.products.filter((p, i) => p.product._id !== d.productId),
          };
        });
      }
      return previousCartData;
    },
    onError: (err, newcartData, previousCartData) => {
      queryClient.setQueryData("cartData", previousCartData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("cartData");
      queryClient.invalidateQueries("checkoutData");
      queryClient.invalidateQueries("authUser");
    },
    onSuccess: () => {
      toast.show({
        render: () => {
          return (
            <Flex bg={primaryColor} direction='row' px='2' py='1' rounded='sm' mb={5}>
              <Icon name={"check-circle"} type='material' color={successColor} />
              <Text color={accentColor} ml={2}>
                Removed from cart
              </Text>
            </Flex>
          );
        },
      });
    },
  });

  //  add to checkout
  const {
    mutate: checkoutMutate,
    isLoading: checkoutLoading,
    error: checkoutError,
  } = useMutation(addNewCheckout, {
    onMutate: async d => {
      await queryClient.cancelQueries("checkoutData");
      const prevCart = queryClient.getQueryData("cartData");
      const prevCheckout = queryClient.getQueryData("checkoutData");
      // console.log("old-checkout", prevCheckout);

      queryClient.setQueryData("checkoutData", prevCart);
      return prevCheckout;
    },
    onSuccess: () => {
      router.push(`/checkout`);
    },
    onError: (err, variables, previousValue) => {
      queryClient.setQueryData("checkoutData", previousValue);
    },
    onSettled: () => {
      queryClient.invalidateQueries("checkoutData");
    },
  });

  return (
    <Layout title='Cart'>
      {(isError || removeCartError || checkoutError) && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(39, 39, 39)",
            zIndex: 100,
            minHeight: 30,
          }}>
          <Text style={{ color: "rgb(240, 191, 76)", fontWeight: "600" }}>
            Something went wrong try again later!
          </Text>
        </View>
      )}
      {getCartLoading ? (
        <Modal animationType='fade' visible={true}>
          <CustomLoader />
        </Modal>
      ) : isAuthenticated ? (
        <Box>
          {data?.products?.length > 0 ? (
            <Box>
              <CartBottom
                products={data?.products}
                type={"cart"}
                checkoutMutate={checkoutMutate}
                checkoutLoading={checkoutLoading}
                addCartLoading={addCartmutation.isLoading}
              />
              <ScrollView>
                <View>
                  {data?.products?.map((p, i) => (
                    <CartCard
                      key={i}
                      p={{
                        ...p.product,
                        quantity: p.quantity,
                        rangePreUnitIdx: p.rangePreUnitIdx,
                      }}
                      cart
                      removeCartMutate={removeCartMutate}
                      addCartmutation={addCartmutation}
                      updateCheckoutmutation={{}}
                    />
                  ))}
                </View>
                <PriceDertails products={data?.products} />
              </ScrollView>
            </Box>
          ) : (
            <ScrollView>
              <EmptyCart />
            </ScrollView>
          )}
        </Box>
      ) : (
        <ScrollView>
          <EmptyCart isLogin />
        </ScrollView>
      )}
      <Footer />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  // ctx.res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=10, stale-while-revalidate=59"
  // );

  return {
    notFound: true,
    // props: { error: JSON.stringify(error) },
  };

  // const { token } = parseCookies(ctx);
  // if (!token) {
  //   return {
  //     props: { token: null },
  //   };
  // }

  // const decode = jwtDecode(token);

  // if (decode.role === "seller") {
  //   return {
  //     notFound: true,
  //   };
  // }

  // // return { props: { token } };
  // try {
  //   const { getMyCart } = await ssrClient(token).request(GET_MY_CART, {
  //     user: decode.id,
  //   });
  //   console.log(getMyCart);
  //   return {
  //     props: { cart: getMyCart, token },
  //   };
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     notFound: true,
  //   };
  // }
}

export default Cart;

//  : (
//             <ScrollView>
//               <EmptyCart />
//             </ScrollView>
//           )

// const {
//   data: { cart },
// } = await axios.get(`${process.env.BASE_URL}/api/cart`, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
