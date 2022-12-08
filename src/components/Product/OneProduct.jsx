/* eslint-disable react/display-name */
import { Flex, Spacer, Text, useToast } from "native-base";
import router, { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { Icon } from "react-native-elements";
import { useMutation, useQueryClient } from "react-query";
import { queryClient } from "../../api";
import { client } from "../../client";
import { accentColor, primaryColor, successColor } from "../../Constant/color";
import { UserState } from "../../context/state/userState";
import { CREATE_CHATROOM } from "../../graphql/mutation";
import { addNewCart, addNewCheckout } from "../../pages/cart";
import Layout from "../Layout";
import CustomLoader from "../Layout/CustomLoader";
import Footer from "../Layout/Footer";
import AskQuestion from "./AskQuestion";
import MainProduct from "./MainProduct";
import ProdDrawer from "./ProdDrawer";
import RelatedProduct from "./RelatedProduct";

const createChatRoom = async variables => {
  const data = await client.request(CREATE_CHATROOM, variables);
  return data;
};

export const useAddToCart = (notfromStore, setCartSuccess, setisCart, setisCheckout) => {
  const toast = useToast();

  return useMutation(addNewCart, {
    onMutate: async v => {
      if (notfromStore) {
        setCartSuccess(true);
        setisCart(false);
        setisCheckout(false);
      }
      const previousUserData = await queryClient.cancelQueries("authUser");
      const previousCartData = queryClient.getQueryData("cartData");

      if (previousCartData) {
        queryClient.setQueryData("cartData", old => {
          return {
            products: old.products.map((p, i) =>
              p.product._id === v.productId ? { ...p, quantity: v.quantity } : p
            ),
          };
        });
      }

      queryClient.setQueryData("authUser", old => {
        return {
          ...old,
          myCart: {
            products: [...old.myCart.products, { __typename: "Product", _id: router?.query?.id }],
          },
        };
      });

      return { previousUserData, previousCartData };
    },
    onError: (err, variables, ctx) => {
      console.log(err);
      queryClient.setQueryData("cartData", ctx.previousCartData);
      queryClient.setQueryData("authUser", ctx.previousUserData);
    },

    onSettled: () => {
      queryClient.invalidateQueries("cartData");
      queryClient.invalidateQueries("authUser");
    },

    onSuccess: () => {
      toast.show({
        duration: 1500,
        render: () => {
          return (
            <Flex bg={primaryColor} px='2' py='1' rounded='sm' mb={"5"}>
              <Icon name={"check-circle"} type='material' color={successColor} />
              <Text color={accentColor} ml={2} fontWeight={"500"} my={"5px"}>
                Added to the cart
              </Text>
              <Spacer />
              {/* <Pressable
                onPress={() => {
                  router.push("/cart");
                }}>
                <Badge bg={darkPrimaryColor} color={primaryColor} ml={5}>
                  Go to cart
                </Badge>
              </Pressable> */}
            </Flex>
          );
        },
      });
    },
  });
};

function OneProduct({ product, store, state1, state2, state3 }) {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { setCartSuccess } = UserState();

  const [orderQty, setOrderQty] = useState(product?.minOrder?.toString() || "0");
  const [selectedRange, setSelectedRange] = useState({});

  const [isVisible, setIsVisible] = useState(false);

  const scrollRef = useRef(null);

  const [isCart, setisCart] = useState(false);
  const [isCheckout, setisCheckout] = useState(false);
  const [isChatroom, setisChatroom] = useState(false);

  useEffect(() => {
    if (orderQty && product.rangePerUnit) {
      product.rangePerUnit.find((r, i) => {
        if (i + 1 === product.rangePerUnit.length) {
          if (parseFloat(orderQty) >= r.qty) {
            setSelectedRange(r);
          }
        } else if (parseFloat(orderQty) >= r.qty && parseFloat(orderQty) <= product.rangePerUnit[i + 1].qty - 1) {
          setSelectedRange(r);
        }
      });
    }
  }, [orderQty, product]);

  const createChatRoomMutation = useMutation(createChatRoom, {
    onSuccess: d => {
      router.push(`/chatroom/${d?.createChatRoom?.name}`);
    },
  });

  const addCartmutation = useAddToCart(true, setCartSuccess, setisCart, setisCheckout);

  const addCheckoutmutation = useMutation(addNewCheckout, {
    onSuccess: data => {
      router.push(`/checkout`);
    },
    onMutate: async (d, v) => {
      await queryClient.cancelQueries("authUser");
      const previousCheckoutData = queryClient.getQueryData("checkoutData");

      queryClient.setQueryData("authUser", old => {
        let pcartItems = [];
        const prod = old?.myCart?.products?.find(p => p.product._id === router?.query?.id);
        if (prod) {
          pcartItems = [...old?.myCart?.products];
        } else {
          pcartItems = [...old?.myCart?.products, { __typename: "Product", _id: router?.query?.id }];
        }
        return {
          ...old,
          myCart: {
            products: pcartItems,
          },
        };
      });
      setisCheckout(false);
      setisCart(false);

      return previousCheckoutData;
    },
    onError: (err, variables, previousValue) => {
      queryClient.setQueryData("checkoutData", previousValue);
    },
    onSettled: () => {
      queryClient.invalidateQueries("checkoutData");
      queryClient.invalidateQueries("authUser");
    },
  });

  return (
    <Layout title={product?.name}>
      {(addCartmutation.isError || addCheckoutmutation.isError || createChatRoomMutation.isError) && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(39, 39, 39)",
            zIndex: 100,
            minHeight: 50,
          }}>
          <Text style={{ color: "rgb(240, 191, 76)", fontWeight: "600" }}>
            Something went wrong try again later!
          </Text>
        </View>
      )}
      {createChatRoomMutation.isLoading ? (
        <CustomLoader />
      ) : product ? (
        <ScrollView ref={scrollRef} contentContainerStyle={{ backgroundColor: "#fff" }}>
          <View Style={{ backgroundColor: "#fff" }}>
            <MainProduct
              store={store}
              product={product}
              orderQty={orderQty}
              setOrderQty={setOrderQty}
              setIsVisible={setIsVisible}
              setisCheckout={setisCheckout}
              setisCart={setisCart}
              createChatRoomMutation={createChatRoomMutation}
              setisChatroom={setisChatroom}
              selectedRange={selectedRange}
              addCartmutation={addCartmutation}
              addCheckoutmutation={addCheckoutmutation}
              topParent={state1}
              midPrent={state2}
              lastParent={state3}
            />
          </View>
          <RelatedProduct scrollRef={scrollRef} categories={product.categories} prodId={product._id} />

          <AskQuestion setIsVisible={setIsVisible} product={product} store={store} />
        </ScrollView>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>No Product found</Text>
        </View>
      )}
      <ProdDrawer
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        isCart={isCart}
        isCheckout={isCheckout}
        setisCart={setisCart}
        store={store}
        setisCheckout={setisCheckout}
        product={product}
        selectedRange={selectedRange}
        orderQty={orderQty}
        addCartmutation={addCartmutation}
        addCheckoutmutation={addCheckoutmutation}
        createChatRoomMutation={createChatRoomMutation}
        isChatroom={isChatroom}
        setisChatroom={setisChatroom}
      />
      {/* <View>
        <Footer />
      </View> */}
    </Layout>
  );
}

export default OneProduct;
