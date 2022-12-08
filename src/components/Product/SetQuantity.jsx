import { Box } from "native-base";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements/dist/input/Input";
import { accentColor, primaryColor } from "../../Constant/color";

const SetQuantity = ({ setOrderQty, orderQty, product }) => {
  useEffect(() => {
    if (product?.minOrder) {
      setOrderQty(product?.minOrder?.toString());
    }
  }, [product, setOrderQty]);

  useEffect(() => {
    if (!Number(orderQty)) {
      setOrderQty(0);
    }
  }, [orderQty, setOrderQty]);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 10,
      }}>
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Qty</Text>
      </View>
      <Input
        keyboardType='numeric'
        value={orderQty}
        onChangeText={text => {
          // if (!Number(text)) {
          //   return;
          // }
          setOrderQty(text);
        }}
        containerStyle={{
          paddingLeft: 0,
          paddingRight: 0,
          height: 30,
          maxWidth: 150,
        }}
        inputStyle={{
          textAlign: "center",
          maxWidth: 80,
          borderColor: primaryColor,
          height: 30,
          borderWidth: 2,
        }}
        inputContainerStyle={{
          borderBottomWidth: 0,
          maxWidth: 150,
          height: 30,
        }}
        leftIcon={() => (
          <TouchableOpacity
            onPress={() => {
              if (orderQty <= product.minOrder || orderQty <= 1) {
                return;
              }
              setOrderQty(p => {
                if (p === "") {
                  return "1";
                }
                const x = parseInt(p) - 1;
                return x.toString();
              });
            }}>
            <Box>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill={accentColor}>
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M19 13H5v-2h14v2z' />
              </svg>
            </Box>
          </TouchableOpacity>
        )}
        rightIcon={() => (
          <TouchableOpacity
            onPress={() => {
              setOrderQty(p => {
                if (p === "") {
                  return "1";
                }
                const x = parseInt(p) + 1;
                return x.toString();
              });
            }}>
            <Box>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill={accentColor}>
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
              </svg>
            </Box>
          </TouchableOpacity>
        )}
        leftIconContainerStyle={{
          backgroundColor: primaryColor,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
          height: 40,
          paddingRight: 10,
        }}
        rightIconContainerStyle={{
          backgroundColor: primaryColor,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
          height: 40,
          paddingRight: 10,
        }}
      />
    </View>
  );
};

export default SetQuantity;

const styles = StyleSheet.create({});
