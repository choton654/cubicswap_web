import axios from "axios";
import dynamic from "next/dynamic";
import React from "react";
import CustomLoader from "../../../../components/Layout/CustomLoader";

const ParentMain = dynamic(
  () =>
    import("../../../../components/Category/ParentCat").then((p) => p.default),
  {
    ssr: false,
    // eslint-disable-next-line react/display-name
    loading: () => <CustomLoader />,
  }
);

const ParentCatLayout = (props) => {
  return <ParentMain {...props} />;
};

export async function getServerSideProps(ctx) {
  const { pCatId } = ctx.params;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/parentCategory/${pCatId}`
    );

    return {
      props: { ...data },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

export default ParentCatLayout;

// export async function getStaticPaths() {
//   connectDB();
//   try {
//     const categories = await Category.find({ parentCatId: null })
//       .lean()
//       .select({ _id: 1 });

//     const paths = categories.map((cat) => ({
//       params: { pCatId: cat._id.toString() },
//     }));

//     console.log(categories);

//     return { paths, fallback: true };
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// }

// connectDB();

//     const mainParent = await Category.findById(pCatId).lean();

//     const categoriesOfParent1 = await Category.find({
//       parentCatId: pCatId,
//     }).lean();

//     const categoriesOfParent2 = await Category.find({
//       parentCatId: categoriesOfParent1.map((c) => c._id),
//     }).lean();

//     let findObj = {};

//     if (categoriesOfParent1[0].hasProduct) {
//       findObj = {
//         categories: { $in: categoriesOfParent1.map((c) => c._id) },
//       };
//     } else {
//       console.log("innnnnn");
//       findObj = {
//         categories: { $in: categoriesOfParent2.map((c) => c._id) },
//       };
//     }

//     const pageSize = 12;
//     const page = 1;
//     const count = await Product.countDocuments(findObj);

//     const products = await Product.find(findObj)
//       .lean()
//       .select({ _id: 1, minOrder: 1, name: 1, images: 1, price: 1, brand: 1 })
//       .limit(pageSize)
//       .skip(pageSize * (page - 1))
//       .sort({ createdAt: -1 });

//     return {
//       props: {
//         data: JSON.stringify({
//           pages: [
//             {
//               products,
//               count: products.length,
//               page,
//               pages: Math.ceil(count / pageSize),
//             },
//           ],
//           pageParams: [null],
//         }),
//         pCatId,
//         name: mainParent.name,
//         categories2: JSON.stringify(categoriesOfParent2),
//         categories1: JSON.stringify(categoriesOfParent1),
//       },
//       revalidate: 1,
//     };

// export const getProductsByOptionsQuery = async (
//   pageParam,
//   parent1,
//   parent2
// ) => {
//   let getProductsByOptionsFilter;
//   if (parent2.length === 0) {
//     getProductsByOptionsFilter = {
//       _operators: {
//         categories: { in: parent1.map((p) => p._id) },
//       },
//     };
//   } else {
//     getProductsByOptionsFilter = {
//       _operators: {
//         categories: { in: parent2.map((p) => p._id) },
//       },
//     };
//   }

//   const { getProductsByOptions } = await client.request(
//     gql`
//       query Query(
//         $getProductsByOptionsFilter: FilterFindManyProductInput
//         $getProductsByOptionsPerPage: Int
//         $getProductsByOptionsPage: Int
//       ) {
//         getProductsByOptions(
//           filter: $getProductsByOptionsFilter
//           perPage: $getProductsByOptionsPerPage
//           page: $getProductsByOptionsPage
//         ) {
//           count
//           items {
//             name
//             _id
//             minOrder
//             images
//             brand
//             price
//           }
//           pageInfo {
//             hasPreviousPage
//             hasNextPage
//             itemCount
//             pageCount
//             perPage
//             currentPage
//           }
//         }
//       }
//     `,
//     {
//       getProductsByOptionsFilter,
//       getProductsByOptionsPage: pageParam,
//       getProductsByOptionsPerPage: 12,
//       // getProductsByStoreSort: sort,
//     }
//   );

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

// const NavProductByCat = ({ data, catId, name, categories2, categories1 }) => {
//   const [parent1, setparent1] = useState(JSON.parse(categories1));

//   const [parent2, setparent2] = useState(JSON.parse(categories2));

//   const [current, setCurrent] = useState({
//     ...JSON.parse(categories1)[0],
//     href: JSON.parse(categories1)[0].hasProduct
//       ? `/categories/${JSON.parse(categories1)[0]._id}`
//       : `/categories/allCategories/mid/${JSON.parse(categories1)[0]._id}`,
//   });

//   const [open, setOpen] = React.useState(false);
//   const { show, screenHeight, screenWidth } = ScreenState();

//   const {
//     data: prodData,
//     isLoading,
//     isSuccess,
//     isError,
//     isFetchingNextPage,
//     fetchNextPage,
//     isFetching,
//     hasNextPage,
//   } = useInfiniteQuery(
//     ["getProductsByMainCats"],
//     ({ pageParam = 1 }) =>
//       getProductsByOptionsQuery(
//         pageParam,
//         JSON.parse(categories1),
//         JSON.parse(categories2)
//       ),
//     {
//       // enabled: false,
//       initialData: JSON.parse(data),
//       refetchOnWindowFocus: false,
//       retryOnMount: false,
//       refetchOnReconnect: false,
//       getNextPageParam: (lastPage, pages) => {
//         return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
//       },
//       getPreviousPageParam: (firstPage, allPages) => {
//         return firstPage.hasPreviousPage;
//       },
//     }
//   );

//   return (
//     <Layout title={name}>
//       <View>
//         <View
//           style={{
//             justifyContent: "flex-start",
//             minHeight: "50px",
//             width: "100%",
//             backgroundColor: "rgba(39, 39, 39, 0.8)",
//             marginBottom: "10px",
//             boxSizing: "border-box",
//             boxShadow: "3px 0 8px 1px rgb(0 0 0 / 40%)",
//           }}
//         >
//           <FlatList
//             contentContainerStyle={{ flex: 1 }}
//             horizontal
//             data={[
//               ...parent1.map((c) => ({
//                 ...c,
//                 href: c.hasProduct
//                   ? `/categories/${c._id}`
//                   : `/categories/allCategories/mid/${c._id}`,
//                 name: c.name,
//               })),
//             ].slice(0, 5)}
//             ListHeaderComponent={() => (
//               <TouchableOpacity
//                 onPress={() => setOpen(!open)}
//                 style={{
//                   flex: 1,
//                   justifyContent: "center",
//                   alignItems: "center",
//                   paddingHorizontal: 10,
//                 }}
//               >
//                 <Icon
//                   type="material"
//                   name="filter-list"
//                   size={20}
//                   color={primaryColor}
//                 />
//               </TouchableOpacity>
//             )}
//             centerContent
//             keyExtractor={(item, idx) => idx.toString()}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 onPress={() => router.push(`${item.href}`)}
//                 style={{
//                   paddingHorizontal: 10,
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: "100%",
//                   flexGrow: 1,
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontWeight: "700",
//                     color: "rgb(240, 191, 76)",
//                   }}
//                 >
//                   {item.name}
//                 </Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>

//         {prodData &&
//           prodData?.pages.map((p, i) => {
//             return (
//               <React.Fragment key={i}>
//                 <FlatList
//                   // style={{ flexBasis: "75%" }}
//                   contentContainerStyle={{
//                     backgroundColor: textColor,
//                     opacity: isFetching ? 0.2 : 1,
//                   }}
//                   columnWrapperStyle={{
//                     backgroundColor: "#fff",
//                   }}
//                   key={(item, idx) => idx.toString()}
//                   numColumns={show ? 4 : 2}
//                   data={p.products}
//                   centerContent
//                   keyExtractor={(item, idx) => idx.toString()}
//                   renderItem={({ item }) => <ProductDetails p={item} />}
//                 />
//               </React.Fragment>
//             );
//           })}

//         {hasNextPage ? (
//           <View>
//             <TouchableOpacity>
//               <Button
//                 style={{
//                   backgroundColor: "rgba(39, 39, 39, .2)",
//                   borderRadius: 0,
//                 }}
//                 mode="text"
//                 labelStyle={{
//                   fontWeight: "600",
//                   color: "rgb(39, 39, 39)",
//                 }}
//                 loading={isFetchingNextPage}
//                 disabled={isFetchingNextPage}
//                 onPress={() => fetchNextPage()}
//               >
//                 <Text>
//                   {isFetchingNextPage
//                     ? "Loading more..."
//                     : hasNextPage
//                     ? "Load More"
//                     : "Nothing more to load"}
//                 </Text>
//               </Button>
//             </TouchableOpacity>
//             <View>
//               <Footer />
//             </View>
//           </View>
//         ) : (
//           <View>
//             <Footer />
//           </View>
//         )}
//       </View>

//       {isFetching && (
//         <Portal>
//           <View
//             style={{
//               flex: 1,
//               justifyContent: "center",
//               alignItems: "center",
//               padding: 20,
//             }}
//           >
//             <ActivityIndicator size="small" color={accentColor} />
//           </View>
//         </Portal>
//       )}

//       <Overlay
//         isVisible={open}
//         statusBarTranslucent
//         // overlayStyle={{
//         //   width: show ? "50%" : "100%",
//         //   height: show ? "50%" : "100%",
//         // }}
//         animationType="slide"
//         fullScreen
//         collapsable
//         focusable
//       >
//         <View
//           style={{
//             justifyContent: "center",
//           }}
//         >
//           <TouchableOpacity
//             style={{ padding: 10 }}
//             onPress={() => setOpen(!open)}
//           >
//             <Icon size={30} type="material" name="cancel" />
//           </TouchableOpacity>
//           <View
//             style={{
//               justifyContent: "center",
//               alignItems: "center",
//               padding: 10,
//               flexDirection: "row",
//               gridGap: 10,
//             }}
//           >
//             <TouchableOpacity
//               style={{
//                 justifyContent: "center",
//                 alignItems: "center",
//                 flexDirection: "row",
//               }}
//               onPress={() => {
//                 setOpen(!open);
//                 router.push(`/categories/allCategories`);
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 15,
//                   fontWeight: "500",
//                 }}
//               >
//                 All Collections
//               </Text>
//               <Icon type="material" name="navigate-next" />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{
//                 justifyContent: "center",
//                 alignItems: "center",
//                 flexDirection: "row",
//               }}
//             >
//               <Text style={{ fontSize: 15, fontWeight: "500" }}>{name}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={{ flexDirection: "row" }}>
//           <ScrollView
//             contentContainerStyle={{
//               maxHeight: screenHeight - 100,
//               maxWidth: screenWidth * 0.4,
//             }}
//           >
//             {[
//               ...parent1.map((c) => ({
//                 ...c,
//                 href: c.hasProduct
//                   ? `/categories/${c._id}`
//                   : `/categories/allCategories/mid/${c._id}`,
//               })),
//             ].map((c, i) => (
//               <View key={i}>
//                 <TouchableOpacity onPress={() => setCurrent(c)}>
//                   <ListItem bottomDivider>
//                     <ListItem.Content>
//                       <ListItem.Title
//                         style={{
//                           fontWeight: current._id === c._id && "700",
//                         }}
//                       >
//                         {c.name}
//                       </ListItem.Title>
//                     </ListItem.Content>
//                   </ListItem>
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </ScrollView>
//           <ScrollView
//             contentContainerStyle={{
//               maxHeight: screenHeight - 100,
//               maxWidth: screenWidth * 0.6,
//             }}
//           >
//             <TouchableOpacity onPress={() => setCurrent(c)}>
//               <ListItem
//                 onPress={() => {
//                   setOpen(!open);
//                   router.push(`${current.href}`);
//                 }}
//               >
//                 <ListItem.Content>
//                   <ListItem.Title style={{ fontSize: 18, fontWeight: "500" }}>
//                     {current.name}
//                   </ListItem.Title>
//                 </ListItem.Content>
//                 <ListItem.Chevron />
//               </ListItem>
//             </TouchableOpacity>
//             {parent2.map((p2, idx) => (
//               <React.Fragment key={idx}>
//                 {p2.parentCatId === current._id && (
//                   <ListItem
//                     onPress={() => {
//                       setOpen(!open);
//                       router.push(`/categories/${p2._id}`);
//                     }}
//                   >
//                     <ListItem.Content>
//                       <ListItem.Title>{p2.name}</ListItem.Title>
//                     </ListItem.Content>
//                   </ListItem>
//                 )}
//               </React.Fragment>
//             ))}
//           </ScrollView>
//         </View>
//       </Overlay>
//     </Layout>
//   );
// };

// export default NavProductByCat;

{
  /* <DrawerLayout
  ref={(drawer) => {
    drawerRef = drawer;
  }}
  drawerWidth={250}
  drawerPosition={DrawerLayout.positions.Right}
  drawerType="front"
  drawerBackgroundColor="#ddd"
  renderNavigationView={() => (
    <View>
      <Text
      onPress={() => drawerRef.current.closeDrawer()}
      >
        I am in the drawer!{" "}
      </Text>
    </View>
  )}
></DrawerLayout>; */
}

//  {
//    prodData &&
//      prodData?.pages.map((p, i) => {
//        return (
//          <React.Fragment key={i}>
//            {show ? (
//              <FlatList
//                style={{ flexBasis: "75%" }}
//                contentContainerStyle={{
//                  backgroundColor: textColor,
//                  opacity: isFetching ? 0.2 : 1,
//                }}
//                columnWrapperStyle={{
//                  backgroundColor: "#fff",
//                }}
//                key={(item, idx) => idx.toString()}
//                numColumns={show ? 4 : 2}
//                data={p.products}
//                centerContent
//                keyExtractor={(item, idx) => idx.toString()}
//                renderItem={({ item }) => <ProductDetails p={item} />}
//              />
//            ) : (
//              <FlatList
//                style={{ flex: 4 }}
//                contentContainerStyle={{
//                  backgroundColor: textColor,
//                  opacity: isFetching ? 0.2 : 1,
//                }}
//                columnWrapperStyle={{
//                  backgroundColor: "#fff",
//                }}
//                key={(item, idx) => idx.toString()}
//                numColumns={show ? 4 : 2}
//                data={p.products}
//                centerContent
//                keyExtractor={(item, idx) => idx.toString()}
//                renderItem={({ item }) => <ProductDetails p={item} />}
//              />
//            )}
//          </React.Fragment>
//        );
//      });
//  }

// {
//   show ? (
//     <View style={{ flexDirection: "row" }}>
//       <View style={{ flex: 1 }}>
//         <Text>Categories</Text>
//       </View>
//       {prodData &&
//         prodData?.pages.map((p, i) => {
//           return (
//             <React.Fragment key={i}>
//               <FlatList
//                 style={{ flex: 4 }}
//                 contentContainerStyle={{
//                   backgroundColor: textColor,
//                   opacity: isFetching ? 0.2 : 1,
//                 }}
//                 columnWrapperStyle={{
//                   backgroundColor: "#fff",
//                 }}
//                 key={(item, idx) => idx.toString()}
//                 numColumns={show ? 4 : 2}
//                 data={p.products}
//                 centerContent
//                 keyExtractor={(item, idx) => idx.toString()}
//                 renderItem={({ item }) => <ProductDetails p={item} />}
//               />
//             </React.Fragment>
//           );
//         })}
//     </View>
//   ) : (
//     <>
//       {prodData &&
//         prodData?.pages.map((p, i) => {
//           return (
//             <React.Fragment key={i}>
//               <FlatList
//                 style={{ flexBasis: "75%" }}
//                 contentContainerStyle={{
//                   backgroundColor: textColor,
//                   opacity: isFetching ? 0.2 : 1,
//                 }}
//                 columnWrapperStyle={{
//                   backgroundColor: "#fff",
//                 }}
//                 key={(item, idx) => idx.toString()}
//                 numColumns={show ? 4 : 2}
//                 data={p.products}
//                 centerContent
//                 keyExtractor={(item, idx) => idx.toString()}
//                 renderItem={({ item }) => <ProductDetails p={item} />}
//               />
//             </React.Fragment>
//           );
//         })}
//     </>
//   );
// }
