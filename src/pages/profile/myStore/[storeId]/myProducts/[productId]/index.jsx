import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import jwtDecode from "jwt-decode";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { ssrClient } from "../../../../../../client";
import Layout from "../../../../../../components/Layout";
import { GET_MY_PRODUCT_DETAILS } from "../../../../../../graphql/query";

const UpdateProduct = ({ data: { getMyProductDetails } }) => {
  console.log(getMyProductDetails);

  const [selectedColor, setSelectedColor] = useState("");

  const [selectedSize, setSelectedSize] = useState("");

  return (
    <Layout title={getMyProductDetails?.name || "product"}>
      <ScrollView contentContainerStyle={styles.b}>
        <View style={styles.c}>
          <Text style={styles.d}>update store details</Text>
        </View>
        <Formik
          initialValues={{
            name: getMyProductDetails ? getMyProductDetails.name : "",
            description: getMyProductDetails ? getMyProductDetails.description : "",
            brand: getMyProductDetails ? getMyProductDetails.brand : "",
            inStock: getMyProductDetails ? getMyProductDetails.inStock : 1,
            minOrder: getMyProductDetails ? getMyProductDetails.minOrder : "",
            colors: getMyProductDetails ? getMyProductDetails.colors : [""],
            sizes: getMyProductDetails ? getMyProductDetails.sizes : [""],
            rangePerUnit: getMyProductDetails ? getMyProductDetails.rangePerUnit : {},
          }}
          onSubmit={values => {
            console.log(values);
            // if (
            //   values.phone.trim() === "" ||
            //   values.pincode.trim() === "" ||
            //   values.city.trim() === "" ||
            //   values.state.trim() === "" ||
            //   values.district.trim() === "" ||
            //   values.roadName.trim() === "" ||
            //   values.landmark.trim() === "" ||
            //   values.storeName.trim() === "" ||
            //   values.aboutStore.trim() === ""
            // ) {
            //   seterror("* fields are required");
            //   return;
            // }
            // mutate({
            //   variables: { ...values, owner: _id },
            // });
          }}>
          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
            <View style={{}}>
              <TextInput
                label='Name *'
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              <TextInput
                label='Product description *'
                multiline
                numberOfLines={5}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
              />

              <TextInput
                label='Brand'
                onChangeText={handleChange("brand")}
                onBlur={handleBlur("brand")}
                value={values.brand}
              />
              <TextInput
                label='In Stock *'
                onChangeText={handleChange("inStock")}
                onBlur={handleBlur("inStock")}
                value={values.inStock}
              />

              {values.minOrder && (
                <TextInput
                  label='Min Order *'
                  onChangeText={handleChange("minOrder")}
                  onBlur={handleBlur("minOrder")}
                  value={values.minOrder}
                />
              )}

              {values.colors && values.colors.length > 0 && (
                <Picker
                  selectedValue={selectedColor}
                  onValueChange={(itemValue, itemIndex) => setSelectedColor(itemValue)}>
                  {values.colors.map((c, i) => (
                    <Picker.Item key={i} label={c} value={c} />
                  ))}
                </Picker>
              )}
              {values.sizes && values.sizes.length > 0 && (
                <Picker
                  selectedValue={selectedSize}
                  onValueChange={(itemValue, itemIndex) => setSelectedSize(itemValue)}>
                  {values.colors.map((s, i) => (
                    <Picker.Item key={i} label={c} value={c} />
                  ))}
                </Picker>
              )}

              <Button
                onPress={handleSubmit}
                // loading={loading}
                // disabled={loading}
                contentStyle={{ width: "100%" }}
                labelStyle={{ color: "rgb(240, 191, 76)", fontWeight: "bold" }}
                style={styles.btn}>
                Submit
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Layout>
  );
};

export default UpdateProduct;

const styles = StyleSheet.create({
  b: {
    minHeight: "100vh",
    // flex: 1,
    // justifyContent: "center",
    backgroundColor: "rgba(39, 39, 39,.8)",
  },
  c: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(39, 39, 39,.5)",
    paddingVertical: 10,
  },
  d: {
    color: "rgb(240, 191, 76)",
    marginLeft: 10,
    textAlign: "center",
  },
  btn: {
    width: "100%",
    height: "45px",
    backgroundColor: "rgb(39, 39, 39)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    flex: 1,
  },
});

export async function getServerSideProps(ctx) {
  const { productId } = ctx.params;

  const { token } = parseCookies(ctx);
  if (!token) {
    return {
      notFound: true,
    };
  }

  const decode = jwtDecode(token);
  console.log(decode);
  if (!token || decode.role === "user") {
    return {
      notFound: true,
    };
  }

  const data = await ssrClient(token).request(GET_MY_PRODUCT_DETAILS, {
    user: decode.id,
    productId,
  });

  return {
    props: {
      data: data || null,
    },
  };
}
