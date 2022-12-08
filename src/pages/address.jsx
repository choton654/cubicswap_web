import { Formik } from "formik";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, HelperText, TextInput, useTheme } from "react-native-paper";
import { useMutation, useQueryClient } from "react-query";
import { AddAddressMutation } from "../api";
import Layout from "../components/Layout";
import Footer from "../components/Layout/Footer";
import { UserState } from "../context/state/userState";

function Address() {
  const {
    state: { user: me },
  } = UserState();

  const router = useRouter();
  const queryClient = useQueryClient();
  const { colors } = useTheme();

  // const [error, seterror] = useState("");

  const mutation = useMutation(AddAddressMutation, {
    onMutate: async (d) => {
      const {
        name,
        email,
        phone,
        pinCode,
        city,
        state,
        houseNo,
        roadName,
        landmark,
      } = d;

      await queryClient.cancelQueries("authUser");
      const prevAuthUser = queryClient.getQueryData("authUser");
      queryClient.setQueryData("authUser", (old) => {
        return {
          ...old,
          name,
          email,
          phone,
          shippingAddress: {
            pinCode,
            city,
            state,
            houseNo,
            roadName,
            landmark,
          },
        };
      });

      return { prevAuthUser };
    },
    onSettled: () => {
      queryClient.refetchQueries("authUser");
    },
    onSuccess: async () => {
      if (router?.query?.type === "checkout") {
        router.push("/checkout");
      }
      if (router?.query?.type === "profile") {
        router.push("/profile");
      }
      if (router?.query?.type === "address") {
        router.push("/profile");
      }
    },
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData("authUser", previousValue),
  });

  return (
    <Layout title="My Address">
      {router?.query?.type === "checkout" && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            backgroundColor: colors.text,
          }}
        >
          <Text style={{ color: colors.accent, fontWeight: "500" }}>
            Add delivery address to checkout
          </Text>
        </View>
      )}

      <ScrollView
        contentContainerStyle={{
          backgroundColor: colors.background,
          // height: "100vh",
          paddingTop: 10,
        }}
      >
        <Formik
          initialValues={{
            name: me?.name || "",
            email: me?.email || "",
            phone: me?.phone || "",
            pinCode: me?.shippingAddress?.pinCode || "",
            city: me?.shippingAddress?.city || "",
            state: me?.shippingAddress?.state || "",
            houseNo: me?.shippingAddress?.houseNo || "",
            roadName: me?.shippingAddress?.roadName || "",
            landmark: me?.shippingAddress?.landmark || "",
          }}
          validate={(values) => {
            const errors = {};

            if (
              router?.query?.type === "address" ||
              router?.query?.type === "checkout"
            ) {
              if (
                values.name.trim() === "" ||
                values.phone.trim() === "" ||
                values.pinCode.trim() === "" ||
                values.city.trim() === "" ||
                values.state.trim() === "" ||
                values.houseNo.trim() === "" ||
                values.roadName.trim() === "" ||
                values.landmark.trim() === ""
              ) {
                errors.phone = "* fields are required";
              }
            }
            if (router?.query?.type === "profile") {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (values.name.trim() === "" || values.email.trim() === "") {
                errors.email = "* fields are required";
              }
            }

            return errors;
          }}
          onSubmit={(values) => {
            if (router?.query?.type === "checkout") {
              mutation.mutate({ ...values, type: "checkout" });
            }
            if (router?.query?.type === "address") {
              mutation.mutate({ ...values, type: "checkout" });
            }
            if (router?.query?.type === "profile") {
              mutation.mutate({ ...values, type: "profile" });
            }
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
                  style={{ backgroundColor: colors.text }}
                >
                  {errors.phone}
                </HelperText>
              )}
              {errors.email && touched.email && (
                <HelperText
                  type="error"
                  // visible={errors}
                  style={{ backgroundColor: colors.text }}
                >
                  {errors.email}
                </HelperText>
              )}
              <TextInput
                label="Full Name *"
                placeholder="Full Name *"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              <TextInput
                label="Email"
                disabled
                onChangeText={(text) => {
                  // handleChange("email");
                  setFieldValue("email", text);
                  // seterror("");
                }}
                onBlur={handleBlur("email")}
                value={values.email}
                right={<TextInput.Icon name="email" />}
              />

              <TextInput
                label="Phone"
                disabled
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
              />
              <TextInput
                label="Pin-code *"
                disabled={router?.query?.type === "profile"}
                onChangeText={handleChange("pinCode")}
                onBlur={handleBlur("pinCode")}
                value={values.pinCode}
              />

              <TextInput
                label="City *"
                disabled={router?.query?.type === "profile"}
                onChangeText={handleChange("city")}
                onBlur={handleBlur("city")}
                value={values.city}
              />
              <TextInput
                label="State *"
                disabled={router?.query?.type === "profile"}
                onChangeText={handleChange("state")}
                onBlur={handleBlur("state")}
                value={values.state}
              />
              <TextInput
                label="House No *"
                disabled={router?.query?.type === "profile"}
                onChangeText={handleChange("houseNo")}
                onBlur={handleBlur("houseNo")}
                value={values.houseNo}
              />
              <TextInput
                label="RoadName *"
                disabled={router?.query?.type === "profile"}
                onChangeText={handleChange("roadName")}
                onBlur={handleBlur("roadName")}
                value={values.roadName}
              />
              <TextInput
                label="Landmark *"
                disabled={router?.query?.type === "profile"}
                onChangeText={handleChange("landmark")}
                onBlur={handleBlur("landmark")}
                value={values.landmark}
              />
              <Button
                onPress={handleSubmit}
                loading={mutation.isLoading}
                disabled={mutation.isLoading}
                contentStyle={{ width: "100%" }}
                labelStyle={{ color: colors.primary, fontWeight: "bold" }}
                style={{
                  width: "100%",
                  height: "45px",
                  backgroundColor: colors.accent,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 0,
                }}
              >
                Submit
              </Button>
            </View>
          )}
        </Formik>
        <Footer />
      </ScrollView>
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

  return {
    props: {
      token,
    },
  };
}

export default Address;
