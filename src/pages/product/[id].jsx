// import Head from "next/head";
import React from "react";
import { connectDB } from "../../../server/config/db";
import { Category } from "../../../server/model/categoryModel";
import { Product } from "../../../server/model/productModel";
import { Store } from "../../../server/model/storeModel";
import OneProduct from "../../components/Product/OneProduct";

const NavProduct = ({ product, store, mainParent, parent, category }) => {
  return (
    <>
      {/* <Head>
        <title>{JSON.parse(product).name}</title>
      </Head> */}
      <OneProduct
        product={JSON.parse(product)}
        store={JSON.parse(store)}
        state1={JSON.parse(mainParent)}
        state2={JSON.parse(parent)}
        state3={JSON.parse(category)}
      />
    </>
  );
};

export async function getStaticProps(ctx) {
  const { id } = ctx.params;

  connectDB();
  try {
    const product = await Product.findById(id)
      .lean()
      .select({
        brand: 1,
        name: 1,
        images: 1,
        description: 1,
        price: 1,
        user: 1,
        unit: 1,
        storeId: 1,
        minOrder: 1,
        inStock: 1,
        rangePerUnit: 1,
        categories: 1,
        details: 1,
        views: 1,
        _id: 1,
      })
      .populate("user", "_id name");

    const category = await Category.findOne({ _id: product.categories[0] })
      .lean()
      .select({ name: 1, parentCatId: 1 });

    const parent = await Category.findById(category.parentCatId.toString()).lean();

    let mainParent;

    if (parent.parentCatId === undefined) {
      mainParent = parent;
    } else {
      mainParent = await Category.findById(parent.parentCatId.toString()).lean();
    }

    const store = await Store.findById(product.storeId, { storeName: 1, phone: 1, images: { $slice: 1 } }).lean();

    return {
      props: {
        product: JSON.stringify(product),
        id,
        store: JSON.stringify(store),
        mainParent: JSON.stringify(mainParent),
        parent: JSON.stringify(parent),
        category: JSON.stringify(category),
      },
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
  connectDB();
  try {
    const products = await Product.find().lean().select({ _id: 1 }).sort({ createdAt: -1 });

    const paths = products.map(prod => ({
      params: { id: prod._id.toString() },
    }));

    return { paths, fallback: true };
  } catch (error) {
    console.error(error);
    return;
  }
}

export default NavProduct;
