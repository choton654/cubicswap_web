import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function CartAction({ showDialog }) {
  return (
    <>
      <View
        style={{
          borderTop: "1px solid #f0f0f0",
          color: "#212121",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomColor: "#f0f0f0",
          borderBottomWidth: "1px",
        }}
      >
        <TouchableOpacity
          style={{
            width: "50%",
            borderRight: "1px solid #f0f0f0",
            overflow: "hidden",
            paddingVertical: 16,
          }}
        >
          <Text
            style={{
              fontSize: "14px",
              fontWeight: "400",

              textAlign: "center",
            }}
          >
            Save for later
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "50%",
            borderLeft: "1px solid #f0f0f0",
            overflow: "hidden",
            paddingVertical: 16,
          }}
        >
          <Text
            style={{
              fontSize: "14px",
              fontWeight: "400",
              textAlign: "center",
            }}
            onPress={showDialog}
          >
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default CartAction;
