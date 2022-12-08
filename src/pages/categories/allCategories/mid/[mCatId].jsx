import axios from "axios";
import dynamic from "next/dynamic";
import React from "react";
import CustomLoader from "../../../../components/Layout/CustomLoader";

const MidCat = dynamic(
  () => import("../../../../components/Category/MidCat").then((p) => p.default),
  {
    ssr: false,
    // eslint-disable-next-line react/display-name
    loading: () => <CustomLoader />,
  }
);

const MidCatLayout = (props) => {
  return <MidCat {...props} />;
};

export async function getServerSideProps(ctx) {
  const { mCatId } = ctx.params;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products//midCategory/${mCatId}`
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

export default MidCatLayout;

// export async function getStaticPaths() {
//   connectDB();
//   try {
//     const categories = await Category.find({
//       parentCatId: { $ne: null },
//       hasProduct: false,
//     })
//       .lean()
//       .select({ _id: 1 });

//     const paths = categories.map((cat) => ({
//       params: { mCatId: cat._id.toString() },
//     }));

//     console.log(categories);

//     return { paths, fallback: true };
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// }

// connectDB();

//   const mainParent = await Category.findById(mCatId).lean();

//   const parent = await Category.findById(
//     mainParent.parentCatId.toString()
//   ).lean();

//   const categoriesOfParent1 = await Category.find({
//     parentCatId: mCatId,
//   }).lean();

//   const pageSize = 12;
//   const page = 1;
//   const count = await Product.countDocuments({
//     categories: categoriesOfParent1.map((c) => c._id),
//   });

//   const products = await Product.find({
//     categories: { $in: categoriesOfParent1.map((c) => c._id) },
//   })
//     .lean()
//     .select({ _id: 1, minOrder: 1, name: 1, images: 1, price: 1, brand: 1 })
//     .limit(pageSize)
//     .skip(pageSize * (page - 1))
//     .sort({ createdAt: -1 });

//   return {
//     props: {
//       data: JSON.stringify({
//         pages: [
//           {
//             products,
//             count: products.length,
//             page,
//             pages: Math.ceil(count / pageSize),
//           },
//         ],
//         pageParams: [null],
//       }),
//       mCatId,
//       name: mainParent.name,
//       parent: JSON.stringify(parent),
//       categories1: JSON.stringify(categoriesOfParent1),
//     },
//     revalidate: 1,
//   };

// const NavProductByCat = ({ data, catId, parent, name, categories1 }) => {
//   const [parent1] = useState(JSON.parse(categories1));
//   const [topParent] = useState(JSON.parse(parent));

//   const [open, setOpen] = React.useState(false);

//   const { show, screenHeight } = ScreenState();

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
//     ["getProductsByMidCats"],
//     ({ pageParam = 1 }) =>
//       getProductsByOptionsQuery(pageParam, JSON.parse(categories1), []),
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
//                 href: `/categories/${c._id}`,
//                 name: c.name,
//               })),
//             ].slice(0, 5)}
//             centerContent
//             keyExtractor={(item, idx) => idx.toString()}
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
//                 <Text style={{ fontWeight: "700", color: "rgb(240, 191, 76)" }}>
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
//           <ScrollView
//             horizontal
//             contentContainerStyle={{
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
//               onPress={() => {
//                 setOpen(!open);
//                 router.push(`/categories/allCategories/${topParent?._id}`);
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 15,
//                   fontWeight: "500",
//                 }}
//               >
//                 {topParent?.name}
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
//           </ScrollView>
//         </View>
//         <ScrollView>
//           {[
//             ...parent1.map((c) => ({
//               href: `/categories/${c._id}`,
//               name: c.name,
//             })),
//           ].map((c, i) => (
//             <View key={i}>
//               <ListItem
//                 bottomDivider
//                 onPress={() => {
//                   setOpen(!open);
//                   router.push(`${c.href}`);
//                 }}
//               >
//                 <ListItem.Content>
//                   <ListItem.Title>{c.name}</ListItem.Title>
//                 </ListItem.Content>
//                 <ListItem.Chevron />
//               </ListItem>
//             </View>
//           ))}
//         </ScrollView>
//       </Overlay>
//     </Layout>
//   );
// };
