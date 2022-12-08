import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import {
  Actionsheet,
  useDisclose,
  ScrollView,
  Badge,
  IconButton,
} from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { Box, FlatList, Text, Flex, Pressable, Link } from "native-base";
import router from "next/router";
import React, { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Icon, Overlay } from "react-native-elements";
import { Button, Portal } from "react-native-paper";
import { useInfiniteQuery } from "react-query";
import ProductDetails from "../../components/Home/ProductDetails";
import Layout from "../../components/Layout";
import Footer from "../../components/Layout/Footer";
import {
  accentColor,
  linkColor,
  primaryColor,
  textColor,
} from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import { getProductsByOptionsQuery } from "../../graphql/query";
import CatAccordin from "./CatAccordin";
import LoadMore from "../Layout/LoadMore";

const Parentcat = ({ data, catId, name, categories2, categories1 }) => {
  const [parent1] = useState(categories1);

  const [parent2] = useState(categories2);
  const { isOpen, onOpen, onClose } = useDisclose();
  // const [current, setCurrent] = useState({
  //   ...categories1[0],
  //   href: categories1[0].hasProduct
  //     ? `/categories/${categories1[0]._id}`
  //     : `/categories/allCategories/mid/${categories1[0]._id}`,
  // });

  const [open, setOpen] = React.useState(false);
  const { show, screenHeight, screenWidth, lgSidebar } = ScreenState();

  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();
  const {
    data: prodData,
    isLoading,
    isSuccess,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery(
    ["getProductsByMainCats", parent1],
    ({ pageParam = 1 }) =>
      getProductsByOptionsQuery(pageParam, categories1, categories2),
    {
      // enabled: false,
      initialData: data,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
      },
      getPreviousPageParam: (firstPage, allPages) => {
        return firstPage.hasPreviousPage;
      },
    }
  );

  return (
    <Layout title={name}>
      <Drawer.Navigator
        drawerContent={() => (
          <DrawerContentScrollView
            contentContainerStyle={{
              backgroundColor: accentColor,
              paddingTop: 0,
              maxHeight: show ? screenHeight - 56 : screenHeight - 112,
              // flex: 1,
              zIndex: 100,
            }}
          >
            <View
              style={{
                backgroundColor: accentColor,
                height: show ? screenHeight - 56 : screenHeight - 112,
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
                  Collections
                </Text>
              </View>
              <View style={{}}>
                {[
                  ...parent1.map((c) => ({
                    ...c,
                    href: c.hasProduct
                      ? `/categories/${c._id}`
                      : `/categories/allCategories/mid/${c._id}`,
                  })),
                ].map((p, i) => (
                  <CatAccordin
                    key={i}
                    title={p}
                    desc={parent2.filter((p2) => p2.parentCatId === p._id)}
                  />
                ))}
              </View>
            </View>
          </DrawerContentScrollView>
        )}
        screenOptions={{
          swipeEnabled: true,
          drawerStyle: {
            backgroundColor: accentColor,
            maxWidth: show ? 220 : 0,
            // height: "100%",
            maxHeight: screenHeight - 56,
          },
          headerShown: false,
          drawerType: show ? "permanent" : "permanent",
          drawerPosition: "left",
        }}
      >
        <Drawer.Screen name="ddd">
          {({ navigation }) => (
            <Stack.Navigator
              screenOptions={({ navigation }) => ({
                headerShown: false,
              })}
            >
              <Stack.Screen name="Cubicswap">
                {() => (
                  <ScrollView
                    contentContainerStyle={{
                      minHeight: "100vh",
                      maxHeight: !show
                        ? screenHeight - 112
                        : screenHeight - 112,
                    }}
                  >
                    <Flex
                      p={3}
                      direction="row"
                      alignItems="center"
                      bg={accentColor}
                    >
                      {!show && (
                        <Pressable
                          pr={4}
                          justifyContent="center"
                          alignItems="center"
                          paddingHorizontal={"10px"}
                          onPress={() => {
                            // setOpen(!open);
                            onOpen();
                            // navigation.toggleDrawer();
                          }}
                        >
                          <Box>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 0 24 24"
                              width="20px"
                              fill={primaryColor}
                            >
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
                            </svg>
                          </Box>
                        </Pressable>
                      )}
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ backgroundColor: accentColor }}
                      >
                        <Link
                          isUnderlined
                          onPress={() => {
                            router.push(`/categories/allCategories`);
                          }}
                        >
                          <Badge
                            backgroundColor={primaryColor}
                            color={accentColor}
                          >
                            All Collections
                          </Badge>
                        </Link>

                        <Box>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="20px"
                            fill={primaryColor}
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
                          </svg>
                        </Box>

                        <Badge
                          backgroundColor={primaryColor}
                          color={accentColor}
                        >
                          {name}
                        </Badge>

                        {/* <Text
                            fontSize="15px"
                            fontWeight="500"
                            color={primaryColor}
                          >
                            {name}
                          </Text> */}
                      </ScrollView>
                    </Flex>

                    {prodData &&
                      prodData?.pages.map((p, i) => {
                        return (
                          <React.Fragment key={i}>
                            <View>
                              <FlatList
                                // style={{ flexBasis: "75%" }}
                                contentContainerStyle={{
                                  backgroundColor: textColor,
                                  opacity: 1,
                                }}
                                columnWrapperStyle={{
                                  backgroundColor: "#fff",
                                }}
                                key={(item, idx) => idx.toString()}
                                numColumns={show ? 4 : 2}
                                data={p.products}
                                centerContent
                                keyExtractor={(item, idx) => idx.toString()}
                                renderItem={({ item }) => (
                                  <ProductDetails p={item} />
                                )}
                              />
                            </View>
                          </React.Fragment>
                        );
                      })}

                    {hasNextPage ? (
                      <View>
                        <LoadMore
                          hasNextPage={hasNextPage}
                          fetchNextPage={fetchNextPage}
                          isFetchingNextPage={isFetchingNextPage}
                        />
                        {/* <View>
                          <Footer />
                        </View> */}
                      </View>
                    ) : (
                      <View>{/* <Footer /> */}</View>
                    )}
                  </ScrollView>
                )}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>

      {/* {isFetching && (
        <Portal>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}>
            <ActivityIndicator size='small' color={accentColor} />
          </View>
        </Portal>
      )} */}

      {!show && (
        <Overlay
          isVisible={isOpen}
          statusBarTranslucent
          animationType="slide"
          fullScreen
          collapsable
          focusable
          overlayStyle={{ backgroundColor: accentColor }}
        >
          <TouchableOpacity style={{ padding: 10 }} onPress={onClose}>
            <Icon
              size={30}
              type="material"
              name="cancel"
              color={primaryColor}
            />
          </TouchableOpacity>
          <Box textAlign={"center"}>
            <Text color={primaryColor} fontWeight={"500"}>
              {name}
            </Text>
          </Box>
          <ScrollView>
            {[
              ...parent1.map((c) => ({
                ...c,
                href: c.hasProduct
                  ? `/categories/${c._id}`
                  : `/categories/allCategories/mid/${c._id}`,
              })),
            ].map((p, i) => (
              <CatAccordin
                key={i}
                title={p}
                desc={parent2.filter((p2) => p2.parentCatId === p._id)}
              />
            ))}
          </ScrollView>
        </Overlay>
      )}
    </Layout>
  );
};

export default Parentcat;

// {
//   !show && (
//     <Actionsheet isOpen={isOpen} onClose={onClose} size={"full"}>
//       <Actionsheet.Content w={"full"}>
//         {/* <TouchableOpacity style={{ padding: 10 }} onPress={onClose}>
//         <Icon
//           size={30}
//           type="material"
//           name="cancel"
//           // color={primaryColor}
//         />
//       </TouchableOpacity> */}
//         <Box textAlign={"center"}>Categories</Box>
//         <ScrollView contentContainerStyle={{ width: "100%" }}>
//           {[
//             ...parent1.map((c) => ({
//               ...c,
//               href: c.hasProduct
//                 ? `/categories/${c._id}`
//                 : `/categories/allCategories/mid/${c._id}`,
//             })),
//           ].map((p, i) => (
//             <CatAccordin
//               key={i}
//               title={p}
//               desc={parent2.filter((p2) => p2.parentCatId === p._id)}
//             />
//           ))}
//         </ScrollView>
//       </Actionsheet.Content>
//     </Actionsheet>
//   );
// }

//  {
//    show ? (
//      <Box></Box>
//    ) : (
//      <View
//        style={{
//          justifyContent: "flex-start",
//          minHeight: "50px",
//          width: "100%",
//          // backgroundColor: "rgba(39, 39, 39, 0.8)",
//          backgroundColor: "#fff",
//          marginBottom: "10px",
//          boxSizing: "border-box",
//          boxShadow: "3px 0 8px 1px rgb(0 0 0 / 40%)",
//        }}
//      >
//        <FlatList
//          contentContainerStyle={{ flex: 1 }}
//          horizontal
//          data={[
//            ...parent1.map((c) => ({
//              ...c,
//              href: c.hasProduct
//                ? `/categories/${c._id}`
//                : `/categories/allCategories/mid/${c._id}`,
//              name: c.name,
//            })),
//          ].slice(0, 5)}
//          ListHeaderComponent={() => (
//            <>
//  <TouchableOpacity
//    onPress={() => setOpen(!open)}
//    style={{
//      flex: 1,
//      justifyContent: "center",
//      alignItems: "center",
//      paddingHorizontal: 10,
//    }}
//  >
//    <Icon
//      type="material"
//      name="filter-list"
//      size={20}
//      color={linkColor}
//    />
//  </TouchableOpacity>
//            </>
//          )}
//          centerContent
//          keyExtractor={(item, idx) => idx.toString()}
//          renderItem={({ item }) => (
//            <TouchableOpacity
//              onPress={() => router.push(`${item.href}`)}
//              style={{
//                paddingHorizontal: 10,
//                justifyContent: "center",
//                alignItems: "center",
//                height: "100%",
//                flexGrow: 1,
//              }}
//            >
//              <Text
//                style={{
//                  fontWeight: "700",
//                  color: linkColor,
//                }}
//              >
//                {item.name}
//              </Text>
//            </TouchableOpacity>
//          )}
//        />
//      </View>
//    );
//  }

//  <Overlay
//    isVisible={open}
//    statusBarTranslucent
//    animationType="slide"
//    fullScreen
//    collapsable
//    focusable
//  >
//    <View
//      style={{
//        justifyContent: "center",
//      }}
//    >
//    <TouchableOpacity style={{ padding: 10 }} onPress={() => setOpen(!open)}>
//      <Icon size={30} type="material" name="cancel" />
//    </TouchableOpacity>
//    <View
//      style={{
//        justifyContent: "center",
//        alignItems: "center",
//        padding: 10,
//        flexDirection: "row",
//        gridGap: 10,
//      }}
//    >
//      <TouchableOpacity
//        style={{
//          justifyContent: "center",
//          alignItems: "center",
//          flexDirection: "row",
//        }}
//        onPress={() => {
//          setOpen(!open);
//          router.push(`/categories/allCategories`);
//        }}
//      >
//        <Text
//          style={{
//            fontSize: 15,
//            fontWeight: "500",
//          }}
//        >
//          All Collections
//        </Text>
//        <Icon type="material" name="navigate-next" />
//      </TouchableOpacity>
//      <TouchableOpacity
//        style={{
//          justifyContent: "center",
//          alignItems: "center",
//          flexDirection: "row",
//        }}
//      >
//        <Text style={{ fontSize: 15, fontWeight: "500" }}>{name}</Text>
//      </TouchableOpacity>
//    </View>
//  </View>
//    <View style={{ flexDirection: "row" }}>
//      <ScrollView
//        contentContainerStyle={{
//          maxHeight: screenHeight - 100,
//          maxWidth: screenWidth * 0.4,
//        }}
//      >
//        {[
//          ...parent1.map((c) => ({
//            ...c,
//            href: c.hasProduct
//              ? `/categories/${c._id}`
//              : `/categories/allCategories/mid/${c._id}`,
//          })),
//        ].map((c, i) => (
//          <View key={i}>
//            <TouchableOpacity onPress={() => setCurrent(c)}>
//              <ListItem bottomDivider>
//                <ListItem.Content>
//                  <ListItem.Title
//                    style={{
//                      fontWeight: current._id === c._id && "700",
//                    }}
//                  >
//                    {c.name}
//                  </ListItem.Title>
//                </ListItem.Content>
//              </ListItem>
//            </TouchableOpacity>
//          </View>
//        ))}
//      </ScrollView>
//      <ScrollView
//        contentContainerStyle={{
//          maxHeight: screenHeight - 100,
//          maxWidth: screenWidth * 0.6,
//        }}
//      >
//        <TouchableOpacity onPress={() => setCurrent(c)}>
//          <ListItem
//            onPress={() => {
//              setOpen(!open);
//              router.push(`${current.href}`);
//            }}
//          >
//            <ListItem.Content>
//              <ListItem.Title style={{ fontSize: 18, fontWeight: "500" }}>
//                {current.name}
//              </ListItem.Title>
//            </ListItem.Content>
//            <ListItem.Chevron />
//          </ListItem>
//        </TouchableOpacity>
//        {parent2.map((p2, idx) => (
//          <React.Fragment key={idx}>
//            {p2.parentCatId === current._id && (
//              <ListItem
//                onPress={() => {
//                  setOpen(!open);
//                  router.push(`/categories/${p2._id}`);
//                }}
//              >
//                <ListItem.Content>
//                  <ListItem.Title>{p2.name}</ListItem.Title>
//                </ListItem.Content>
//              </ListItem>
//            )}
//          </React.Fragment>
//        ))}
//      </ScrollView>
//    </View>
//  </Overlay>;
