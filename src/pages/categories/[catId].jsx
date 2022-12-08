import React, { useState } from "react";
import { connectDB } from "../../../server/config/db";
import { Category } from "../../../server/model/categoryModel";
import { Product } from "../../../server/model/productModel";
import OneCatagory from "../../components/Category/OneCatagory";
import Layout from "../../components/Layout";

const NavProductByCat = ({
  data,
  catId,
  name,
  mainParent,
  parent,
  category,
}) => {
  const [state1] = useState(JSON.parse(mainParent));
  const [state2] = useState(JSON.parse(parent));
  const [state3] = useState(JSON.parse(category));

  return (
    <Layout title={name}>
      <OneCatagory
        catdata={JSON.parse(data)}
        state1={state1}
        state2={state2}
        state3={state3}
      />
    </Layout>
  );
};

export async function getStaticPaths() {
  connectDB();
  try {
    const categories = await Category.find({ hasProduct: true })
      .lean()
      .select({ _id: 1 });

    const paths = categories.map((cat) => ({
      params: { catId: cat._id.toString() },
    }));

    return { paths, fallback: true };
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getStaticProps(ctx) {
  const { catId } = ctx.params;

  try {
    connectDB();
    const pageSize = 12;
    const page = 1;
    const count = await Product.countDocuments({ categories: [catId] });
    const products = await Product.find({ categories: [catId] })
      .lean()
      .select({ _id: 1, minOrder: 1, name: 1, images: 1, price: 1, brand: 1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    const category = await Category.findOne({ _id: catId })
      .lean()
      .select({ name: 1, parentCatId: 1 });

    const parent = await Category.findById(
      category.parentCatId.toString()
    ).lean();

    console.log(parent);

    let mainParent;

    if (parent.parentCatId === undefined) {
      mainParent = parent;
    } else {
      mainParent = await Category.findById(
        parent.parentCatId.toString()
      ).lean();
    }

    // const categories = await Category.find({
    //   parentCatId: category.parentCatId.toString(),
    // })
    //   .lean()
    //   .select({ _id: 1, name: 1 });

    return {
      props: {
        data: JSON.stringify({
          pages: [
            {
              products,
              count: products.length,
              page,
              pages: Math.ceil(count / pageSize),
            },
          ],
          pageParams: [null],
        }),
        catId,
        name: category.name,
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

export default NavProductByCat;

// return {
//   paths: [
//     { params: { catId: "Fashion" } },
//     { params: { catId: "Plastic" } },
//     { params: { catId: "Steel" } },
//     { params: { catId: "Shoes" } },
//   ],
//   fallback: false,
// };
