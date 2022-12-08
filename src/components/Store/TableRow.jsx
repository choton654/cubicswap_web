import { Box, Text } from "native-base";
import router from "next/router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, DataTable } from "react-native-paper";
import { accentColor } from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import AddToCart from "./AddToCart";
import QuickView from "./QuickView";

const Wrapper = ({ children }) => <Text style={{ color: accentColor }}>{children}</Text>;

const TableRow = ({ p, setViewProduct, setIsVisible }) => {
  const { show } = ScreenState();

  return (
    <DataTable.Row>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          gridGap: 10,
        }}>
        <DataTable.Cell>
          <Avatar.Image
            size={30}
            source={{
              uri: p?.images[0],
            }}
          />
        </DataTable.Cell>

        {show ? (
          <DataTable.Cell
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexBasis: "30%",
            }}>
            <TouchableOpacity onPress={() => router.push(`/product/${p._id}`)}>
              <Wrapper>{p.name}</Wrapper>
            </TouchableOpacity>
          </DataTable.Cell>
        ) : (
          <Box flex={1} flexBasis={"30%"} onPress={() => router.push(`/product/${p._id}`)}>
            <Text>{p.name.length > 20 ? `${p.name.slice(0, 20)}...` : p.name}</Text>
          </Box>
        )}

        <DataTable.Cell style={{ flexBasis: "10%" }}>
          <Wrapper>₹ {p.price}</Wrapper>
        </DataTable.Cell>
        <QuickView p={p} setViewProduct={setViewProduct} setIsVisible={setIsVisible} />
        {/* <AddToCart p={p} /> */}
      </View>
    </DataTable.Row>
  );
};

export default TableRow;

const styles = StyleSheet.create({});
