// import firebase from "firebase/app";
// import "firebase/messaging";
import { Formik } from "formik";
import router from "next/router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { Button, Portal, Snackbar, TextInput, useTheme } from "react-native-paper";
import { useMutation } from "react-query";
import { LoginMutation } from "../api";
import { client } from "../client";
import Layout from "../components/Layout";
import Footer from "../components/Layout/Footer";
import { accentColor, deleteColor, primaryColor } from "../Constant/color";
import { initializeUser } from "../utils/isServer";

function SignIn() {
  const [error, seterror] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const { colors } = useTheme();
  const { mutate, isLoading } = useMutation(LoginMutation);

  const handelLogin = async (values, { resetForm }) => {
    if (Object.values(values).includes("")) {
      seterror("All fields are required");
      return;
    }
    // if (!values.email.includes("@")) {
    //   seterror("please give a valid email");
    //   return;
    // }
    if (values.phone.length !== 10 || isNaN(parseInt(values.phone))) {
      seterror("phone number must be 10 charecters long");
      return;
    }

    mutate(
      { ...values },
      {
        onSuccess: data => {
          client.setHeader("authorization", `Bearer ${data.token}`);
          resetForm();
          localStorage.setItem("token", data.token);
          console.log(data);
          const { user } = data;

          if (user) {
            try {
              initializeUser(data, true);
            } catch (error) {
              console.error(error);
            }
          }
        },
        onError: err => {
          seterror(err.response.data.msg);
        },
      }
    );
  };

  return (
    <Layout title='Login'>
      <KeyboardAvoidingView
        style={{
          minHeight: "100vh",
          flex: 1,
          justifyContent: "center",
          backgroundColor: colors.background,
        }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: colors.accent,
            paddingVertical: 10,
          }}>
          <Icon name='lock' type='material' color={colors.primary} />
          <Text style={{ color: colors.primary, marginLeft: 10 }}>Login</Text>
        </View>
        <Formik initialValues={{ phone: "", password: "" }} onSubmit={handelLogin}>
          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
            <View>
              <TextInput
                label='Phone'
                onChangeText={handleChange("phone")}
                // onChangeText={(text) => {
                //   setFieldValue("phone", text);
                //   seterror("");
                // }}

                onBlur={handleBlur("phone")}
                value={values.phone}
                right={<TextInput.Icon name='phone' />}
                left={<TextInput.Affix text='+91' />}
              />

              <TextInput
                label='Password'
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                right={<TextInput.Icon name='eye' onPress={() => setShowPass(p => !p)} />}
                textContentType='password'
                autoCompleteType='password'
                secureTextEntry={showPass}
              />
              <Button
                onPress={handleSubmit}
                loading={isLoading}
                disabled={isLoading}
                contentStyle={{ width: "100%" }}
                labelStyle={{ color: colors.primary, fontWeight: "bold" }}
                style={{
                  flex: 1,
                  height: "45px",
                  backgroundColor: colors.accent,
                  justifyContent: "center",
                  borderRadius: 0,
                }}>
                Submit
              </Button>
            </View>
          )}
        </Formik>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}>
          <Text style={{ color: colors.primary }}>New User?</Text>
          <TouchableOpacity onPress={() => router.push("/signUp")}>
            <Text style={{ color: colors.primary }}>Register here</Text>
          </TouchableOpacity>
          <Text style={{ color: colors.primary }}>or</Text>
          <TouchableOpacity onPress={() => router.push("/forgetPassword")}>
            <Text style={{ color: colors.primary }}>Forget password</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Snackbar
        wrapperStyle={{
          bottom: 66,
        }}
        duration={1000}
        style={{
          backgroundColor: colors.accent,
          boxShadow: "none",
        }}
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}>
        <Text style={{ color: colors.primary, fontWeight: "600" }}>Your device has been registered</Text>
      </Snackbar>

      <Portal>
        <Snackbar
          style={{ marginHorizontal: "auto", maxWidth: 1000, backgroundColor: accentColor }}
          wrapperStyle={{
            position: "absolute",
            bottom: 66,
          }}
          duration={1500}
          visible={error && error.length > 0}
          onDismiss={() => seterror("")}
          action={{
            // eslint-disable-next-line react/display-name
            icon: () => <Icon name='error' type='material' color={deleteColor} />,
          }}>
          <Text style={{ color: primaryColor, fontWeight: "600" }}>{error}</Text>
        </Snackbar>
      </Portal>

      <Footer />
    </Layout>
  );
}

export default SignIn;

// firebase
//   .messaging()
//   .getToken()
//   .then((fcmToken) => {
//     setIsVisible(true);

//   })
//   .catch((e) => seterror("something went wrong!"));

{
  /* {error && error.length > 0 && (
                <Box>
                  <HelperText type='error' visible={error.length > 0} style={{ backgroundColor: colors.accent }}>
                    {error}
                  </HelperText>
                </Box>
              )} */
}
