import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { calculateCartTotal } from "../../utils/cartTotal";
const CartBottom = ({
  products,
  type,
  setIsVisible,
  orderLoading,
  checkoutMutate,
  checkoutLoading,
  addCartLoading,
}) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          boxShadow: "1px -1px 6px 1px rgb(0 0 0 / 10%)",
          width: "100%",
          height: 60,
          backgroundColor: "rgba(39, 39, 39,.8)",
          paddingVertical: 8,
          paddingHorizontal: 16,
          justifyContent: "space-between",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <View
          style={{
            flexBasis: "50%",
          }}
        >
          <Text
            style={{
              width: "50%",
              color: "#ddd",
              fontSize: "1rem",
              fontWeight: "bold",
              fontFamily:
                "Roboto Medium, Roboto-Medium, Droid Sans, Helvetica Neue Medium, sans-serif-medium",
            }}
          >
            <Text>₹ {calculateCartTotal(products).cartTotal}</Text>
          </Text>
          <Text
            style={{
              color: "rgb(240, 191, 76)",
              fontSize: ".8rem",
              fontWeight: "600",
            }}
          >
            Subtotal
          </Text>
        </View>
        <Button
          loading={
            type === "cart"
              ? checkoutLoading || addCartLoading
              : checkoutLoading || orderLoading
          }
          disabled={
            type === "cart"
              ? checkoutLoading || addCartLoading
              : checkoutLoading || orderLoading
          }
          style={{ height: "100%" }}
          contentStyle={{
            backgroundColor: "rgb(240, 191, 76)",
            height: "100%",
          }}
          labelStyle={{ fontWeight: "600" }}
          color="rgb(39, 39, 39)"
          onPress={() => {
            if (type === "cart") {
              checkoutMutate({});
            }
            if (type === "checkout") {
              setIsVisible(true);
            }
          }}
        >
          <Text>{type === "cart" ? "Place Order" : "CONTINUE"}</Text>
        </Button>
      </View>
    </>
  );
};

export default CartBottom;

// {
//   type === "checkout" && <></>;
// }
