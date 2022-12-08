import { useRouter } from "next/router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

function RestOrderItems({ orderId, orderItem }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.replace(
          `/singleOrder?orderId=${orderId}&productId=${orderItem.product._id}`
        )
      }
    >
      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: "rgba(39, 39, 39, .2)",
        }}
      >
        <ListItem.Content>
          <ListItem.Title
            style={{
              fontWeight: "bold",
            }}
          >
            {orderItem.product.name}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{
              fontWeight: "500",
            }}
          >
            {orderItem.orderStatus}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Avatar
          source={{
            uri: orderItem.product.images[0],
          }}
        />
      </ListItem>
    </TouchableOpacity>
  );
}

export default RestOrderItems;
