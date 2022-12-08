import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { Flex, Pressable, FlatList, ScrollView, Text, Box, Link, Badge } from "native-base";
import router from "next/router";
import React, { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Icon, ListItem, Overlay } from "react-native-elements";
import { Button, Portal } from "react-native-paper";
import { useInfiniteQuery } from "react-query";
import ProductDetails from "../../components/Home/ProductDetails";
import Layout from "../../components/Layout";
import Footer from "../../components/Layout/Footer";
import { accentColor, linkColor, primaryColor, textColor } from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import { getProductsByOptionsQuery } from "../../graphql/query";
import LoadMore from "../Layout/LoadMore";
import CatAccordin from "./CatAccordin";

const NavProductByCat = ({ data, catId, parent, name, categories1 }) => {
  const [parent1] = useState(JSON.parse(categories1));
  const [topParent] = useState(JSON.parse(parent));

  const [open, setOpen] = React.useState(false);

  const { show, screenHeight } = ScreenState();

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
    ["getProductsByMidCats", parent1],
    ({ pageParam = 1 }) => getProductsByOptionsQuery(pageParam, JSON.parse(categories1), []),
    {
      // enabled: false,
      initialData: JSON.parse(data),
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

  const Drawer = createDrawerNavigator();

  return (
    <Layout title={name}>
      <Drawer.Navigator
        drawerContent={() => (
          <DrawerContentScrollView
            contentContainerStyle={{
              backgroundColor: accentColor,
              paddingTop: 0,
              height: "100%",
              flex: 1,
              zIndex: 100,
              maxHeight: show ? screenHeight - 56 : screenHeight - 112,
            }}>
            <View
              style={{
                backgroundColor: accentColor,
                height: show ? screenHeight - 56 : screenHeight - 112,
              }}>
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: 10,
                  backgroundColor: accentColor,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    color: primaryColor,
                  }}>
                  Collections
                </Text>
              </View>
              <View style={{}}>
                {[
                  ...parent1.map(c => ({
                    href: `/categories/${c._id}`,
                    name: c.name,
                    ...c,
                  })),
                ].map((c, i) => (
                  <CatAccordin key={i} title={c} desc={[]} mid />
                ))}
              </View>
            </View>
          </DrawerContentScrollView>
        )}
        screenOptions={{
          drawerStyle: {
            backgroundColor: accentColor,
            maxWidth: show ? 220 : 0,
            height: "100%",
          },
          headerShown: false,
          drawerType: "permanent",
          drawerPosition: "left",
        }}>
        <Drawer.Screen name='Cubicswap'>
          {() => (
            <ScrollView
              scrollEventThrottle={10000}
              contentContainerStyle={{
                minHeight: "100vh",
                maxHeight: !show ? screenHeight - 112 : screenHeight - 56,
              }}>
              <Flex p={3} direction='row' alignItems='center' bg={accentColor} overflow={"auto"}>
                {!show && (
                  <Pressable
                    pr={4}
                    justifyContent='center'
                    alignItems='center'
                    paddingHorizontal={"10px"}
                    onPress={() => setOpen(!open)}>
                    <Box>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='24px'
                        viewBox='0 0 24 24'
                        width='20px'
                        fill={primaryColor}>
                        <path d='M0 0h24v24H0V0z' fill='none' />
                        <path d='M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z' />
                      </svg>
                    </Box>
                  </Pressable>
                )}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                  <Link
                    isUnderlined
                    onPress={() => {
                      router.push(`/categories/allCategories/${topParent?._id}`);
                    }}>
                    <Badge backgroundColor={primaryColor} color={accentColor}>
                      {topParent?.name}
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
                  <Badge backgroundColor={primaryColor} color={accentColor}>
                    {name}
                  </Badge>
                </ScrollView>
              </Flex>

              {prodData &&
                prodData?.pages.map((p, i) => {
                  return (
                    <React.Fragment key={i}>
                      <View>
                        <FlatList
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
                          renderItem={({ item }) => <ProductDetails p={item} />}
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
            }}
          >
            <ActivityIndicator size="small" color={accentColor} />
          </View>
        </Portal>
      )} */}

      {!show && (
        <Overlay
          isVisible={open}
          statusBarTranslucent
          animationType='slide'
          fullScreen
          collapsable
          focusable
          overlayStyle={{ backgroundColor: accentColor }}>
          <View
            style={{
              justifyContent: "center",
            }}>
            <TouchableOpacity style={{ padding: 10 }} onPress={() => setOpen(!open)}>
              <Icon size={30} type='material' name='cancel' color={primaryColor} />
            </TouchableOpacity>
          </View>
          <Text textAlign={"center"} fontWeight={"500"} my={"2"} color={primaryColor}>
            {name}
          </Text>
          <ScrollView>
            {[
              ...parent1.map(c => ({
                href: `/categories/${c._id}`,
                name: c.name,
              })),
            ].map((c, i) => (
              <Pressable key={i} _pressed={{ bg: primaryColor }}>
                <ListItem
                  bottomDivider
                  containerStyle={{ backgroundColor: accentColor }}
                  onPress={() => {
                    setOpen(!open);
                    router.push(`${c.href}`);
                  }}>
                  <ListItem.Content>
                    <ListItem.Title style={{ color: primaryColor, fontWeight: 500 }}>{c.name}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color={primaryColor} />
                </ListItem>
              </Pressable>
            ))}
          </ScrollView>
        </Overlay>
      )}
    </Layout>
  );
};

export default NavProductByCat;

// {[
//         ...parent1.map((c) => ({
//           href: `/categories/${c._id}`,
//           name: c.name,
//           ...c,
//         })),
//       ].map((c, i) => (
//         <CatAccordin key={i} title={c} desc={[]} mid />
//       ))}
