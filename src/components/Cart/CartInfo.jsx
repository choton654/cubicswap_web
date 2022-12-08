import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Text, View } from "react-native";

function CartInfo({ p }) {
  return (
    <View
      style={{
        justifyContent: "space-between",
        marginBottom: "10px",
        flexDirection: "row",
      }}
    >
      <View style={{ width: "70%" }}>
        <Link href={`/product/${p?._id}`} passHref>
          <Text
            style={{
              color: "#212121",
              fontSize: "16px",
            }}
          >
            {p?.name}
          </Text>
        </Link>

        <Text
          style={{
            color: "#878787",
            fontSize: "15px",
            marginTop: "1px",
          }}
        >
          Brand {p?.brand}
        </Text>

        <Text
          style={{
            fontSize: "15px",
            color: "#878787",
            marginTop: "14px",
            lineHeight: "14px",
            maxHeight: "63%",
          }}
        >
          <Text>Seller </Text> <Text>Cubicswap</Text>
        </Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 72,
          width: 80,
        }}
      >
        {p && (
          <Image
            src={
              p?.images[0].split(
                "https://res.cloudinary.com/choton/image/upload/"
              )[1]
            }
            alt={p?.name || "pic"}
            objectFit="contain"
            objectPosition="center"
            width={500}
            height={500}
            blurDataURL="/img/20x20-7171497f.png"
            placeholder="blur"
          />
        )}
      </View>
    </View>
  );
}

export default CartInfo;

// <Image
//   src={p?.image.split("https://res.cloudinary.com/toton007/image/upload/")[1]}
//   alt={p?.name}
//   objectFit="contain"
//   objectPosition="center"
//   width={500}
//   height={500}
// />;
