// import { useEffect } from "react";
// import { ActivityIndicator, View } from "react-native";
// import { connectDB } from "../../../server/config/db";
// import { Category } from "../../../server/model/categoryModel";
// import { Store } from "../../../server/model/storeModel";
// import Layout from "../../components/Layout";
// import GridView from "../../components/Store/GridView";
// import StoreLayout from "../../components/Store/StoreLayout";
// import { accentColor } from "../../Constant/color";
// import { StoreState } from "../state/storeState";
// const StoreGridProducts = ({ store, storeCategories: stc }) => {
//   const state = StoreState();

//   useEffect(() => {
//     const { setStoreCategories } = state;

//     setStoreCategories(JSON.parse(stc));
//   }, []);

//   return (
//     <Layout title={JSON.parse(store).storeName}>
//       <StoreLayout store={JSON.parse(store)}>
//         <GridView {...state} storeCategories={JSON.parse(stc)} />
//       </StoreLayout>
//     </Layout>
//   );
// };

// export default StoreGridProducts;

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
//         store: JSON.stringify(store),
//         id,
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
