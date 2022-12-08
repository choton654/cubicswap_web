import axios from "axios";
import React, { useState } from "react";
import Layout from "../../../components/Layout";
import StoreDetails from "../../../components/Store/StoreDetails";
import StoreLayout from "../../../components/Store/StoreLayout";

function NavOneStore({ store: ssrStore }) {
  const [store] = useState(ssrStore);

  return (
    <Layout title={store.storeName}>
      <StoreLayout store={store} />
      <StoreDetails store={store} />
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/store/${id}`
    );

    return {
      props: { ...data },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

// export async function getStaticPaths() {
//   connectDB();
//   try {
//     const stores = await Store.find().lean().select({ _id: 1 });

//     const paths = stores.map((prod) => ({
//       params: { id: prod._id.toString() },
//     }));

//     return { paths, fallback: true };
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// }

export default NavOneStore;

// <OneStore products={products} store={store} />;

// const [products] = useState(JSON.parse(ssrProducts));

// const state = StoreState();

// console.log(state);

// useEffect(() => {
//   const { setStoreCategories } = state;

//   setStoreCategories(JSON.parse(stc));
// }, []);
