import axios from "axios";
import dynamic from "next/dynamic";
import React from "react";
import CustomLoader from "../../../components/Layout/CustomLoader";

const StoreProducts = dynamic(
  () =>
    import("../../../components/Store/StoreProducts").then((p) => p.default),
  {
    ssr: false,
    // eslint-disable-next-line react/display-name
    loading: () => <CustomLoader />,
  }
);

const StoreProductsPage = (props) => {
  return <StoreProducts {...props} />;
};

export default StoreProductsPage;

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/store/products/${id}`
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

// export async function getStaticPaths() {
//   connectDB();
//   try {
//     const stores = await Store.find().lean().select({ _id: 1 });

//     const paths = stores.map(prod => ({
//       params: { id: prod._id.toString() },
//     }));

//     return { paths, fallback: true };
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// }

// const store = await Store.findById(id)
//     .populate("owner", "_id name phone email")
//     .lean()
//     .select({ _id: 1, storeName: 1, categories: 1 });

//   const storeCategories = await Category.find({ _id: store.categories }).lean().select({ name: 1 });

//   const pageSize = 10;
//   const page = 1;
//   const count = await Product.countDocuments({
//     storeId: store._id,
//   });

//   const products = await Product.find({
//     storeId: store._id,
//   })
//     .lean()
//     .limit(pageSize)
//     .select({
//       name: 1,
//       images: 1,
//       brand: 1,
//       price: 1,
//     })
//     .sort({ name: 1 });

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
//       storeCategories: JSON.stringify(storeCategories),
//       id,
//       store: JSON.stringify(store),
//     },
//     revalidate: 1,
//   };

//   <GridView
//     {...queryData}
//     storeCategories={JSON.parse(props.storeCategories)}
//   />;

//   {
//     toggle ? (
//       <>
//         {data?.pages.map((p, i) => (
//           <React.Fragment key={i}>
//             {p?.products?.length > 0 ? (
//               <View>
//                 <FlatList
//                   columnWrapperStyle={{
//                     backgroundColor: textColor,
//                     width: screenWidth,
//                     maxWidth: screenWidth,
//                     justifyContent: "center",
//                     alignItems: "center",
//                     paddingHorizontal: show && 10,
//                   }}
//                   key={"-"}
//                   keyExtractor={(item, idx) => "-" + idx.toString()}
//                   contentContainerStyle={{
//                     backgroundColor: textColor,
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                   numColumns={show ? 4 : 2}
//                   data={p.products}
//                   centerContent
//                   renderItem={({ item }) => (
//                     <>
//                       {toggle ? (
//                         <View
//                           style={{
//                             flex: 1,
//                             justifyContent: "center",
//                             alignItems: "center",
//                             position: "relative",
//                           }}
//                         >
//                           <ProductDetails p={item} />
//                           <View style={styles.b}>
//                             <QuickView p={item} />
//                           </View>
//                           <View style={styles.a}>
//                             <AddToCart p={item} />
//                           </View>
//                         </View>
//                       ) : (
//                         <TableRow p={item} />
//                       )}
//                     </>
//                   )}
//                 />
//               </View>
//             ) : (
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Text>No products found</Text>
//               </View>
//             )}
//           </React.Fragment>
//         ))}
//       </>
//     ) : (
//       <>
//         {data?.pages.map((p, i) => (
//           <React.Fragment key={i}>
//             {p?.products?.length > 0 ? (
//               <View>
//                 <FlatList
//                   key={"#"}
//                   keyExtractor={(item, idx) => "#" + idx.toString()}
//                   // contentContainerStyle={{
//                   //   backgroundColor: textColor,
//                   //   alignItems: "center",
//                   //   justifyContent: "center",
//                   // }}
//                   data={p.products}
//                   centerContent
//                   renderItem={({ item }) => <TableRow p={item} />}
//                 />
//               </View>
//             ) : (
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Text>No products found</Text>
//               </View>
//             )}
//           </React.Fragment>
//         ))}
//       </>
//     );
//   }
