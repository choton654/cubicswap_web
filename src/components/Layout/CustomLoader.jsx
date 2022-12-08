import React from "react";
import { ActivityIndicator, View } from "react-native";
import { accentColor, primaryColor } from "../../Constant/color";

function CustomLoader({ height }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: accentColor,
      }}>
      <ActivityIndicator size='large' color={primaryColor} />
    </View>
  );
}

export default CustomLoader;
