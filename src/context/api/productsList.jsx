// import { useEffect } from "react";
// import { connectDB } from "../../../../server/config/db";
// import { Category } from "../../../../server/model/categoryModel";
// import { Store } from "../../../../server/model/storeModel";
// import Layout from "../../../components/Layout";
// import ProductListView from "../../../components/Store/ListView";
// import StoreLayout from "../../../components/Store/StoreLayout";
// import { StoreState } from "../../../context/state/storeState";

// const StoreAllProducts = ({ store, storeCategories: stc }) => {
//   const state = StoreState();

//   useEffect(() => {
//     const { setStoreCategories } = state;

//     setStoreCategories(JSON.parse(stc));
//   }, []);

//   return (
//     <Layout title={JSON.parse(store).storeName}>
//       <StoreLayout store={JSON.parse(store)}>
//         <ProductListView {...state} storeCategories={JSON.parse(stc)} />
//       </StoreLayout>
//     </Layout>
//   );
// };

// export default StoreAllProducts;

// export async function getStaticProps(ctx) {
//   const { id } = ctx.params;

//   connectDB();
//   try {
//     const store = await Store.findById(id)
//       .lean()
//       .select({ _id: 1, storeName: 1, categories: 1 });

//     const storeCategories = await Category.find({ _id: store.categories })
//       .lean()
//       .select({ name: 1 });

//     return {
//       props: {
//         storeCategories: JSON.stringify(storeCategories),
//         id,
//         store: JSON.stringify(store),
//       },
//       revalidate: 1,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       notFound: true,
//     };
//   }
// }

// export async function getStaticPaths() {
//   connectDB();
//   try {
//     const stores = await Store.find()
//       .lean()
//       .select({ _id: 1 })
//       .sort({ createdAt: -1 });

//     const paths = stores.map((store) => ({
//       params: { id: store._id.toString() },
//     }));

//     return { paths, fallback: true };
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// }

// // import { useRouter } from "next/router";
// // import React, { useState } from "react";
// // import { StyleSheet, Text, View } from "react-native";
// // import { useInfiniteQuery } from "react-query";
// // import { client } from "../../../client";
// // import CustomLoader from "../../../components/Layout/CustomLoader";
// // import StoreProducts from "../../../components/Store/StoreProducts";
// // import { GET_PRODUCTS_BY_STORE } from "../../../graphql/query";

// // const getProductsByOptions = async (
// //   pageParam,
// //   numberOfItemsPerPage,
// //   category,
// //   page,
// //   sort,
// //   router
// // ) => {
// //   console.log(pageParam);
// //   const { getProductsByOptions, getStoreById } = await client.request(
// //     GET_PRODUCTS_BY_STORE,
// //     {
// //       getProductsByStoreFilter: {
// //         storeId: router.query.id,
// //         category: category === "All" ? undefined : category,
// //       },
// //       getStoreByIdId: router.query.id,
// //       getProductsByStorePage:
// //         router.query.view === "list"
// //           ? page
// //           : router.query.view === "grid" && pageParam,
// //       getProductsByStorePerPage: numberOfItemsPerPage,
// //       getProductsByStoreSort: sort,
// //     }
// //   );

// //   return {
// //     products: getProductsByOptions.items,
// //     currentPage: getProductsByOptions.pageInfo.currentPage,
// //     pageCount: getProductsByOptions.pageInfo.pageCount,
// //     perPage: getProductsByOptions.pageInfo.perPage,
// //     hasNextPage: getProductsByOptions.pageInfo.hasNextPage,
// //     hasPreviousPage: getProductsByOptions.pageInfo.hasPreviousPage,
// //     count: getProductsByOptions.count,
// //     getStoreById,
// //   };
// // };

// // const StoreAllProducts = () => {
// //   const router = useRouter();

// //   const [sort, setSort] = useState("NAME_ASC");
// //   const [page, setPage] = React.useState(1);
// //   const [category, setCategory] = React.useState("All");
// //   const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(10);

// //   const {
// //     isLoading,
// //     isSuccess,
// //     isError,
// //     data,
// //     isFetchingNextPage,
// //     fetchNextPage,
// //     isFetching,
// //     hasNextPage,
// //   } = useInfiniteQuery(
// //     [
// //       "getProductsByOptions",
// //       [numberOfItemsPerPage, category, sort, page, router.query],
// //     ],
// //     ({ pageParam = 1 }) =>
// //       getProductsByOptions(
// //         pageParam,
// //         numberOfItemsPerPage,
// //         category,
// //         page,
// //         sort,
// //         router
// //       ),
// //     {
// //       getNextPageParam: (lastPage, pages) => {
// //         return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
// //       },
// //       getPreviousPageParam: (firstPage, allPages) => {
// //         return firstPage.hasPreviousPage;
// //       },
// //     }
// //   );

// //   return (
// //     <>
// // {isLoading ? (
// //   <CustomLoader />
// // ) : isError ? (
// //   <View
// //     style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
// //   >
// //     <Text>Something went wrong</Text>
// //   </View>
// // ) : (
// //         data &&
// //         isSuccess && (
// // <Layout title={data?.pages[0]?.getStoreById?.storeName}>
// //   <StoreLayout store={data?.pages[0]?.getStoreById}>
// //     <View>
// //       <StoreProducts
// //         data={data}
// //         sort={sort}
// //         setSort={setSort}
// //         setPage={setPage}
// //         page={page}
// //         onItemsPerPageChange={onItemsPerPageChange}
// //         numberOfItemsPerPage={numberOfItemsPerPage}
// //         category={category}
// //         setCategory={setCategory}
// //         isFetchingNextPage={isFetchingNextPage}
// //         fetchNextPage={fetchNextPage}
// //         hasNextPage={hasNextPage}
// //         isSuccess={isSuccess}
// //         isFetching={isFetching}
// //       />
// //         </View>
// //         <ProductListView />
// //   </StoreLayout>
// // </Layout>
// //         )
// //       )}
// //     </>
// //   );
// // };

// // const { data: dummyData } = useQuery("dummy-data", () => 1, {
// //   retry: false,
// //   refetchOnReconnect: false,
// //   refetchOnWindowFocus: false,
// // });

// //  <View
// //    style={{
// //      flex: 1,
// //      justifyContent: "center",
// //      alignItems: "center",
// //      flexDirection: "row",
// //    }}
// //  >
// //    {dummyData}
// //    <Text
// //      onPress={() => {
// //        queryClient.setQueryData("dummy-data", (old) => (old += 1));
// //      }}
// //    >
// //      +
// //    </Text>
// //    <Text
// //      onPress={() => {
// //        queryClient.setQueryData("dummy-data", (old) => (old -= 1));
// //      }}
// //    >
// //      -
// //    </Text>
// //  </View>;
// // useEffect(() => {
// //   queryClient.setQueryData("dummy-data", (old) => {
// //     console.log(old);
// //     return {

// //       ...old,
// //       body: "new-body",
// //     };
// //   });
// //   console.log(queryClient.getQueryData("dummy-data"));
// //   console.log(dummyData);
// // }, [dummyData]);
