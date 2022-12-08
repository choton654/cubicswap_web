import * as Sharing from "expo-sharing";
import getBrowserFingerprint from "get-browser-fingerprint";
import { Badge, Box, Flex, HStack, Image, Link, VStack, Text, Pressable } from "native-base";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useMutation } from "react-query";
import { client } from "../../client";
import { accentColor, deleteColor, lightAccentColor, linkColor, primaryColor } from "../../Constant/color";
import { UserState } from "../../context/state/userState";
import { UPDATE_PRODUCT_VIEWS } from "../../graphql/mutation";
import WishlistIcon from "../Wishlist/WishlistIcon";
import ProductDesc from "./ProductDesc";
import ProductPriceRange from "./ProductPriceRange";
import PurchaseButton from "./PurchaseButton";
import SetQuantity from "./SetQuantity";

export const updateProdViews = async variables => {
  const { updateProductViews } = await client.request(UPDATE_PRODUCT_VIEWS, variables);
  return updateProductViews;
};

const ProductContent = ({
  store,
  product,
  orderQty,
  setOrderQty,
  setIsVisible,
  setisCheckout,
  setisCart,
  selectedRange,
  addCartmutation,
  addCheckoutmutation,
  createChatRoomMutation,
  setisChatroom,
  topParent,
  midPrent,
  lastParent,
}) => {
  const {
    state: {
      user: { role },
      isAuthenticated,
    },
  } = UserState();

  // const [fingerprint] = useState(getBrowserFingerprint());

  // const [views, setviews] = useState(product?.views);

  // const { mutate } = useMutation(updateProdViews);

  // useEffect(() => {
  //   if (views?.some(v => v === fingerprint)) {
  //     return;
  //   } else {
  //     mutate(
  //       {
  //         productId: product._id,
  //         viewId: fingerprint,
  //       },
  //       {
  //         onSuccess: d => {
  //           console.log(d);
  //           setviews([...product?.views, fingerprint]);
  //         },
  //       }
  //     );
  //   }
  // }, [fingerprint, mutate, product._id, product?.views, views]);

  const sharePage = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      return;
    }
    console.log(`${window.location.origin}/product/${product._id}`);
    await Sharing.shareAsync(`${window.location.origin}/product/${product._id}`);
  };

  return (
    <VStack
      space={2}
      backgroundColor={"#fff"}
      flex={1}
      gridGap={8}
      maxWidth={"100%"}
      py={8}
      px={[15, 25]}
      marginBottom={".8rem"}>
      <Flex w='full' mb={"10px"} direction='row' alignItems='center' bg={"#fff"}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            // gridGap: 10,
            justifyContent: "center",
            flexDirection: "row",
            // width: "100%",
            // paddingHorizontal: 10,
            // paddingTop: 10,
          }}>
          <Link
            isUnderlined
            onPress={() => {
              router.push(`/categories/allCategories`);
            }}>
            <Badge backgroundColor={primaryColor} color={accentColor}>
              All Collections
            </Badge>
          </Link>

          <Box>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 0 24 24'
              width='20px'
              fill={primaryColor}>
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z' />
            </svg>
          </Box>

          <Link onPress={() => router.push(`/categories/allCategories/${topParent._id}`)}>
            <Badge backgroundColor={primaryColor} color={accentColor}>
              {topParent.name}
            </Badge>
          </Link>

          <Box>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 0 24 24'
              width='20px'
              fill={primaryColor}>
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z' />
            </svg>
          </Box>

          {topParent._id !== midPrent._id && (
            <Link onPress={() => router.push(`/categories/allCategories/mid/${midPrent._id}`)}>
              <Badge backgroundColor={primaryColor} color={accentColor}>
                {midPrent.name}
              </Badge>
            </Link>
          )}
          <Box>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 0 24 24'
              width='20px'
              fill={primaryColor}>
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z' />
            </svg>
          </Box>

          <Link onPress={() => router.push(`/categories/${lastParent._id}`)}>
            <Badge backgroundColor={primaryColor} color={accentColor}>
              {lastParent.name}
            </Badge>
          </Link>
        </ScrollView>
      </Flex>

      {/* content */}
      <View
        style={{
          flexDirection: "row",
          // flex: 1,
          flexWrap: "wrap",
          gridGap: 10,
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}>
        <Text
          style={{
            fontSize: "1.2rem",
            fontWeight: "500",
            wordBreak: "break-all",
            letterSpacing: 1,
            color: "#212121",
            overflow: "hidden",
          }}>
          {product.name}
        </Text>
      </View>

      <HStack space={4} rounded={"md"} p={"2"}>
        {<WishlistIcon product={product} size={25} />}

        {/* <Flex direction='row'>
          <Box>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='20px'
              viewBox='0 0 24 24'
              width='24px'
              fill={accentColor}>
              <path d='M0 0h24v24H0z' fill='none' />
              <path d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z' />
            </svg>
          </Box>
          <Text ml={"5px"}>{views?.length || 0}</Text>
        </Flex> */}

        <Pressable onPress={sharePage}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='20px'
            viewBox='0 0 24 24'
            width='24px'
            fill={accentColor}>
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z' />
          </svg>
        </Pressable>
      </HStack>

      {/* store link */}
      <TouchableOpacity accessibilityRole='link' onPress={() => router.push(`/store/${store._id}`)}>
        <HStack my={"2"} space={2} alignItems={"center"}>
          <Image h={"10"} w={"10"} src={store?.images[0]} alt={store?.storeName} rounded={"full"} />
          <Text
            style={{
              color: linkColor,
              fontWeight: "500",
            }}>
            Visit the {store.storeName} store
          </Text>
          {/* <Icon type="material" name="share" onPress={sharePage} /> */}
        </HStack>
      </TouchableOpacity>

      {/* <ProductRatings /> */}

      {/* price */}
      <View style={styles.e}>
        {product.minOrder && (
          <Text style={styles.f}>
            Min Order Quantity {product.minOrder} {product.minOrder > 1 ? `${product.unit}s` : `${product.unit}`}
          </Text>
        )}
        <View style={styles.g}>
          <Text style={styles.h}>
            {/* ₹ {product.price}/{product.unit} */}₹ {selectedRange?.pricePerUnit}/{product.unit}
          </Text>
        </View>
      </View>

      {/* quantity and price range */}
      <ProductPriceRange product={product} orderQty={orderQty} />

      <SetQuantity setOrderQty={setOrderQty} orderQty={orderQty} product={product} />

      <HStack ml={"10px"}>
        <Text fontWeight={"500"} fontSize={"18px"}>
          Total{"  "}
        </Text>
        <Text fontWeight={"500"} fontSize={"18px"}>
          ₹ {selectedRange?.pricePerUnit * orderQty}
        </Text>
      </HStack>

      {/* dexcription */}
      <ProductDesc product={product} />

      {/* buttons */}
      <View style={{ marginTop: 8 }}>
        {role !== "seller" && (
          <PurchaseButton
            store={store}
            setIsVisible={setIsVisible}
            setisCheckout={setisCheckout}
            setisCart={setisCart}
            product={product}
            selectedRange={selectedRange}
            orderQty={orderQty}
            addCartmutation={addCartmutation}
            addCheckoutmutation={addCheckoutmutation}
            createChatRoomMutation={createChatRoomMutation}
            setisChatroom={setisChatroom}
          />
        )}
      </View>
    </VStack>
  );
};

export default ProductContent;

const styles = StyleSheet.create({
  i: { backgroundColor: primaryColor },
  a: {
    backgroundColor: "#fff",
    flex: 1,
    // flexWrap: "wrap",
    gridGap: 8,
    // maxWidth: show ? "50%" : "100%",
    maxWidth: "100%",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: ".8rem",
    // justifyContent: "flex-start",
    // alignContent: "flex-start",
  },

  c: {},
  d: {},
  e: { marginRight: ".8rem", paddingTop: ".3rem" },
  f: {
    color: deleteColor,
    fontSize: "1rem",
    fontWeight: "500",
    marginBottom: 10,
  },
  g: {
    width: "100%",
    marginRight: ".8rem",
  },
  h: { fontWeight: "500", fontSize: 20 },
});

// <ListItem.Accordion
//   content={
//     <>
//       <ListItem.Content>
//         <ListItem.Title>ABOUT THIS ITEM</ListItem.Title>
//       </ListItem.Content>
//     </>
//   }
//   isExpanded={expanded}
//   onPress={handlePress}
//   containerStyle={{
//     borderColor: accentColor,
//     borderRadius: 10,
//     padding: 10,
//     borderWidth: 1,
//   }}
// >
//   <ScrollView
//     contentContainerStyle={{
//       paddingVertical: 10,
//       paddingHorizontal: 10,
//       maxHeight: 100,
//     }}
//   >
//     <Text>{product.description}</Text>
//   </ScrollView>
// </ListItem.Accordion>;

//  <View style={{ marginTop: 8 }}>
//    <Text
//      style={{
//        fontSize: "1rem",
//        textTransform: "uppercase",
//        fontWeight: "500",
//        marginVertical: 8,
//      }}
//    >
//      ABOUT THIS ITEM
//    </Text>
//    <ScrollView contentContainerStyle={{ maxHeight: 100 }}>
//      <Text>{product.description}</Text>
//    </ScrollView>
//  </View>;

// <Button
//   mode="contained"
//   style={{ margin: 10, borderRadius: 10 }}
//   labelStyle={{ fontWeight: "600", fontSize: 12 }}
//   onPress={() => router.push(`/store/${store._id}`)}
// >
//   <Text>Visit the {store.storeName} store</Text>
// </Button>;

//  <FlatList
//    contentContainerStyle={{ marginVertical: 8, flexWrap: "wrap" }}
//    horizontal
//    //   scrollEnabled={false}
//    key={(item, idx) => idx.toString()}
//    data={product.rangePerUnit}
//    centerContent
//    showsHorizontalScrollIndicator={show}
//    keyExtractor={(item, idx) => idx.toString()}
//    renderItem={({ item: r, index: i }) => {}}
//  />;
