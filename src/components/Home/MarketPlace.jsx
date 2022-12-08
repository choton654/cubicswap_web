import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
// import { RefreshControl } from "react-native-web-refresh-control";
import CategoryList from "../Category/CategoryList";
import Banner from "./Banner";
import GroupProduct from "./GroupProduct";
import Layout from "../Layout";
import Slider from "./Slider";
import { bannerImages } from "../../Constant/bannerImages";
// import router from "next/router";
import Footer from "../Layout/Footer";
import ProductDetails from "./ProductDetails";
import { ScreenState } from "../../context/state/screenState";

function MarketPlace({ topProds: data, categories, newArrivas }) {
  // const [refreshing, setRefreshing] = useState(false);
  const { show } = ScreenState();

  const mediaByIndex = (index) => bannerImages[index % bannerImages.length];
  const SLIDE_COUNT = bannerImages.length;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <Layout title={"Cubicswap"}>
      <ScrollView
      // refreshControl={
      //   <RefreshControl
      //     refreshing={refreshing}
      //     removeClippedSubviews
      //     hitSlop={{ top: 50 }}
      //     onRefresh={() => {
      //       router.reload();
      //       setRefreshing(false);
      //     }}
      //   />
      // }
      >
        <CategoryList prodCategories={categories} main />
        <Banner />
        <Slider slides={slides} mediaByIndex={mediaByIndex} />
        <>
          <View style={{ marginBottom: 10, alignItems: "center" }}>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 10,
                paddingHorizontal: 20,
                // flexDirection: "row",
                width: "100%",
                backgroundColor: "rgba(39, 39, 39, 0.2)",
              }}
            >
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "rgb(33, 33, 33)",
                }}
              >
                New Arrivals
              </Text>
            </View>
            <View style={{ width: "100%", shadowColor: "rgb(150, 150, 150)" }}>
              {newArrivas?.length > 0 && (
                <FlatList
                  columnWrapperStyle={styles.a}
                  key={(item, idx) => idx.toString()}
                  contentContainerStyle={styles.fcon}
                  numColumns={show ? 4 : 2}
                  data={newArrivas}
                  centerContent
                  keyExtractor={(item, idx) => idx.toString()}
                  renderItem={({ item }) => <ProductDetails p={item} />}
                />
              )}
            </View>
          </View>

          {data?.length > 0 && (
            <FlatList
              data={data}
              centerContent
              key={(item, idx) => idx.toString()}
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => <GroupProduct {...item} />}
            />
          )}
        </>
        <Footer />
      </ScrollView>
    </Layout>
  );
}

export default MarketPlace;

const styles = StyleSheet.create({
  a: {
    backgroundColor: "#fff",
  },
  fcon: {
    // flexDirection: "row",
    backgroundColor: "#fff",
    // alignSelf: "baseline",
  },
});
