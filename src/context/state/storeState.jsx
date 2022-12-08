// import { useRouter } from "next/router";
// import React, { createContext, useContext, useState } from "react";
// import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { Icon, ListItem, Overlay } from "react-native-elements";
// import { useInfiniteQuery } from "react-query";
// import { client } from "../../client";
// import CustomLoader from "../../components/Layout/CustomLoader";
// import { GET_PRODUCTS_BY_STORE } from "../../graphql/query";
// import { ScreenState } from "./screenState";
// const StoreContext = createContext();

// const getProductsByOptions = async (
//   pageParam,
//   numberOfItemsPerPage,
//   categories,
//   page,
//   sort,
//   router
// ) => {
//   console.log(pageParam);
//   let getProductsByStoreFilter;
//   if (categories.length === 0 || categories[0] === "All") {
//     getProductsByStoreFilter = {
//       storeId: router.query.id,
//       // category: category === "All" ? undefined : category,
//     };
//   } else {
//     getProductsByStoreFilter = {
//       storeId: router.query.id,
//       // category: category === "All" ? undefined : category,
//       _operators: { categories: { in: [...categories] } },
//     };
//   }

//   const { getProductsByOptions } = await client.request(GET_PRODUCTS_BY_STORE, {
//     getProductsByStoreFilter,

//     // getStoreByIdId: router.query.id,

//     getProductsByStorePage:
//       router.pathname === "/store/[id]/productsList"
//         ? page
//         : router.pathname === "/store/[id]/productsGrid"
//         ? pageParam
//         : 1,

//     getProductsByStorePerPage: numberOfItemsPerPage,

//     getProductsByStoreSort: sort,
//   });

//   return {
//     products: getProductsByOptions.items,
//     currentPage: getProductsByOptions.pageInfo.currentPage,
//     pageCount: getProductsByOptions.pageInfo.pageCount,
//     perPage: getProductsByOptions.pageInfo.perPage,
//     hasNextPage: getProductsByOptions.pageInfo.hasNextPage,
//     hasPreviousPage: getProductsByOptions.pageInfo.hasPreviousPage,
//     count: getProductsByOptions.count,
//   };
// };

// export const StoreContextProvider = ({ children }) => {
//   const router = useRouter();

//   const { show, screenHeight, screenWidth } = ScreenState();

//   const [sort, setSort] = useState("NAME_ASC");
//   const [page, setPage] = React.useState(1);
//   const [storeCategories, setStoreCategories] = React.useState([]);
//   const [categories, setCategories] = React.useState([]);
//   const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(10);
//   const [open, setOpen] = React.useState(false);

//   const {
//     isLoading,
//     isSuccess,
//     isError,
//     data,
//     isFetchingNextPage,
//     fetchNextPage,
//     isFetching,
//     hasNextPage,
//   } = useInfiniteQuery(
//     [
//       "getProductsByOptions",
//       [numberOfItemsPerPage, categories, sort, page, router.pathname],
//     ],
//     ({ pageParam = 1 }) =>
//       getProductsByOptions(
//         pageParam,
//         router.pathname === "/store/[id]/productsGrid"
//           ? 10
//           : numberOfItemsPerPage,

//         categories,
//         page,
//         sort,
//         router
//       ),
//     {
//       enabled:
//         router.pathname === "/store/[id]/productsList" ||
//         router.pathname === "/store/[id]/productsGrid" ||
//         router.pathname === "/store/[id]",
//       getNextPageParam: (lastPage, pages) => {
//         return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
//       },
//       getPreviousPageParam: (firstPage, allPages) => {
//         return firstPage.hasPreviousPage;
//       },
//     }
//   );

//   return (
//     <StoreContext.Provider
//       value={{
//         data,
//         sort,
//         setSort,
//         setPage,
//         page,
//         onItemsPerPageChange,
//         numberOfItemsPerPage,
//         storeCategories,
//         setStoreCategories,
//         setCategories,
//         isFetchingNextPage,
//         fetchNextPage,
//         hasNextPage,
//         isSuccess,
//         isFetching,
//         open,
//         setOpen,
//       }}
//     >
//       {isLoading ? (
//         <Modal animationType="fade" visible={true}>
//           <CustomLoader />
//         </Modal>
//       ) : isError ? (
//         <View
//           style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         >
//           <Text>Something went wrong</Text>
//         </View>
//       ) : (
//         children
//       )}

//       {data && (
//         <Overlay
//           isVisible={open}
//           statusBarTranslucent
//           animationType="slide"
//           fullScreen
//           collapsable
//           focusable
//         >
//           <TouchableOpacity
//             style={{ padding: 10 }}
//             onPress={() => setOpen(!open)}
//           >
//             <Icon size={30} type="material" name="cancel" />
//           </TouchableOpacity>
//           <ScrollView>
//             {[{ name: "All" }, ...storeCategories].map((c, i) => (
//               <ListItem
//                 key={i}
//                 bottomDivider
//                 onPress={() => {
//                   if (c.name === "All") {
//                     setCategories([c.name.toString()]);
//                     setOpen(!open);
//                   } else {
//                     setCategories([c._id.toString()]);
//                     setOpen(!open);
//                   }
//                 }}
//               >
//                 <ListItem.Content>
//                   <ListItem.Title>{c.name}</ListItem.Title>
//                 </ListItem.Content>
//                 <ListItem.Chevron />
//               </ListItem>
//             ))}
//           </ScrollView>
//         </Overlay>
//       )}
//     </StoreContext.Provider>
//   );
// };

// export const StoreState = () => useContext(StoreContext);

// // backdropStyle={{
// //   maxWidth: screenWidth,
// //   maxHeight: show ? screenHeight - 56 : screenHeight,
// //   marginHorizontal: "auto",
// // }}
// // overlayStyle={{
// //   maxWidth: screenWidth,
// //   maxHeight: show ? screenHeight - 56 : screenHeight,
// //   marginHorizontal: "auto",
// // }}

// {
//   /* {!isLoading && router.pathname === "/store/[id]/productsGrid" && (
//         <FAB
//           style={{
//             position: "absolute",
//             margin: 16,
//             right: show ? 90 : 0,
//             bottom: show ? 15 : 55,
//           }}
//           small
//           icon="filter"
//           onPress={() => setOpen(!open)}
//         />
//       )} */
// }
