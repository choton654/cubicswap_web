import React, { useState } from "react";
import { connectDB } from "../../../../server/config/db";
import { Store } from "../../../../server/model/storeModel";
import Layout from "../../../components/Layout";
import StoreDetails from "../../../components/Store/StoreDetails";
import StoreLayout from "../../../components/Store/StoreLayout";

function NavOneStore({ store: ssrStore }) {
  const [store] = useState(JSON.parse(ssrStore));

  return (
    <Layout title={store.storeName}>
      <StoreLayout store={store} />
      <StoreDetails store={store} />
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  const { id } = ctx.params;

  connectDB();
  try {
    const store = await Store.findById(id)
      .populate("owner", "_id name phone email")
      .lean();
    // .select({ _id: 1, storeName: 1, categories: 1 });

    // const storeCategories = await Category.find({ _id: store.categories })
    //   .lean()
    //   .select({ name: 1 });

    // const products = await Product.find({
    //   storeId: mongoose.Types.ObjectId(store._id),
    // })
    //   .lean()
    //   .select({
    //     name: 1,
    //     images: 1,
    //     brand: 1,
    //     price: 1,
    //   });

    return {
      props: {
        // products: JSON.stringify(products),
        // storeCategories: JSON.stringify(storeCategories),
        id,
        store: JSON.stringify(store),
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  connectDB();
  try {
    const stores = await Store.find().lean().select({ _id: 1 });

    const paths = stores.map((prod) => ({
      params: { id: prod._id.toString() },
    }));

    return { paths, fallback: true };
  } catch (error) {
    console.error(error);
    return;
  }
}

export default NavOneStore;

// <OneStore products={products} store={store} />;

// const [products] = useState(JSON.parse(ssrProducts));

// const state = StoreState();

// console.log(state);

// useEffect(() => {
//   const { setStoreCategories } = state;

//   setStoreCategories(JSON.parse(stc));
// }, []);
