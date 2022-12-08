import React from "react";
import { connectDB } from "../../../server/config/db";
import AllCategory from "../../components/Category/AllCategory";
import { Product } from "../../../server/model/productModel";
import { Text, View } from "react-native";

const NavAllCategory = ({ data }) => {
  console.log(JSON.parse(data));
  return (
    <View>
      <Text>hello</Text>
    </View>
  );
};

export async function getStaticProps(ctx) {
  connectDB();

  try {
    const pageSize = 12;
    const page = 1;
    const count = await Product.countDocuments();
    const products = await Product.find()
      .lean()
      .select({ _id: 1, minOrder: 1, name: 1, images: 1, price: 1, brand: 1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });
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

export default NavAllCategory;
