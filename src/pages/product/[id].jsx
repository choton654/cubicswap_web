// import Head from "next/head";
import axios from "axios";
import React from "react";
import OneProduct from "../../components/Product/OneProduct";

const NavProduct = ({ product, store, mainParent, parent, category }) => {
  return (
    <>
      {/* <Head>
        <title>{JSON.parse(product).name}</title>
      </Head> */}
      <OneProduct
        product={product}
        store={store}
        state1={mainParent}
        state2={parent}
        state3={category}
      />
    </>
  );
};

export async function getStaticProps(ctx) {
  const { id } = ctx.params;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/oneProduct/${id}`
    );
    // console.log("---data----", data);
    return {
      props: { ...data },
      revalidate: 1,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/allProductIds`
    );

    const paths = data.products.map((prod) => ({
      params: { id: prod._id.toString() },
    }));

    return { paths, fallback: true };
  } catch (error) {
    console.error(error);
    return;
  }
}

export default NavProduct;
