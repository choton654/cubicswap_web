import router from "next/router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, CheckBox, ListItem } from "react-native-elements";
import AddToCart from "../Store/AddToCart";

const WishlistItem = ({ item, alreadyinCart, selected, handelToggle }) => {
  return (
    <ListItem bottomDivider containerStyle={{ padding: 10 }}>
      <View>
        <Avatar
          size={50}
          source={{ uri: item?.product?.images[0] }}
          avatarStyle={{ resizeMode: "contain" }}
        />
        <CheckBox
          checked={selected.some(
            (s) => s.product.toString() === item?.product?._id.toString()
          )}
          onPress={() => handelToggle(item?.product?._id)}
        />
      </View>
      <ListItem.Content style={{ gridGap: 5 }}>
        <ListItem.Title
          onPress={() => router.push(`/product/${item?.product?._id}`)}
        >
          {item?.product?.name}
        </ListItem.Title>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            // gridGap: 20,
            alignItems: "center",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <View style={{}}>
            {/* <ListItem.Subtitle>{`min order is ${item?.product?.minOrder} ${item?.product?.unit}`}</ListItem.Subtitle> */}
            <ListItem.Subtitle style={{ fontWeight: "500" }}>
              Price ₹{" "}
              {item?.product?.rangePerUnit
                ? item?.product?.rangePerUnit[item?.rangePreUnitIdx]
                    ?.pricePerUnit
                : item?.product?.price}
              /{item?.product?.unit || "Piece"}
            </ListItem.Subtitle>
          </View>

          <View style={{ marginRight: 50 }}>
            <AddToCart p={item.product} wishlist={{ qty: item.quantity }} />
          </View>
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default WishlistItem;

const styles = StyleSheet.create({});

{
  /* {alreadyinCart.some(
            (p) => p.product._id.toString() === item?.product?._id.toString()
          ) && (
            <View style={{ flexDirection: "row", gridGap: 10 }}>
              <TouchableOpacity>
                <Icon
                  size={25}
                  color={primaryColor}
                  type="material"
                  name="add-shopping-cart"
                />
              </TouchableOpacity>
            </View>
          )} */
}
