import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { useInfiniteQuery } from "react-query";
import { GetAllCategory } from "../../api";
import CategoryList from "./CategoryList";
import ProductDetails from "../Home/ProductDetails";
import Layout from "../Layout";
import { ScreenState } from "../../context/state/screenState";
import LoadMore from "../Layout/LoadMore";

const ProductByAllCat = ({ allProds }) => {
  // const scrollRef = useRef(null);
  const { show, screenWidth, smScreen } = ScreenState();

  const {
    isLoading,
    isSuccess,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    "allcatagories",
    ({ pageParam = 0 }) => GetAllCategory(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.products.length < 12 || lastPage.page === lastPage.pages
          ? undefined
          : lastPage.page + 1;
      },
      getPreviousPageParam: (firstPage, allPages) => {
        return firstPage.page;
      },
      initialData: allProds,
      enabled: false,
      retry: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <Layout title="Categories">
      {isSuccess && data.pages?.length > 0 ? (
        <>
          <ScrollView
            contentContainerStyle={{ paddingTop: 10 }}
            // onScroll={handleScroll}
            // scrollEventThrottle={5}
          >
            <CategoryList />
            {data?.pages.map((p, i) => (
              <React.Fragment key={i}>
                <FlatList
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
            {hasNextPage && (
              <LoadMore
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            )}
          </ScrollView>
        </>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          No Products found
        </View>
      )}
    </Layout>
  );
};

export default ProductByAllCat;

//  <View style={{ justifyContent: "center", alignItems: "center" }}>
//    <Text>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</Text>
//    <Text>
//      {isFetchingNextPage
//        ? "Loading more..."
//        : hasNextPage
//        ? "Load More"
//        : "Nothing more to load"}
//    </Text>
//  </View>;

// const handleScroll = () => {
//   if (scrollRef.current && scrollRef.current.scrollTop < 100 && hasNextPage) {
//     fetchNextPage();
//   }
// };
