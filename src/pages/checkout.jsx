/* eslint-disable react/display-name */
import jwtDecode from "jwt-decode";
import { Box, Spinner } from "native-base";
import router from "next/router";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Dialog, Portal, Snackbar, useTheme } from "react-native-paper";
import { useMutation, useQuery } from "react-query";
import { queryClient, UpdateCheckoutItemMutation } from "../api";
import { client, ssrClient } from "../client";
import CartBottom from "../components/Cart/CartBottom";
import CartCard from "../components/Cart/CartCard";
import EmptyCart from "../components/Cart/EmptyCart";
import Payment from "../components/Cart/Payment";
import PriceDertails from "../components/Cart/PriceDertails";
import Layout from "../components/Layout";
import CustomLoader from "../components/Layout/CustomLoader";
import Footer from "../components/Layout/Footer";
import AddressCard from "../components/Profile/AddressCard";
import { accentColor, successColor } from "../Constant/color";
import { UserState } from "../context/state/userState";
import { CREATE_ORDER } from "../graphql/mutation";
import { GET_MY_CHECKOUT } from "../graphql/query";

export const addNewOrder = async variables => {
  const { createOrder } = await client.request(CREATE_ORDER, variables);
  return createOrder;
};

function Checkout({ token, checkout }) {
  const {
    state: { user: me, isAuthenticated },
    orderSuccess,
    setOrderSuccess,
  } = UserState();

  const [isVisible, setIsVisible] = useState(false);
  const { colors } = useTheme();

  // add order
  const {
    isLoading: orderLoading,
    mutate: orderMutate,
    isError: orderError,
    isSuccess,
  } = useMutation(addNewOrder, {
    onSuccess: async () => {
      setIsVisible(false);
      setOrderSuccess(true);
    },
    onError: (err, newcartData, previousCheckoutData) => {
      console.error(err);
      queryClient.setQueryData("checkoutData", previousCheckoutData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("authUser");
      queryClient.invalidateQueries("checkoutData");
      queryClient.invalidateQueries("notifyCount");
    },
    onMutate: async d => {
      await queryClient.cancelQueries("checkoutData");
      const previousCheckoutData = queryClient.getQueryData("checkoutData");
      queryClient.setQueryData("checkoutData", old => {
        return [];
      });

      return previousCheckoutData;
    },
  });

  // get checkout
  const { isLoading, data, isError } = useQuery(
    "checkoutData",
    async () => {
      const { getMyCheckout } = await client.request(GET_MY_CHECKOUT, {
        user: me._id,
      });

      return getMyCheckout;
    },
    {
      initialData: checkout,
      enabled: !!token && isAuthenticated,
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const updateCheckoutmutation = useMutation(UpdateCheckoutItemMutation, {
    onMutate: async v => {
      await queryClient.cancelQueries("checkoutData");
      const previousCartData = queryClient.getQueryData("checkoutData");
      queryClient.setQueryData("checkoutData", old => {
        return {
          ...old,
          products: old.products.map((p, i) =>
            p.product._id === v.productId ? { ...p, quantity: v.quantity } : p
          ),
        };
      });
      return { previousCartData };
    },
    onError: (err, newcartData, context) => {
      queryClient.setQueryData("checkoutData", context.previousCartData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("checkoutData");
    },
  });

  return (
    <Layout title='Checkout'>
      {(isError || orderError) && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.accent,
            zIndex: 100,
            minHeight: 30,
          }}>
          <Text style={{ color: colors.primary, fontWeight: "600" }}>Something went wrong try again later!</Text>
        </View>
      )}
      {isLoading ? (
        <Modal animationType='fade' visible={true}>
          <CustomLoader />
        </Modal>
      ) : data?.products?.length > 0 ? (
        <Box>
          {me.shippingAddress !== undefined && (
            <Box>
              <CartBottom
                products={data.products}
                type={"checkout"}
                setIsVisible={setIsVisible}
                orderLoading={orderLoading}
              />
              <Payment
                products={data.products}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                me={me}
                orderMutate={orderMutate}
                orderLoading={orderLoading}
              />
            </Box>
          )}
          <ScrollView>
            <View
              style={{
                paddingBottom: 10,
                backgroundColor: "#e4e4e4",
              }}>
              <AddressCard me={me} checkout />
            </View>

            <View>
              {data?.products?.map((p, i) => (
                <CartCard
                  key={i}
                  cart={false}
                  p={{
                    ...p.product,
                    quantity: p.quantity,
                    rangePreUnitIdx: p.rangePreUnitIdx,
                  }}
                  addCartmutation={{}}
                  updateCheckoutmutation={updateCheckoutmutation}
                />
              ))}
            </View>
            <PriceDertails products={data.products} />
          </ScrollView>
        </Box>
      ) : (
        <ScrollView>
          <EmptyCart checkout />
        </ScrollView>
      )}
      <Footer />
      <Portal>
        <Dialog visible={orderSuccess && isSuccess} onDismiss={() => setOrderSuccess(false)}>
          <Snackbar
            // wrapperStyle={{
            //   bottom: 66,
            // }}
            duration={1500}
            style={{ marginHorizontal: "auto", maxWidth: 1000 }}
            visible={orderSuccess && isSuccess}
            onDismiss={() => setOrderSuccess(false)}
            action={{
              color: colors.primary,
              label: " Go to My Order",
              onPress: () => {
                router.push("/orderSummery");
              },
              icon: () => <Icon name='check-circle' type='material' color={successColor} />,
            }}>
            <Text style={{ color: colors.primary, fontWeight: "600" }}>Your Order has been placed.</Text>
          </Snackbar>
        </Dialog>
      </Portal>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  return {
    notFound: true,
    // props: { error: JSON.stringify(error) },
  };

  // const { token } = parseCookies(ctx);

  // if (!token) {
  //   return {
  //     notFound: true,
  //   };
  // }
  // const decode = jwtDecode(token);
  // console.log(decode);

  // if (!token || decode.role === "seller") {
  //   return {
  //     notFound: true,
  //   };
  // }

  // try {
  //   const { getMyCheckout } = await ssrClient(token).request(GET_MY_CHECKOUT, {
  //     user: decode.id,
  //   });

  //   console.log(getMyCheckout);

  //   if (!getMyCheckout?.user?.shippingAddress) {
  //     return {
  //       redirect: {
  //         destination: "/address?type=checkout",
  //         permanent: false,
  //       },
  //     };
  //   }

  //   return {
  //     props: { checkout: getMyCheckout, token },
  //   };
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     notFound: true,
  //     // props: { error: JSON.stringify(error) },
  //   };
  // }
}

export default Checkout;

// const {
//   data: { checkout },
// } = await axios.get(`${process.env.BASE_URL}/api/cart/checkout`, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
