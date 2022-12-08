import { useRouter } from "next/router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

function OrderItem({ orderItem, order, showStatus }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/singleOrder?orderId=${order?._id}&productId=${orderItem?.product?._id}`)}>
      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: "#fff",
          borderColor: "rgba(39,39,39,.05)",
        }}>
        <Avatar
          source={{
            uri: orderItem?.product?.images[0],
          }}
        />

        <ListItem.Content>
          <ListItem.Title style={{ color: "rgba(39,39,39,.5)", fontWeight: "bold" }}>
            {orderItem?.orderItems?.orderStatus}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: "rgb(39,39,39)" }}>{orderItem?.product?.name}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron size={30} color='rgb(39,39,39)' />
      </ListItem>
    </TouchableOpacity>
  );
}

export default OrderItem;
{
  /* <Image
          src={
            orderItem.product.image.split(
              "https://res.cloudinary.com/toton007/image/upload/"
            )[1]
          }
          alt={orderItem.product.name}
          objectFit="contain"
          objectPosition="center"
          width={500}
          height={500}
        /> */
}
