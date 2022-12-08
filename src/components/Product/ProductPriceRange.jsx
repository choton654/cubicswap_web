import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import {
  darkPrimaryColor,
  darkText,
  lightPrimaryColor,
  lightText,
} from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";

const ProductPriceRange = ({ product, orderQty }) => {
  const { show } = ScreenState();

  const styles = StyleSheet.create({
    a: {
      flexDirection: "row",
      marginVertical: 8,
      flexWrap: "wrap",
      flex: 1,
      gridGap: show ? 10 : 6,
      alignItems: "center",
    },
  });

  return (
    <View>
      {product.rangePerUnit && (
        <View style={styles.a}>
          {product.rangePerUnit.map((r, i) => {
            const isSelect =
              i + 1 === product.rangePerUnit.length
                ? orderQty >= r.qty
                : orderQty >= r.qty &&
                  orderQty <= product.rangePerUnit[i + 1].qty - 1;

            return (
              <View
                key={i}
                style={{
                  alignItems: "center",
                  padding: 8,
                  backgroundColor: isSelect ? lightPrimaryColor : lightText,
                }}
              >
                {i + 1 === product.rangePerUnit.length ? (
                  <Text
                    style={{
                      color: isSelect ? darkPrimaryColor : darkText,
                    }}
                  >
                    Order {">="} {r.qty}{" "}
                    {r.qty > 1 ? `${product.unit}s` : `${product.unit}`}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: isSelect ? darkPrimaryColor : darkText,
                    }}
                  >
                    Order{" "}
                    {r.qty === product.rangePerUnit[i + 1].qty - 1
                      ? r.qty
                      : `${r.qty} - ${
                          product.rangePerUnit[i + 1].qty - 1
                        }`}{" "}
                    {product.rangePerUnit[i + 1].qty - 1 > 1
                      ? `${product.unit}s`
                      : `${product.unit}`}
                  </Text>
                )}

                <Text
                  style={{
                    color: isSelect ? darkPrimaryColor : darkText,
                    fontWeight: "700",
                    fontSize: 15,
                    marginTop: 5,
                  }}
                >
                  ₹ {r.pricePerUnit}/{product.unit}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default ProductPriceRange;
