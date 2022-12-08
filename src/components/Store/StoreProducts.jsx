import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import {
  Actionsheet,
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  VStack,
} from "native-base";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { useInfiniteQuery } from "react-query";
import { client } from "../../client";
import ImageCorosal from "../../components/Product/ImageCorosal";
import {
  accentColor,
  darkPrimaryColor,
  lightText,
  primaryColor,
  textColor,
} from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import { GET_PRODUCTS_BY_STORE } from "../../graphql/query";
import ProductDetails from "../Home/ProductDetails";
import Layout from "../Layout";
import Footer from "../Layout/Footer";
import LoadMore from "../Layout/LoadMore";
import ProductPriceRange from "../Product/ProductPriceRange";
import QuickView from "./QuickView";
import StoreCategories from "./StoreCategories";
import StoreLayout from "./StoreLayout";
import TablePagination from "./TablePagination";
import TableRow from "./TableRow";
import router from "next/router";

const getProductsByOptionsQuery = async (
  pageParam,
  numberOfItemsPerPage,
  categories,
  sort,
  id
) => {
  let getProductsByStoreFilter;
  if (categories.length === 0 || categories[0] === "All") {
    getProductsByStoreFilter = {
      storeId: id,
    };
  } else {
    getProductsByStoreFilter = {
      storeId: id,
      _operators: { categories: { in: [...categories] } },
    };
  }

  const { getProductsByOptions } = await client.request(GET_PRODUCTS_BY_STORE, {
    getProductsByStoreFilter,
    getProductsByStorePage: pageParam,
    getProductsByStorePerPage: numberOfItemsPerPage,
    getProductsByStoreSort: sort,
  });

  return {
    products: getProductsByOptions.items,
    currentPage: getProductsByOptions.pageInfo.currentPage,
    pageCount: getProductsByOptions.pageInfo.pageCount,
    perPage: getProductsByOptions.pageInfo.perPage,
    hasNextPage: getProductsByOptions.pageInfo.hasNextPage,
    hasPreviousPage: getProductsByOptions.pageInfo.hasPreviousPage,
    count: getProductsByOptions.count,
  };
};

const StoreProducts = (props) => {
  const Drawer = createDrawerNavigator();

  const { show, screenHeight, screenWidth, setSelectedIndex } = ScreenState();

  const [sort, setSort] = React.useState("NAME_ASC");
  const [page, setPage] = React.useState(1);
  const [categories, setCategories] = React.useState([]);
  const [selectCatName, setSelectCatName] = React.useState("All");
  const [toggle, setToggle] = React.useState(true);
  const [storeCategories] = React.useState(props.storeCategories);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const [isVisible, setIsVisible] = React.useState(false);

  const [viewProduct, setViewProduct] = React.useState(null);

  const mediaByIndex = (index) =>
    viewProduct && viewProduct.images[index % viewProduct.images.length];
  const SLIDE_COUNT = viewProduct && viewProduct.images.length;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery(
    [
      "getProductsByOptions-store",
      [numberOfItemsPerPage, categories, sort, page],
    ],
    ({ pageParam = 1 }) =>
      getProductsByOptionsQuery(
        pageParam,
        numberOfItemsPerPage,
        categories,
        sort,
        props.id
      ),
    {
      // enabled: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      initialData: props.data,
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
      },
      getPreviousPageParam: (firstPage, allPages) => {
        return firstPage.hasPreviousPage;
      },
      onSettled: () => {
        if (open) {
          setOpen(!open);
        }
      },
    }
  );

  const hideDetails = () => {
    setIsVisible(false);
    setViewProduct(null);
  };

  // const loadMore = () => {
  //   if (hasNextPage) {
  //     setTimeout(() => {
  //       if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
  //         fetchNextPage();
  //       }
  //     }, 2000);
  //   }
  // };

  return (
    <Layout title={props.store.storeName}>
      <StoreLayout store={props.store} toggle={toggle} setToggle={setToggle} />
      {isLoading && (
        <Flex flex={1} my={"50%"}>
          <Spinner size="sm" color={accentColor} />
        </Flex>
      )}
      <Drawer.Navigator
        drawerContent={() => (
          <DrawerContentScrollView
            contentContainerStyle={{
              backgroundColor: accentColor,
              paddingTop: 0,
              // height: "100%",
              maxHeight: !show ? screenHeight - 160 : screenHeight - 104,
              flex: 1,
              zIndex: 100,
            }}
          >
            <View
              style={{
                backgroundColor: accentColor,
                height: screenHeight - 56,
              }}
            >
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: 10,
                  backgroundColor: accentColor,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    color: primaryColor,
                  }}
                >
                  Categories
                </Text>
              </View>
              <View style={{}}>
                {[{ name: "All" }, ...storeCategories].map((p, i) => (
                  <TouchableOpacity
                    key={i}
                    style={{
                      flexDirection: "row",
                      backgroundColor: accentColor,
                      justifyContent: "space-between",
                      alignItems: "center",
                      gridGap: 10,
                    }}
                    // disabled={categories.name === p.name}
                    onPress={() => {
                      if (p.name === "All") {
                        setCategories([p.name.toString()]);
                        setSelectCatName(p.name.toString());
                      } else {
                        setCategories([p._id.toString()]);
                        setSelectCatName(p.name.toString());
                      }
                    }}
                  >
                    <ListItem
                      style={{ width: "100%" }}
                      containerStyle={{
                        padding: 10,
                        marginHorizontal: 10,
                        marginVertical: 5,
                        backgroundColor:
                          selectCatName === p.name
                            ? darkPrimaryColor
                            : primaryColor,
                        borderRadius: 5,
                      }}
                    >
                      <ListItem.Content>
                        <ListItem.Title
                          style={{ fontWeight: 500, color: accentColor }}
                        >
                          {p.name}
                        </ListItem.Title>
                      </ListItem.Content>
                      <Icon
                        color={accentColor}
                        style={{
                          marginLeft: "auto",
                        }}
                        type="material"
                        name={"chevron-right"}
                      />
                    </ListItem>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </DrawerContentScrollView>
        )}
        screenOptions={{
          drawerStyle: {
            backgroundColor: accentColor,
            maxWidth: show ? 220 : 0,
            // height: "100%",
            maxHeight: !show ? screenHeight - 160 : screenHeight - 104,
          },
          headerShown: false,
          drawerType: "permanent",
          drawerPosition: "left",
        }}
      >
        <Drawer.Screen name="Cubicswap">
          {({ navigation }) => (
            <View style={{ height: "100%" }}>
              {isLoading ? (
                <Flex flex={1} my={"auto"}>
                  <Spinner size="sm" color={accentColor} />
                </Flex>
              ) : (
                isSuccess &&
                data.pages?.length > 0 && (
                  <>
                    <ScrollView
                      scrollEventThrottle={10000}
                      // onScroll={loadMore}
                      contentContainerStyle={{
                        // minHeight: "100vh",
                        maxHeight: !show
                          ? screenHeight - 160
                          : screenHeight - 104,
                      }}
                    >
                      <TablePagination
                        data={data}
                        setPage={setPage}
                        page={page}
                        onItemsPerPageChange={onItemsPerPageChange}
                        numberOfItemsPerPage={numberOfItemsPerPage}
                        toggle={toggle}
                        setToggle={setToggle}
                        open={open}
                        setOpen={setOpen}
                        setSort={setSort}
                      />
                      {data?.pages.map((p, i) => (
                        <React.Fragment key={i}>
                          {p?.products?.length > 0 ? (
                            <View>
                              <FlatList
                                key={toggle ? "-" : "#"}
                                keyExtractor={(item, idx) =>
                                  toggle
                                    ? "-" + idx.toString()
                                    : "#" + idx.toString()
                                }
                                contentContainerStyle={{
                                  backgroundColor: textColor,
                                  opacity: 1,
                                }}
                                numColumns={toggle ? (show ? 4 : 2) : 1}
                                data={p.products}
                                centerContent
                                renderItem={({ item }) => (
                                  <>
                                    {toggle ? (
                                      <View
                                        style={{
                                          flex: 1,
                                          justifyContent: "center",
                                          alignItems: "center",
                                          position: "relative",
                                        }}
                                      >
                                        <ProductDetails p={item} />
                                        <Box
                                          style={{
                                            position: "absolute",
                                            right: 15,
                                            // bottom: 20,
                                            // left: 10,
                                            top: 20,
                                            width: 25,
                                            height: 25,
                                            borderRadius: 18,
                                            borderWidth: 1,
                                            borderColor: lightText,
                                            backgroundColor: textColor,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flex: 1,
                                          }}
                                        >
                                          <QuickView
                                            p={item}
                                            setViewProduct={setViewProduct}
                                            setIsVisible={setIsVisible}
                                          />
                                        </Box>
                                      </View>
                                    ) : (
                                      <TableRow
                                        p={item}
                                        setViewProduct={setViewProduct}
                                        setIsVisible={setIsVisible}
                                      />
                                    )}
                                  </>
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
                      {hasNextPage && (
                        <View style={{ paddingBottom: 5 }}>
                          <LoadMore
                            hasNextPage={hasNextPage}
                            fetchNextPage={fetchNextPage}
                            isFetchingNextPage={isFetchingNextPage}
                          />
                        </View>
                      )}
                      {isFetching && (
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
                      )}
                      {/* <View>
                        <Footer />
                      </View> */}
                    </ScrollView>
                  </>
                )
              )}
            </View>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>

      {!show && data && (
        <StoreCategories
          open={open}
          setOpen={setOpen}
          setCategories={setCategories}
          storeCategories={storeCategories}
          selectCatName={selectCatName}
          isFetching={isFetching}
          setSelectCatName={setSelectCatName}
        />
      )}

      {viewProduct && (
        <Actionsheet
          isOpen={isVisible}
          onClose={hideDetails}
          maxW={screenWidth}
          w={screenWidth}
          mx={"auto"}
          hideDragIndicator
        >
          <Actionsheet.Content>
            <TouchableOpacity style={{ marginBottom: 5 }} onPress={hideDetails}>
              <Icon size={!show ? 20 : 30} type="material" name="cancel" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ gridGap: 10 }}>
              <TouchableOpacity style={{ marginHorizontal: 10 }}>
                <ImageCorosal
                  slides={slides}
                  toggleOverlay={() => {}}
                  mediaByIndex={mediaByIndex}
                  width={screenWidth}
                  height={screenHeight * 0.4}
                  shwTabs={false}
                  overlay={false}
                  notShow={false}
                />
              </TouchableOpacity>
              <Actionsheet.Content style={{ flex: 1 }} shadow={"0"} sha>
                <VStack
                  space={"2"}
                  p={"2"}
                  px={show ? "5" : "2"}
                  w={screenWidth}
                >
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    {viewProduct.name}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "500", fontSize: 15 }}>
                      Price:{" "}
                    </Text>
                    ₹ {viewProduct.price} / {viewProduct.unit}
                  </Text>
                  <Text>
                    <Text
                      style={{ fontWeight: "500", fontSize: 15, color: "#000" }}
                    >
                      Min Order:
                    </Text>
                    {viewProduct.minOrder}{" "}
                    {viewProduct.minOrder > 1
                      ? `${viewProduct.unit}s`
                      : `${viewProduct.unit}`}
                  </Text>
                  {/* <View>
                    <Text>
                      <Text style={{ fontWeight: "500", fontSize: 15 }}>About this item:{"  "}</Text>
                      <Text>{viewProduct.description}</Text>
                    </Text>
                  </View> */}

                  <ProductPriceRange
                    product={viewProduct}
                    orderQty={viewProduct.minOrder}
                  />
                  <Button
                    onPress={() => {
                      setSelectedIndex(0);
                      router.push(`/product/${viewProduct._id}`);
                    }}
                    bg={primaryColor}
                  >
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 15,
                        color: accentColor,
                      }}
                    >
                      Show all details
                    </Text>
                  </Button>
                </VStack>
              </Actionsheet.Content>
            </ScrollView>
          </Actionsheet.Content>
        </Actionsheet>
      )}
    </Layout>
  );
};

// const styles = StyleSheet.create({
//   a: {
//     position: "absolute",
//     // right: 8,
//     // bottom: 95,
//     right: 5,
//     top: 70,
//     width: 25,
//     height: 25,
//     paddingTop: 4,
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: lightText,
//     backgroundColor: textColor,
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//   },
//   b: {
//     position: "absolute",
//     left: 5,
//     top: 8,
//     width: 25,
//     height: 25,
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: lightText,
//     backgroundColor: textColor,
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//   },
// });

export default StoreProducts;

{
  /* {role === "user" && (
                                  <View style={styles.a}>
                                    <AddToCart p={item} />
                                  </View>
                                )} */
}

// onScroll={({ nativeEvent }) => {
// console.log(nativeEvent);
// if (hasNextPage && isCloseToBottom(nativeEvent)) {
//   fetchNextPage();
// }
// }}

{
  /* <View>
                        <TouchableOpacity>
                          <Button
                            style={{
                              backgroundColor: "rgba(39, 39, 39, .2)",
                              borderRadius: 0,
                            }}
                            mode="text"
                            labelStyle={{
                              fontWeight: "600",
                              color: "rgb(39, 39, 39)",
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
                        <Footer />
                      </View> */
}
