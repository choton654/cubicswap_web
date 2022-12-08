import Head from "next/head";
import React from "react";
import { connectDB } from "../../server/config/db";
import { Category } from "../../server/model/categoryModel";
import { Product } from "../../server/model/productModel";
import MarketPlace from "../components/Home/MarketPlace";

const NavMarketPlace = ({ topProds, categories, newArrivas }) => {
  return (
    <>
      {/* <Head>
        <title>Cubicswap Market Place</title>
      </Head> */}
      <MarketPlace
        topProds={JSON.parse(topProds)}
        categories={JSON.parse(categories)}
        newArrivas={JSON.parse(newArrivas)}
      />
    </>
  );
};

export default NavMarketPlace;

export async function getStaticProps(context) {
  connectDB();
  try {
    const categories = await Category.find({ parentCatId: null }).lean().limit(4).select({ _id: 1, name: 1 });

    const [a, b, c, d] = await Promise.all([
      Category.find({
        parentCatId: categories[0],
      }).lean(),
      Category.find({
        parentCatId: categories[1],
      }).lean(),
      Category.find({
        parentCatId: categories[2],
      }).lean(),
      Category.find({
        parentCatId: categories[3],
      }).lean(),
    ]);

    const [a1, b1, c1, d1] = await Promise.all([
      Category.find({
        parentCatId: a.map(c => c._id),
      }).lean(),

      Category.find({
        parentCatId: b.map(c => c._id),
      }).lean(),

      Category.find({
        parentCatId: c.map(c => c._id),
      }).lean(),

      Category.find({
        parentCatId: d.map(c => c._id),
      }).lean(),
    ]);

    const [p1, p2, p3, p4, p5] = await Promise.all([
      Product.find(
        {
          categories: { $in: a1.map(c => c._id) },
        },
        { brand: 1, name: 1, images: { $slice: 1 }, category: 1, price: 1, minOrder: 1, _id: 1, views: 1 }
      )
        .lean()
        .limit(8),

      Product.find(
        {
          categories: { $in: b1.map(c => c._id) },
        },
        { brand: 1, name: 1, images: { $slice: 1 }, category: 1, price: 1, minOrder: 1, _id: 1, views: 1 }
      )
        .lean()
        .limit(8),

      Product.find(
        {
          categories: { $in: c1.map(c => c._id) },
        },
        { brand: 1, name: 1, images: { $slice: 1 }, category: 1, price: 1, minOrder: 1, _id: 1, views: 1 }
      )
        .lean()
        .limit(8),

      Product.find(
        {
          categories: { $in: d1.map(c => c._id) },
        },
        { brand: 1, name: 1, images: { $slice: 1 }, category: 1, price: 1, minOrder: 1, _id: 1, views: 1 }
      )
        .lean()
        .limit(8),

      Product.find(
        {},
        { brand: 1, name: 1, images: { $slice: 1 }, category: 1, price: 1, minOrder: 1, _id: 1, views: 1 }
      )
        .lean()
        .limit(8)
        .sort({ createdAt: -1 }),
    ]);

    const topProds = [
      { _id: categories[0]._id, name: categories[0].name, products: p1 },
      { _id: categories[1]._id, name: categories[1].name, products: p2 },
      { _id: categories[2]._id, name: categories[2].name, products: p3 },
      { _id: categories[3]._id, name: categories[3].name, products: p4 },
    ];

    return {
      props: {
        topProds: JSON.stringify(topProds),
        newArrivas: JSON.stringify(p5),
        revalidate: 1,
        categories: JSON.stringify(categories),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

// console.log(
//   "cat1",
//   a,
//   b,
//   c,
//   d,
//   "cat2",
//   a1,
//   b1,
//   c1,
//   d1,
//   "products",
//   p1,
//   p2,
//   p3,
//   p4
// );

// const categoriesOfParent1 = await Category.find({
//   parentCatId: categories,
// }).lean();

// const categoriesOfParent2 = await Category.find({
//   parentCatId: categoriesOfParent1.map((c) => c._id),
// }).lean();

// const products = await Product.find({
//   categories: { $in: categoriesOfParent2.map((c) => c._id) },
// });

// const newProducts = categories.map((c) =>
//   categoriesOfParent1.map(
//     (p) =>
//       p.parentCatId.toString() === c._id.toString() &&
//       categoriesOfParent2.filter(
//         (d) => d.parentCatId.toString() === p._id.toString()
//       )
//   )
// );

// const [Steel, Plastic, Fashion, Shoes] = await Promise.all([
//   Product.find({ category: "Steel" })
//     .lean()
//     .select({
//       brand: 1,
//       name: 1,
//       images: 1,
//       category: 1,
//       price: 1,
//       minOrder: 1,
//       _id: 1,
//     })
//     .limit(8)
//     .sort({ createdAt: -1 }),
//   Product.find({ category: "Plastic" })
//     .lean()
//     .select({
//       brand: 1,
//       name: 1,
//       images: 1,
//       category: 1,
//       price: 1,
//       minOrder: 1,
//       _id: 1,
//     })
//     .limit(8)
//     .sort({ createdAt: -1 }),
//   Product.find({ category: "Fashion" })
//     .lean()
//     .select({
//       brand: 1,
//       name: 1,
//       images: 1,
//       category: 1,
//       price: 1,
//       minOrder: 1,
//       _id: 1,
//     })
//     .limit(8)
//     .sort({ createdAt: -1 }),
//   Product.find({ category: "Shoes" })
//     .lean()
//     .select({
//       brand: 1,
//       name: 1,
//       images: 1,
//       category: 1,
//       price: 1,
//       minOrder: 1,
//       _id: 1,
//     })
//     .limit(8)
//     .sort({ createdAt: -1 }),
// ]);
