import { Formik } from "formik";
import jwt_decode from "jwt-decode";
import { Checkbox, Flex, Radio } from "native-base";
import Router from "next/link";
import { parseCookies } from "nookies";
import React from "react";
import { Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useMutation, useQueryClient } from "react-query";
import { CreateSellerMutation } from "../api";
import Layout from "../components/Layout";

function CreateSeller() {
  const queryClient = useQueryClient();

  const mutation = useMutation(CreateSellerMutation, {
    onSuccess: () => Router.push("/allUsers"),
    onSettled: () => queryClient.refetchQueries("allSellers"),
  });

  return (
    <Layout title='Create User'>
      <>
        <View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              backgroundColor: "rgb(39,39,39)",
            }}>
            <Text
              style={{
                textAlign: "center",
                color: "rgb(240, 191, 76)",
                fontWeight: "500",
                fontSize: "1.5rem",
              }}>
              Create seller
            </Text>
          </View>

          <Formik
            initialValues={{ name: "", email: "", password: "", phone: "", sellerType: "Seller" }}
            onSubmit={(values, { resetForm }) => {
              const { name, email, password, phone } = values;
              if (!name || !email || !password || !phone) {
                return;
              }
              mutation.mutate(values);
              resetForm();
            }}>
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
              <View>
                <TextInput
                  label='name'
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                <TextInput
                  label='email'
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                <TextInput
                  label='phone'
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
                <TextInput
                  label='Password'
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />

                <Radio.Group
                  name='myRadioGroup'
                  accessibilityLabel='favorite number'
                  value={values.sellerType}
                  onChange={nextValue => {
                    setFieldValue("sellerType", nextValue);
                  }}>
                  <Radio colorScheme='rgb(240, 191, 76)' value='Seller' my={1}>
                    Seller
                  </Radio>
                  <Radio colorScheme='rgb(240, 191, 76)' value='Company' my={1}>
                    Company
                  </Radio>
                </Radio.Group>
                <Button
                  onPress={handleSubmit}
                  loading={mutation.isLoading}
                  disabled={mutation.isLoading}
                  contentStyle={{ width: "100%" }}
                  labelStyle={{
                    color: "rgb(240, 191, 76)",
                    fontWeight: "bold",
                  }}
                  style={{
                    flex: 1,
                    height: "45px",
                    backgroundColor: "rgb(39, 39, 39)",
                    justifyContent: "center",
                    borderRadius: 0,
                  }}>
                  Submit
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  if (!token) {
    return {
      notFound: true,
    };
  }
  const decode = jwt_decode(token);

  if (decode.role !== "admin") {
    return {
      notFound: true,
    };
  }
  return {
    props: { token, decode },
  };
}

export default CreateSeller;
