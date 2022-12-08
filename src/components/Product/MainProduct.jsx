import React from "react";
import { StyleSheet, View } from "react-native";
import { ScreenState } from "../../context/state/screenState";
import ProductContent from "./ProductContent";
import ProductImage from "./ProductImage";

function ProductDetails(props) {
  const { show } = ScreenState();

  return (
    <View
      style={{
        flex: 1,
        // flexDirection: show ? "row" : "column",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <ProductImage product={props.product} />
      <ProductContent {...props} />
    </View>
  );
}

export default ProductDetails;

const styles = StyleSheet.create({});
