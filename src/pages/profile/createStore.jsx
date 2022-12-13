import axios from "axios";
import { Formik } from "formik";
import jwtDecode from "jwt-decode";
import router from "next/router";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, HelperText, Snackbar, TextInput } from "react-native-paper";
import { useMutation } from "react-query";
import { client } from "../../client";
import Layout from "../../components/Layout";
import { UserState } from "../../context/state/userState";
import { CREATE_STORE } from "../../graphql/mutation";

const createStore = async (variables) => {
  const { addStore } = await client.request(CREATE_STORE, variables);
  return addStore;
};

function CreateStore() {
  const [error, seterror] = useState("");

  const { mutate, isLoading: loading } = useMutation(createStore, {
    onSuccess: (data) => {
      console.log(data);
      router.push(`/profile/myStore`);
    },
    onError: (e) => {
      console.error(e);
      seterror("something went wrong!");
    },
  });

  const {
    state: {
      user: { _id },
    },
  } = UserState();

  const onDismissSnackBar = () => seterror("");

  return (
    <Layout title="Create store">
      <ScrollView contentContainerStyle={styles.b}>
        <View style={styles.c}>
          <Text style={styles.d}>
            Add a valid store details so people can reach you
          </Text>
        </View>
        <Formik
          initialValues={{
            storeName: "",
            aboutStore: "",
            phone: "",
            pincode: "",
            city: "",
            state: "",
            district: "",
            roadName: "",
            landmark: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            if (
              values.phone.trim() === "" ||
              values.pincode.trim() === "" ||
              values.city.trim() === "" ||
              values.state.trim() === "" ||
              values.district.trim() === "" ||
              values.roadName.trim() === "" ||
              values.landmark.trim() === "" ||
              values.storeName.trim() === "" ||
              values.aboutStore.trim() === ""
            ) {
              seterror("* fields are required");
              return;
            }
            mutate({ ...values, owner: _id });
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={{}}>
              {errors.phone && touched.phone && (
                <HelperText
                  type="error"
                  // visible={errors}
                  style={{ backgroundColor: "#ccc" }}
                >
                  {errors.phone}
                </HelperText>
              )}
              <TextInput
                label="Store Name *"
                onChangeText={handleChange("storeName")}
                onBlur={handleBlur("storeName")}
                value={values.storeName}
              />
              <TextInput
                label="About your store *"
                multiline
                numberOfLines={5}
                onChangeText={handleChange("aboutStore")}
                onBlur={handleBlur("aboutStore")}
                value={values.aboutStore}
              />

              <TextInput
                label="Phone"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                left={<TextInput.Affix text="+91" />}
              />
              <TextInput
                label="Pin-code *"
                onChangeText={handleChange("pincode")}
                onBlur={handleBlur("pincode")}
                value={values.pincode}
              />

              <TextInput
                label="City *"
                onChangeText={handleChange("city")}
                onBlur={handleBlur("city")}
                value={values.city}
              />
              <TextInput
                label="State *"
                onChangeText={handleChange("state")}
                onBlur={handleBlur("state")}
                value={values.state}
              />
              <TextInput
                label="district *"
                onChangeText={handleChange("district")}
                onBlur={handleBlur("district")}
                value={values.district}
              />
              <TextInput
                label="RoadName *"
                onChangeText={handleChange("roadName")}
                onBlur={handleBlur("roadName")}
                value={values.roadName}
              />
              <TextInput
                label="Landmark *"
                onChangeText={handleChange("landmark")}
                onBlur={handleBlur("landmark")}
                value={values.landmark}
              />
              <Button
                onPress={handleSubmit}
                loading={loading}
                disabled={loading}
                contentStyle={{ width: "100%" }}
                labelStyle={{ color: "rgb(240, 191, 76)", fontWeight: "bold" }}
                style={styles.btn}
              >
                Submit
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>

      <View style={styles.f}>
        <Snackbar
          wrapperStyle={styles.g}
          style={styles.h}
          visible={error !== ""}
          onDismiss={onDismissSnackBar}
          action={{
            label: "Close",
            onPress: () => {
              seterror("");
            },
          }}
        >
          <Text style={{ color: "#fff" }}>{error}</Text>
        </Snackbar>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  a: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(39, 39, 39)",
    zIndex: 100,
    minHeight: 30,
  },
  b: {
    minHeight: "100vh",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(39, 39, 39,.8)",
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
  e: {
    color: "rgb(240, 191, 76)",
    fontWeight: "600",
  },
  f: {
    flex: 1,
    justifyContent: "space-between",
  },
  g: {
    position: "absolute",
    bottom: 70,
  },
  h: { backgroundColor: "#B12704" },
});

export default CreateStore;

// export async function getServerSideProps(ctx) {
//   const { token } = parseCookies(ctx);
//   if (!token) {
//     return {
//       notFound: true,
//     };
//   }

//   const decode = jwtDecode(token);

//   if (!token || decode?.role === "user") {
//     return {
//       notFound: true,
//     };
//   }

//   try {
//     const { data } = await axios.get(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/store/isExists`
//     );

//     if (data.existingStore) {
//       return {
//         redirect: {
//           destination: `/profile/myStore/${data.existingStore._id.toString()}/update`,
//           permanent: false,
//         },
//       };
//     }
//   } catch (error) {
//     console.error(error);
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       decode,
//     },
//   };
// }

// validate={(values) => {
//   const errors = {};

//   if (
//     values.phone.trim() === "" ||
//     values.pincode.trim() === "" ||
//     values.city.trim() === "" ||
//     values.state.trim() === "" ||
//     values.district.trim() === "" ||
//     values.roadName.trim() === "" ||
//     values.landmark.trim() === "" ||
//     values.storeName.trim() === "" ||
//     values.aboutStore.trim() === ""
//   ) {
//     errors.phone = "* fields are required";
//   }

//   return errors;
// }}

{
  /* {error && (
        <View style={styles.a}>
          <Text style={styles.e}>Something went wrong try again later!</Text>
        </View>
      )} */
}

{
  /* <Icon name="add" type="material" color="rgb(240, 191, 76)" /> */
}
