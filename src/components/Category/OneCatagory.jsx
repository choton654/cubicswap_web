import { Badge, Box, Flex, Link } from "native-base";
import { useRouter } from "next/router";
import React from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { Button } from "react-native-paper";
import { useInfiniteQuery } from "react-query";
import { accentColor, linkColor, primaryColor, textColor } from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import { getProductsByOptionsQuery } from "../../graphql/query";
// import { getProductsByOptionsQuery } from "../../pages/categories/allCategories/[pCatId]";
import ProductDetails from "../Home/ProductDetails";
import Footer from "../Layout/Footer";
import LoadMore from "../Layout/LoadMore";
// import { getProductsByOptionsQuery } from "./ParentCat";

const ProductByCat = ({ catdata, prodCategories, state1, state2, state3 }) => {
  const router = useRouter();
  const { show, screenHeight, screenWidth } = ScreenState();

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
    ["getProductsByCats", router.query.catId],
    ({ pageParam = 1 }) => getProductsByOptionsQuery(pageParam, [state3], []),
    {
      // enabled: false,
      initialData: catdata,
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
    <ScrollView
      scrollEventThrottle={10000}

      // horizontal
      // contentContainerStyle={{
      // width: "100%",
      // gridGap: 10,
      // justifyContent: "flex-start",
      // flexDirection: "row",
      // padding: 10,
      // }}
    >
      <Flex p={3} w='full' direction='row' alignItems='center' bg={accentColor}>
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
          <Link isUnderlined onPress={() => router.push(`/categories/allCategories/${state1?._id}`)}>
            <Badge backgroundColor={primaryColor} color={accentColor}>
              {state1?.name}
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
          {state1?._id !== state2?._id && (
            <Link isUnderlined onPress={() => router.push(`/categories/allCategories/mid/${state2?._id}`)}>
              <Badge backgroundColor={primaryColor} color={accentColor}>
                {state2?.name}
              </Badge>
            </Link>
          )}
          {state1?._id !== state2?._id && (
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
          )}

          <Badge backgroundColor={primaryColor} color={accentColor}>
            {state3?.name}
          </Badge>
        </ScrollView>
      </Flex>
      {isSuccess && prodData.pages?.length > 0 ? (
        <Box>
          {prodData?.pages.map((p, i) => (
            <React.Fragment key={i}>
              <FlatList
                contentContainerStyle={{
                  backgroundColor: textColor,
                  opacity: isFetching ? 0.2 : 1,
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
            </React.Fragment>
          ))}
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
        </Box>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}>
          <Text>No Products found</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ProductByCat;

// const {
//   isLoading,
//   isSuccess,
//   error,
//   data,
//   fetchNextPage,
//   hasNextPage,
//   isFetching,
//   isFetchingNextPage,
// } = useInfiniteQuery(
//   ["caterory", router?.query?.catId],
//   ({ pageParam = 1 }) => GetOneCategory(router?.query?.catId, pageParam),
//   {
//     getNextPageParam: (lastPage, pages) => {
//       return lastPage.products.length < 12 || lastPage.page === lastPage.pages
//         ? undefined
//         : lastPage.page + 1;
//     },
//     getPreviousPageParam: (firstPage, allPages) => {
//       return firstPage.page;
//     },
//     initialData: catdata,
//     enabled: false,
//     retry: false,
//     refetchOnWindowFocus: false,
//     retryOnMount: false,
//     refetchOnReconnect: false,
//   }
// );

//  <ScrollView
//         style={{ maxHeight: show ? screenHeight - 96 : screenHeight - 152 }}
//         showsHorizontalScrollIndicator={false}
//       ></ScrollView>
