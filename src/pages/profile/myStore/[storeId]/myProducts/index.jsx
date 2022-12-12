import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { useInfiniteQuery } from "react-query";
import { client, ssrClient } from "../../../../../client";
import Layout from "../../../../../components/Layout";
import CustomLoader from "../../../../../components/Layout/CustomLoader";
import LoadMore from "../../../../../components/Layout/LoadMore";
import MyProdList from "../../../../../components/Product/MyProdList";
import { UserState } from "../../../../../context/state/userState";
import { MY_PRODUCTS } from "../../../../../graphql/query";

const getMyProducts = async (pageParam, storeId) => {
  const { getProductsByOptions } = await client.request(MY_PRODUCTS, {
    filter: { storeId },
    page: pageParam === null ? 1 : pageParam,
    perPage: 10,
  });

  return {
    products: getProductsByOptions.items,
    page: getProductsByOptions.pageInfo.currentPage,
    hasNextPage: getProductsByOptions.pageInfo.hasNextPage,
    hasPreviousPage: getProductsByOptions.pageInfo.hasPreviousPage,
    count: getProductsByOptions.count,
  };
};

function MyProducts() {
  const {
    query: { storeId },
  } = useRouter();
  const {
    state: { user, isAuthenticated },
  } = UserState();

  const {
    isLoading,
    isSuccess,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    "myProducts",
    ({ pageParam = 1 }) => getMyProducts(pageParam, storeId),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
      },
      getPreviousPageParam: (firstPage, allPages) => {
        return firstPage.hasPreviousPage;
      },
      // initialData: myStoreProducts,
      enabled: isAuthenticated,
      retry: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <Layout title="My Products">
      {isLoading ? (
        <CustomLoader />
      ) : isError ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>An Error Occurred</Text>
        </View>
      ) : isSuccess && data.pages?.length > 0 ? (
        <ScrollView>
          {data?.pages.map((p, i) => (
            <React.Fragment key={i}>
              {p.products.length > 0 ? (
                <FlatList
                  key={(item, idx) => idx.toString()}
                  data={p.products}
                  centerContent
                  keyExtractor={(item, idx) => idx.toString()}
                  renderItem={({ item }) => (
                    <MyProdList item={item} storeId={storeId} />
                  )}
                />
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Text>No Products found</Text>
                </View>
              )}
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
}

export default MyProducts;

// export async function getServerSideProps(ctx) {
//   const { token } = parseCookies(ctx);

//   const { storeId } = ctx.params;

//   if (!token) {
//     return {
//       notFound: true,
//     };
//   }
//   const decode = jwt_decode(token);

//   if (decode.role === "user") {
//     return {
//       notFound: true,
//     };
//   }

//   try {
//     const { getProductsByOptions } = await ssrClient(token).request(MY_PRODUCTS, {
//       filter: { storeId },
//       page: 1,
//       perPage: 10,
//     });

//     return {
//       props: {
//         myStoreProducts: {
//           pages: [
//             {
//               products: getProductsByOptions.items,
//               page: getProductsByOptions.pageInfo.currentPage,
//               hasNextPage: getProductsByOptions.pageInfo.hasNextPage,
//               hasPreviousPage: getProductsByOptions.pageInfo.hasPreviousPage,
//               count: getProductsByOptions.count,
//             },
//           ],
//           pageParams: [null],
//         },
//         storeId,
//         token,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       notFound: true,
//     };
//   }
// }

//  const { data } = await axios.get(
//    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/me/${storeId}?pageNumber=${0}`,
//    {
//      headers: {
//        authorization: token ? `Bearer ${token}` : "",
//      },
//    }
//  );

//  return {
//    props: {
//      storeId,
//      token,
//      data: { pageParams: [], pages: [data] },
//    },
//  };

// const {
//   isLoading,
//   isSuccess,
//   error,
//   data,
//   isError,
//   fetchNextPage,
//   hasNextPage,
//   isFetching,
//   isFetchingNextPage,
// } = useInfiniteQuery(
//   ["myProducts"],
//   ({ pageParam = 0 }) => GetMyProducts(pageParam, storeId),

//   {
//     getNextPageParam: (lastPage, pages) => {
//       return lastPage.page === lastPage.pages || lastPage.products.length < 10 ? undefined : lastPage.page + 1;
//     },
//     getPreviousPageParam: (firstPage, allPages) => {
//       return firstPage.page;
//     },

//     // enabled: false,
//     initialData: serverData,
//     retry: false,
//     refetchOnWindowFocus: false,
//     retryOnMount: false,
//     refetchOnReconnect: false,
//   }
// );
