import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import router from "next/router";
function ActivityBtn({ href, title }) {
  return (
    <Button
      style={{
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: "#e4e4e4",
      }}
      contentStyle={{
        backgroundColor: "rgb(240, 191, 76)",
        height: "100%",
        borderColor: "rgb(39, 39, 39)",
        borderWidth: "2px",
      }}
      labelStyle={{ fontWeight: "600", color: "rgb(39, 39, 39)" }}
      onPress={() => router.push(`${href}`)}
    >
      {title}
    </Button>
  );
}

export default ActivityBtn;
