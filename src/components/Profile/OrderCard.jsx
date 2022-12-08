import { useRouter } from "next/router";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

function OrderCard({ title, desc, link }) {
  const router = useRouter();

  return (
    <View style={styles.a}>
      <View style={{ padding: 15 }}>
        <Text style={styles.b}>{title}</Text>

        <View style={styles.c}>
          <TouchableOpacity onPress={() => router.push(link)}>
            <Text style={styles.d}>{desc}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  a: {
    backgroundColor: "rgba(39, 39, 39, 0.9)",
    marginTop: 10,
    boxShadow: "0 2px 2px 0 rgb(0 0 0 / 10%)",
  },
  b: {
    color: "rgb(240, 191, 76)",
    fontWeight: "500",
    fontFamily:
      "Roboto, Droid Sans, Helvetica Neue, Arial, Helvetica,sans-serif",
    fontSize: 16,
    wordBreak: "break-word",
  },
  c: {
    marginTop: 16,
    paddingTop: 15,
    borderTopColor: "#ebebeb",
    borderTopWidth: 1,
  },
  d: {
    color: "rgba(240, 191, 76, .8)",
    lineHeight: 16,
    textAlign: "right",
    fontSize: 14,
    textTransform: "uppercase",
    fontFamily:
      "Roboto, Droid Sans, Helvetica Neue, Arial,Helvetica, sans-serif",
  },
});

export default OrderCard;
