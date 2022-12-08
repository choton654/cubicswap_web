import React from "react";
import { View, Text } from "react-native";

function ShippingDetails({ shippingAddress, user }) {
  return (
    <View
      style={{
        marginBottom: 8,
        backgroundColor: "rgba(39,39,39,.2)",
      }}
    >
      <Text
        style={{
          paddingHorizontal: 16,
          paddingVertical: 15,
          borderBottomWidth: 1,
          borderBottomColor: "#aaa",
          textAlign: "center",
        }}
      >
        Shipping Details
      </Text>

      <View style={{ paddingHorizontal: 16, paddingVertical: 15 }}>
        <Text style={{ fontSize: 15, fontWeight: "700" }}>
          {user && user.name}
        </Text>
        <Text>{shippingAddress?.roadName}</Text>
        <Text>{shippingAddress?.landmark}</Text>
        <Text>{shippingAddress?.city}</Text>
        <Text>
          {shippingAddress?.state} - {shippingAddress?.pinCode}
        </Text>
        <Text>Phone Number: {user && user.phone}</Text>
      </View>
    </View>
  );
}

export default ShippingDetails;
