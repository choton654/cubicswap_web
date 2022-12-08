import axios from "axios";
import React, { useState } from "react";
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
  const [state1] = useState(mainParent);
  const [state2] = useState(parent);
  const [state3] = useState(category);

  return (
    <Layout title={name}>
      <OneCatagory
        catdata={data}
        state1={state1}
        state2={state2}
        state3={state3}
      />
    </Layout>
  );
};

// export async function getStaticPaths() {
//   connectDB();
//   try {
//     const categories = await Category.find({ hasProduct: true })
//       .lean()
//       .select({ _id: 1 });

//     const paths = categories.map((cat) => ({
//       params: { catId: cat._id.toString() },
//     }));

//     return { paths, fallback: true };
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// }

export async function getServerSideProps(ctx) {
  const { catId } = ctx.params;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/category/${catId}`
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

export default NavProductByCat;

//  connectDB();
//   const pageSize = 12;
//   const page = 1;
//   const count = await Product.countDocuments({ categories: [catId] });
//   const products = await Product.find({ categories: [catId] })
//     .lean()
//     .select({ _id: 1, minOrder: 1, name: 1, images: 1, price: 1, brand: 1 })
//     .limit(pageSize)
//     .skip(pageSize * (page - 1))
//     .sort({ createdAt: -1 });

//   const category = await Category.findOne({ _id: catId })
//     .lean()
//     .select({ name: 1, parentCatId: 1 });

//   const parent = await Category.findById(
//     category.parentCatId.toString()
//   ).lean();

//   console.log(parent);

//   let mainParent;

//   if (parent.parentCatId === undefined) {
//     mainParent = parent;
//   } else {
//     mainParent = await Category.findById(
//       parent.parentCatId.toString()
//     ).lean();
//   }

// const categories = await Category.find({
//   parentCatId: category.parentCatId.toString(),
// })
//   .lean()
//   .select({ _id: 1, name: 1 });

// return {
//   paths: [
//     { params: { catId: "Fashion" } },
//     { params: { catId: "Plastic" } },
//     { params: { catId: "Steel" } },
//     { params: { catId: "Shoes" } },
//   ],
//   fallback: false,
// };
