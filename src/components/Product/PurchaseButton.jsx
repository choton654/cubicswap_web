/* eslint-disable react/display-name */
import { Modal, ScrollView, Button as NButton, VStack, Text } from "native-base";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Button, Dialog, Portal, Snackbar } from "react-native-paper";
import { useMutation } from "react-query";
import { accentColor, deleteColor, primaryColor, successColor, textColor } from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import { UserState } from "../../context/state/userState";
import { addNewOrder } from "../../pages/checkout";
// import { calculateCartTotal } from "../../utils/cartTotal";

function PurchaseButton({
  addCartmutation,
  addCheckoutmutation,
  product,
  setisCheckout,
  setisCart,
  setIsVisible,
  orderQty,
  store,
  createChatRoomMutation,
  setisChatroom,
  selectedRange,
}) {
  const {
    state: {
      isAuthenticated,
      user: {
        shippingAddress,
        myCart: { products },
      },
    },
    cartSuccess,
    setCartSuccess,
  } = UserState();

  const { show } = ScreenState();

  const router = useRouter();

  // const [isInCart, setisInCart] = useState([]);
  const [invalidOrder, setInvalidOrder] = useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isOrderSuccess, setisOrderSuccess] = React.useState(false);

  const {
    isLoading: orderLoading,
    mutate: orderMutate,
    isError: orderError,
    isSuccess,
  } = useMutation(addNewOrder);

  const sendOrder = () => {
    if (!isAuthenticated) {
      setIsVisible(true);
      // onOpen();

      return;
    }
    if (orderQty < product.minOrder) {
      setInvalidOrder(`min order is ${product.minOrder} ${product.unit || "Piece"}`);
      return;
    }
    if (!Number(orderQty)) {
      setInvalidOrder(`invalid order number`);
      return;
    }
    orderMutate(
      {
        shippingAddress: {
          ...shippingAddress,
          __typename: undefined,
        },
        checkoutItems: [
          {
            quantity: Number(orderQty),
            rangePreUnitIdx: product?.rangePerUnit?.findIndex(p => p.qty === selectedRange?.qty),
            product: product._id,
            __typename: undefined,
          },
        ],
        storeIds: [product.storeId],
        prodOwnerIds: [product.user._id],
        totalPrice: Number(orderQty * product?.price).toString(),
      },
      {
        onSuccess: d => {
          setModalVisible(false);
          setModalVisible(false);
          setisOrderSuccess(true);
        },
      }
    );
  };

  return (
    <>
      <View
        style={{
          width: "100%",
          marginVertical: 10,
          flexDirection: show ? "row" : "column",
          gridGap: 10,
          flex: 1,
          flexWrap: "wrap",
        }}>
        <Button
          mode='contained'
          labelStyle={{ color: primaryColor, fontWeight: "bold" }}
          icon='basket'
          style={styles.addCart}
          onPress={() => setModalVisible(true)}
          loading={orderLoading}
          disabled={orderLoading}>
          Send Order
        </Button>

        <Button
          icon='chat-outline'
          mode='contained'
          labelStyle={{ color: accentColor, fontWeight: "bold" }}
          style={styles.buyBtn}
          // loading={
          //   addCartmutation.isLoading ||
          //   addCheckoutmutation.isLoading ||
          //   createChatRoomMutation.isLoading
          // }
          // disabled={
          //   addCartmutation.isLoading ||
          //   addCheckoutmutation.isLoading ||
          //   createChatRoomMutation.isLoading
          // }
          onPress={() => {
            if (isAuthenticated) {
              router.push(
                `https://api.whatsapp.com/send?phone=91${store.phone}&text=Hi we found you on Cubicswap. Want to enquire about ${product.name}`
              );
              // createChatRoomMutation.mutate({ sellerId: product?.user?._id });
            } else {
              setisChatroom(true);
              setIsVisible(true);
            }
          }}>
          Chat Now
        </Button>

        <Button
          // accessibilityRole='link'
          href={`tel:91${store.phone}`}
          icon='phone-forward-outline'
          mode='contained'
          labelStyle={{
            color: accentColor,
            fontWeight: "bold",
          }}
          style={styles.buyBtn}>
          Call Now
        </Button>
      </View>

      <Portal>
        <Snackbar
          wrapperStyle={{
            position: "absolute",
            bottom: 66,
          }}
          duration={1500}
          visible={invalidOrder !== ""}
          onDismiss={() => setInvalidOrder("")}
          action={{
            icon: () => <Icon name='error' type='material' color={deleteColor} />,
          }}>
          <Text style={{ color: textColor, fontWeight: "600" }}>{invalidOrder}</Text>
        </Snackbar>
      </Portal>

      <Portal>
        <Snackbar
          style={{ marginHorizontal: "auto", maxWidth: 1000, backgroundColor: accentColor }}
          wrapperStyle={{
            position: "absolute",
            bottom: 66,
          }}
          duration={1500}
          visible={isOrderSuccess}
          onDismiss={() => setisOrderSuccess(false)}
          action={{
            icon: () => <Icon name='error' type='material' color={successColor} />,
          }}>
          <Text style={{ color: primaryColor, fontWeight: "600" }}>Your order has been sent</Text>
        </Snackbar>
      </Portal>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} size={"sm"}>
        <Modal.Content maxH='380'>
          <Modal.CloseButton />
          <Modal.Header fontWeight={"700"}>{store?.storeName}</Modal.Header>
          <Modal.Body>
            <ScrollView>
              <VStack space={2}>
                <Text fontWeight={"500"} fontSize={"15px"}>
                  {/* <Text fontWeight={"700"}>Name: </Text> */}
                  Send order for {product?.name}
                </Text>
                <Text fontWeight={"500"} fontSize={"15px"}>
                  <Text fontWeight={"700"}>Total price: </Text> ₹ {selectedRange?.pricePerUnit * orderQty}
                </Text>
                <Text fontWeight={"500"} fontSize={"15px"}>
                  <Text fontWeight={"700"}>Total quantity: </Text> {orderQty}
                </Text>
              </VStack>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <NButton.Group space={2}>
              <NButton
                isLoading={orderLoading}
                isDisabled={orderLoading}
                bg={accentColor}
                color={primaryColor}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text color={primaryColor}>Cancel</Text>
              </NButton>
              <NButton
                isLoading={orderLoading}
                isDisabled={orderLoading}
                bg={accentColor}
                color={primaryColor}
                onPress={() => {
                  sendOrder();
                }}>
                <Text color={primaryColor}>Send</Text>
              </NButton>
            </NButton.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default PurchaseButton;

const styles = StyleSheet.create({
  addCart: {
    // height: "45px",
    backgroundColor: accentColor,
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 5,
    flexShrink: 1,
    flexGrow: 1,
  },
  buyBtn: {
    // height: "45px",
    backgroundColor: primaryColor,
    // justifyContent: "center",
    // alignItems: "center",
    // flex: 1,
    borderRadius: 5,
    flexGrow: 1,
    flexShrink: 1,
  },
});

// useEffect(() => {
//   if (products) {
//     setisInCart(products.filter(p => p?.product?._id === product?._id));
//   }
// }, [products, product]);

//   const buyNow = () => {
//      if (!isAuthenticated) {
//        setIsVisible(true);
//        // onOpen();
//        setisCheckout(true);

//        return;
//      }
//      if (orderQty < product.minOrder) {
//        setInvalidOrder(`min order is ${product.minOrder} ${product.unit || "Piece"}`);
//        return;
//      }
//      if (!Number(orderQty)) {
//        setInvalidOrder(`invalid order number`);
//        return;
//      }

//      addCheckoutmutation.mutate({
//        productId: product._id,
//        quantity: parseFloat(orderQty),
//      });
// }

//   const addToCart = () => {
//  if (!isAuthenticated) {
//    setIsVisible(true);
//    // onOpen();
//    setisCart(true);

//    return;
//  }
//  if (orderQty < product.minOrder) {
//    setInvalidOrder(`min order is ${product.minOrder} ${product.unit || "Piece"}`);
//    return;
//  }
//  if (!Number(orderQty)) {
//    setInvalidOrder(`invalid order number`);
//    return;
//  }

//  addCartmutation.mutate({
//    productId: product._id,
//    quantity: parseFloat(orderQty),
//  });
//   }

{
  /* {isInCart.length > 0 ? (
          <Button
            mode='contained'
            labelStyle={{ color: primaryColor, fontWeight: "bold" }}
            style={styles.addCart}
            icon='cart'
            onPress={() => router.push("/cart")}
            loading={addCartmutation.isLoading || addCheckoutmutation.isLoading}
            disabled={addCartmutation.isLoading || addCheckoutmutation.isLoading}>
            Go To Cart
          </Button>
        ) : (
          <Button
            mode='contained'
            labelStyle={{ color: primaryColor, fontWeight: "bold" }}
            icon='cart'
            style={styles.addCart}
            onPress={addToCart}
            loading={addCartmutation.isLoading || addCheckoutmutation.isLoading}
            disabled={addCartmutation.isLoading || addCheckoutmutation.isLoading}>
            Add To Cart
          </Button>
        )}

        <Button
          icon='basket'
          mode='contained'
          labelStyle={{ color: accentColor, fontWeight: "bold" }}
          style={styles.buyBtn}
          onPress={buyNow}
          loading={addCartmutation.isLoading || addCheckoutmutation.isLoading}
          disabled={addCartmutation.isLoading || addCheckoutmutation.isLoading}>
          Buy Now
        </Button> */
}

{
  /* <Portal>
        <Dialog visible={cartSuccess && addCartmutation.isSuccess} onDismiss={() => setCartSuccess(false)}>
          <Snackbar
            // wrapperStyle={{
            //   position: "absolute",
            //   bottom: 66,
            // }}
            style={{ marginHorizontal: "auto", maxWidth: 1000 }}
            duration={1500}
            visible={
              cartSuccess && addCartmutation.isSuccess
              // role === "user" &&
              // isAuthenticated &&
              // isSuccess &&
            }
            onDismiss={() => setCartSuccess(false)}
            action={{
              color: "rgb(240, 191, 76)",
              label: "Go To Cart",
              onPress: () => {
                // Do something
                router.push("/cart");
              },
              icon: () => <Icon name='check-circle' type='material' color={successColor} />,
            }}>
            Product has been added to the cart.
          </Snackbar>
        </Dialog>
      </Portal> */
}
