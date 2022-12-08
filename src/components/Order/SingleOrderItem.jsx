// import Image from "next/image";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import Image from "next/image";

function SingleOrderItem({ orderItem }) {
  return (
    <View style={{ paddingVertical: 15, paddingHorizontal: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ maxWidth: "70%" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginBottom: 3,
              overflow: "hidden",
              color: "rgb(39, 39, 39)",
            }}
          >
            {orderItem?.product?.name}
          </Text>
          <Text
            style={{ fontSize: 15, color: "rgb(39, 39, 39)", marginBottom: 10 }}
          >
            Brand: {orderItem?.product?.brand}
          </Text>
          {/* <Text style={{ fontSize: 15, color: "rgb(39, 39, 39)" }}>
            Category: {orderItem?.product?.category}
          </Text> */}
          <View style={{ marginTop: 5 }}>
            <Text style={{ fontSize: 18, color: "rgb(39, 39, 39)" }}>
              {orderItem?.quantity} x ₹{" "}
              {orderItem?.product?.rangePerUnit
                ? orderItem?.product?.rangePerUnit[orderItem?.rangePreUnitIdx]
                    ?.pricePerUnit
                : orderItem?.product?.price}
            </Text>
          </View>
        </View>
        <View style={{ width: 90 }}>
          <View
            style={{
              width: 72,
              height: 72,
              marginHorizontal: "auto",
              marginVertical: 0,
            }}
          >
            {orderItem?.product && (
              <Image
                src={
                  orderItem?.product?.images[0].split(
                    "https://res.cloudinary.com/choton/image/upload/"
                  )[1]
                }
                alt={orderItem?.product?.name || "pic"}
                objectFit="contain"
                objectPosition="center"
                width={500}
                height={500}
                placeholder="blur"
                blurDataURL="/img/20x20-7171497f.png"
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

export default SingleOrderItem;

//  <Image
//    src={
//      orderItem?.product?.image?.split(
//        "https://res.cloudinary.com/toton007/image/upload/"
//      )[1]
//    }
//    alt={orderItem?.product?.name}
//    objectFit="contain"
//    objectPosition="center"
//    width={500}
//    height={500}
//  />;
