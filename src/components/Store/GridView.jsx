import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { Portal } from "react-native-paper";
import {
  accentColor,
  lightText,
  primaryColor,
  textColor,
} from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import { StoreState } from "../../context/state/storeState";
import { isCloseToBottom } from "../../utils/endScroll";
import ProductDetails from "../Home/ProductDetails";
import AddToCart from "./AddToCart";
import QuickView from "./QuickView";

const GridView = (props) => {
  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    isSuccess,
    storeCategories,
  } = props;

  const { show, screenHeight, screenWidth } = ScreenState();

  const state = StoreState();

  return (
    <View>
      {isSuccess && data.pages?.length > 0 && (
        <>
          <ScrollView
            scrollEventThrottle={10000}
            onScroll={({ nativeEvent }) => {
              if (hasNextPage && isCloseToBottom(nativeEvent)) {
                fetchNextPage();
              }
            }}
            contentContainerStyle={{
              maxHeight: !show ? screenHeight - 162 : screenHeight - 106,
              opacity: isFetching ? 0.2 : 1,
            }}
          >
            <View
              style={{
                justifyContent: "flex-start",
                minHeight: "50px",
                width: "100%",
                backgroundColor: "rgba(39, 39, 39, 0.8)",
                marginBottom: 5,
                boxSizing: "border-box",
                boxShadow: "3px 0 8px 1px rgb(0 0 0 / 40%)",
              }}
            >
              <FlatList
                contentContainerStyle={{ flex: 1 }}
                horizontal
                data={storeCategories.slice(0, 5)}
                centerContent
                keyExtractor={(item, idx) => idx.toString()}
                ListHeaderComponent={() => (
                  <TouchableOpacity
                    onPress={() => state.setOpen(!state.open)}
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Icon
                      type="material"
                      name="format-list-bulleted"
                      size={20}
                      color={primaryColor}
                    />
                  </TouchableOpacity>
                )}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.name === "All") {
                        state.setCategories([item.name.toString()]);
                        // state.setOpen(!state.open);
                      } else {
                        state.setCategories([item._id.toString()]);
                        // state.setOpen(!state.open);
                      }
                    }}
                    style={{
                      paddingHorizontal: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      flexGrow: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        color: "rgb(240, 191, 76)",
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            {data?.pages.map((p, i) => (
              <React.Fragment key={i}>
                {p?.products?.length > 0 ? (
                  <View>
                    <FlatList
                      columnWrapperStyle={{
                        backgroundColor: textColor,
                        width: screenWidth,
                        maxWidth: screenWidth,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: show && 10,
                      }}
                      key={(item, idx) => idx.toString()}
                      keyExtractor={(item, idx) => idx.toString()}
                      contentContainerStyle={{
                        backgroundColor: textColor,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      numColumns={show ? 4 : 2}
                      data={p.products}
                      centerContent
                      renderItem={({ item }) => (
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                          }}
                        >
                          <ProductDetails p={item} />
                          <View style={styles.b}>
                            <QuickView p={item} />
                          </View>
                          <View style={styles.a}>
                            <AddToCart p={item} />
                          </View>
                        </View>
                      )}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text>No products found</Text>
                  </View>
                )}
              </React.Fragment>
            ))}
          </ScrollView>
          {isFetching && (
            <Portal>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20,
                }}
              >
                <ActivityIndicator size="small" color={accentColor} />
              </View>
            </Portal>
          )}
        </>
      )}
    </View>
  );
};

export default GridView;

const styles = StyleSheet.create({
  a: {
    position: "absolute",
    // right: 8,
    // bottom: 95,
    right: 5,
    top: 10,
    width: 25,
    height: 25,
    paddingTop: 4,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: lightText,
    backgroundColor: textColor,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  b: {
    position: "absolute",
    // left: 8,
    // bottom: 95,
    right: 5,
    top: 20,
    width: 25,
    height: 25,
    paddingTop: 2,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: lightText,
    backgroundColor: textColor,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

// {
//   isFetchingNextPage ||
//     (isFetching && (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           padding: 10,
//         }}
//       >
//         <ActivityIndicator size="small" />
//       </View>
//     ));
// }
{
  /* <View>
                      {hasNextPage && (
                        <TouchableOpacity>
                          <Button
                            style={{
                              backgroundColor: "rgba(39, 39, 39, .8)",
                              borderRadius: 0,
                            }}
                            mode="text"
                            labelStyle={{
                              fontWeight: "600",
                              color: "rgb(240, 191, 76)",
                            }}
                            loading={isFetchingNextPage}
                            disabled={isFetchingNextPage}
                            onPress={() => fetchNextPage()}
                          >
                            <Text>
                              {isFetchingNextPage
                                ? "Loading more..."
                                : hasNextPage
                                ? "Load More"
                                : "Nothing more to load"}
                            </Text>
                          </Button>
                        </TouchableOpacity>
                      )}
                    </View> */
}
