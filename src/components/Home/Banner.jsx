import * as React from "react";
import { View, Text } from "react-native";

const Banner = () => (
  <View style={{ paddingVertical: 5 }}>
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        marginVertical: 10,
        backgroundColor: "rgba(39, 39, 39,.8)",
      }}
    >
      <Text style={{ color: "rgb(240, 191, 76)", fontWeight: "bold" }}>
        Everything on SELL. Upto 50% off
      </Text>
    </View>
  </View>
);
export default Banner;
