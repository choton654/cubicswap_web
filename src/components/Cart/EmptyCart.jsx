import { useRouter } from "next/router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-elements";

function EmptyCart({ isLogin, checkout, order }) {
  const router = useRouter();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#eee",
        paddingVertical: 30,
        paddingHorizontal: 10,
      }}
    >
      <Image
        transition
        alt="pic"
        source={{
          uri: "https://img1a.flixcart.com/www/linchpin/checkout/EmptyCart-7870c340.svg",
        }}
        style={{ width: 200, height: 200 }}
      />
      {isLogin ? (
        <>
          <Text
            style={{
              marginTop: 32,
              fontSize: 20,
            }}
          >
            Missing Cart items?
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(39, 39, 39, .8)",
              marginTop: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
            onPress={() => router.push("/signIn")}
          >
            <Text
              style={{
                color: "rgb(240, 191, 76)",
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => router.push("/market")}
          >
            <Text>Continue Shopping</Text>
          </TouchableOpacity>
        </>
      ) : checkout ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", margin: 20 }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500", color: "#666" }}>
            Your Checkout Is Empty
          </Text>
          <Text style={{ textAlign: "center", marginTop: 10, color: "#aaa" }}>
            It’s a good day to buy the items you added in cart!
          </Text>
        </View>
      ) : order ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", margin: 20 }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500", color: "#666" }}>
            You have no Orders
          </Text>
          <Text style={{ textAlign: "center", marginTop: 10, color: "#aaa" }}>
            It’s a good day to buy the items you added in cart!
          </Text>
        </View>
      ) : (
        <View
          style={{ justifyContent: "center", alignItems: "center", margin: 20 }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500", color: "#666" }}>
            Your Cart Is Empty
          </Text>
          <Text style={{ textAlign: "center", marginTop: 10, color: "#aaa" }}>
            It’s a good day to buy the items you saved for later!
          </Text>
        </View>
      )}
    </View>
  );
}

export default EmptyCart;
