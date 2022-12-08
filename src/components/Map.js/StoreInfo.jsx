/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import router from "next/router";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Image } from "react-native-elements";

function StoreInfo(props) {
  const { info } = props;
  const displayName = `${info.storeName}, ${info.address.state}`;

  return (
    <View style={{}}>
      <TouchableOpacity
        style={{}}
        onPress={() => router.push(`/store/${info._id}`)}
      >
        <Text style={{ textDecorationLine: "underline" }}>{displayName}</Text>
      </TouchableOpacity>
      <Image
        transition
        source={{ uri: info.images[0] }}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}

export default React.memo(StoreInfo);
