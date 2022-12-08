import React from "react";
import { Text, View } from "react-native";
import { calculateCartTotal } from "../../utils/cartTotal";

const PriceDertails = ({ products }) => (
  <View
    style={{
      marginTop: 16,
      backgroundColor: "rgba(39, 39, 39,.1)",
      position: "relative",
      boxShadow: "0 2px 2px 0 rgb(0 0 0 / 10%)",
    }}
  >
    <Text
      style={{
        borderBottom: "1px solid #f0f0f0",
        color: "#878787",
        fontSize: "15px",
        fontFamily:
          "Roboto Medium, Roboto-Medium, Droid Sans, Helvetica Neue Medium, sans-serif-medium",
        fontWeight: "600",
        paddingVertical: 12,
        paddingLeft: 16,
      }}
    >
      PRICE DETAILS
    </Text>
    <View
      style={{
        paddingTop: 12,
        paddingHorizontal: 16,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ minWidth: "155px", width: "60%", paddingBottom: 12 }}>
          Price ({calculateCartTotal(products).totalItem} item)
        </Text>

        <Text style={{ textAlign: "right", paddingBottom: 12 }}>
          ₹ {calculateCartTotal(products).cartTotal}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ textAlign: "right", paddingBottom: 12 }}>
          Delivery Charges
        </Text>

        <Text
          style={{ textAlign: "right", paddingBottom: 12, color: "#388e3c" }}
        >
          FREE
        </Text>
      </View>
    </View>
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        borderTopColor: "#f0f0f0",
        borderTopWidth: "1px",
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          paddingVertical: 15,
          width: "60%",
          fontFamily:
            "Roboto Medium, Roboto-Medium, Droid Sans, Helvetica Neue Medium, sans-serif-medium",
        }}
      >
        <Text>Amount Payable</Text>
      </Text>
      <Text
        style={{
          paddingVertical: 15,
          textAlign: "right",
          fontFamily:
            "Roboto Medium, Roboto-Medium, Droid Sans, Helvetica Neue Medium, sans-serif-medium",
        }}
      >
        <Text>Price ({calculateCartTotal(products).totalItem} item)</Text>
      </Text>
    </View>
  </View>
);

export default PriceDertails;
