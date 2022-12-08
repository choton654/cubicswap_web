import { Actionsheet } from "native-base";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { Button, RadioButton } from "react-native-paper";
import { ScreenState } from "../../context/state/screenState";
import { calculateCartTotal } from "../../utils/cartTotal";

function Payment({ products, isVisible, setIsVisible, me, orderMutate, orderLoading }) {
  const [value, setValue] = useState("2");
  const { screenWidth } = ScreenState();

  return (
    <Actionsheet
      isOpen={isVisible}
      onClose={() => setIsVisible(false)}
      maxW={screenWidth}
      w={screenWidth}
      mx={"auto"}>
      <View
        style={{
          paddingVertical: 10,
          backgroundColor: "rgb(39, 39, 39)",
          width: "100%",
        }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          <Text
            style={{
              color: "rgba(240, 191, 76,.8)",
              fontWeight: "bold",
              fontSize: "20px",
            }}>
            Payments
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}>
            <Icon name='close' type='material' color='rgb(240, 191, 76)' />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderBottomColor: "#aaa",
            borderBottomWidth: "1px",
          }}>
          <Text style={{ fontSize: "15px", color: "rgba(240, 191, 76,.8)" }}>All Other Options</Text>
        </View>
        <View style={{}}>
          <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
            <RadioButton.Item
              uncheckedColor='rgba(240, 191, 76,.5)'
              label='Pay Online'
              value='1'
              disabled
              labelStyle={{ color: "rgba(240, 191, 76,.8)" }}
            />
            <RadioButton.Item
              color='rgb(240, 191, 76)'
              label='Cash On Delivery'
              value='2'
              labelStyle={{ color: "rgba(240, 191, 76,.8)" }}
            />
          </RadioButton.Group>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            borderTopColor: "#aaa",
            borderTopWidth: "1px",
          }}>
          <View>
            <Text
              style={{
                color: "#eee",
                fontSize: "18px",
                marginBottom: 5,
                fontWeight: "600",
              }}>
              ₹ {calculateCartTotal(products).cartTotal}
            </Text>
            <Text style={{ color: "rgb(240, 191, 76)", fontSize: "15px" }}>Total Price</Text>
          </View>
          <Button
            loading={orderLoading}
            disabled={orderLoading}
            style={{ height: "100%" }}
            contentStyle={{
              backgroundColor: "rgb(240, 191, 76)",
              height: "100%",
              borderColor: "rgb(39, 39, 39)",
              borderWidth: "2px",
            }}
            labelStyle={{ fontWeight: "600" }}
            color='rgb(39, 39, 39)'
            onPress={() => {
              orderMutate({
                shippingAddress: {
                  ...me.shippingAddress,
                  __typename: undefined,
                },
                checkoutItems: products.map(p => ({
                  ...p,
                  quantity: p.quantity,
                  rangePreUnitIdx: p.rangePreUnitIdx,
                  product: p.product._id,
                  __typename: undefined,
                })),

                storeIds: products.map(p => p.product.storeId._id),
                prodOwnerIds: products.map(p => p.product.user._id),

                totalPrice: calculateCartTotal(products).cartTotal,
              });
            }}>
            <Text>Place Order</Text>
          </Button>
        </View>
      </View>
    </Actionsheet>
  );
}

export default Payment;

// <BottomSheet
//     isVisible={isVisible}
//     containerStyle={{
//       maxWidth: screenWidth,
//       width: screenWidth,
//       marginHorizontal: "auto",
//     }}
//   ></BottomSheet>
