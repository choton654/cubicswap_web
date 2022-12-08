import { Badge, Box } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import SingleOrderItem from "./SingleOrderItem";

function OrderDetails({ orderItem, orderId }) {
  return (
    <View
      style={{
        marginBottom: 8,
        backgroundColor: "#eee",
        boxShadow: "0 2px 2px -1px rgb(0 0 0 / 20%)",
      }}>
      <Text
        style={{
          color: "rgb(39,39,39)",
          fontSize: 15,
          paddingVertical: 15,
          paddingHorizontal: 16,
          borderColor: "#f0f0f0",
          borderBottomWidth: 1,
        }}>
        Order ID - <Text style={{ fontWeight: "500" }}>{orderId}</Text>
      </Text>
      <Text
        style={{
          color: "rgb(39,39,39)",
          fontSize: 15,
          // paddingVertical: 15,
          paddingHorizontal: 16,
          borderColor: "#f0f0f0",
          borderBottomWidth: 1,
        }}>
        Ordered at -{" "}
        <Text style={{ fontWeight: "500" }}>
          {new Date(orderItem.createdAt.toString()).toDateString()}
        </Text>
      </Text>
      <Text
        style={{
          color: "rgb(39,39,39)",
          fontSize: 15,
          marginTop: 5,
          paddingHorizontal: 16,
          borderColor: "#f0f0f0",
          borderBottomWidth: 1,
        }}>
        Order status -{" "}
        {orderItem?.orderStatus === "asked" ? (
          <Badge colorScheme='info' variant={"subtle"}>
            {orderItem?.orderStatus?.toUpperCase()}
          </Badge>
        ) : (
          <Badge colorScheme='success' variant={"subtle"}>
            {orderItem?.orderStatus?.toUpperCase()}
          </Badge>
        )}
      </Text>
      <SingleOrderItem orderItem={orderItem} />
      <View
        style={{
          marginTop: 3,
          paddingHorizontal: 16,
          paddingVertical: 5,
          borderTopColor: "#f0f0f0",
          borderTopWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <Text
          style={{
            paddingBottom: 5,
            width: "60%",
            overflow: "hidden",
            fontFamily:
              'Roboto Medium,Roboto-Medium,Droid Sans,HelveticaNeue-Medium,Helvetica Neue Medium,"sans-serif-medium"',
          }}>
          Total Amount
        </Text>
        <Text
          style={{
            marginRight: 25,
            fontWeight: "500",
            flexDirection: "column-reverse",
            fontSize: 15,
          }}>
          ₹{" "}
          {orderItem?.product.rangePerUnit
            ? orderItem?.product.rangePerUnit[orderItem?.rangePreUnitIdx]
                ?.pricePerUnit * orderItem?.quantity
            : orderItem?.product.price * orderItem?.quantity}
        </Text>
      </View>
    </View>
  );
}

export default OrderDetails;

// <TouchableOpacity>
//   <Text
//     style={{
//       color: "#212121",
//       textAlign: "center",
//       paddingVertical: 10,
//       borderColor: "#aaa",
//       borderTopWidth: 1,
//     }}
//   >
//     Cancel
//   </Text>
// </TouchableOpacity>;
