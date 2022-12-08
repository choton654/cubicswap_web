import firebase from "firebase/app";
import "firebase/auth";
import { useFormik } from "formik";
import router from "next/router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { Button, Portal, Snackbar, TextInput } from "react-native-paper";
import { client } from "../../client";
import Layout from "../../components/Layout";
import {
  accentColor,
  lightAccentColor,
  primaryColor,
} from "../../Constant/color";
import { UPDATE_USER } from "../../graphql/mutation";
import { CHECK_FOR_PHONE } from "../../graphql/query";

const ForgetPassword = () => {
  const [enableField, setenableField] = useState(true);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [error, seterror] = useState("");

  const formik = useFormik({
    initialValues: {
      phone: "",
      code: "",
      newPssword: "",
      confirmPassword: "",
    },

    onSubmit: (values) => {
      if (formik.values.code.trim() === "") {
        seterror("please enter a valid code");
        return;
      }
      window.confirmationResult.confirm(values.code).then((result) => {
        // User signed in successfully.
        console.log("successfull");
        setPhoneVerified(true);
      });
    },
  });

  const configureReCAPTCHA = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };

  const onSignInSubmit = async () => {
    if (formik.values.phone.length < 10 || formik.values.phone.length > 10) {
      seterror("invalid phone number");
      return;
    }

    // check phone number is exists or not

    const { checkForPhone } = await client.request(CHECK_FOR_PHONE, {
      checkForPhoneFilter: { phone: formik.values.phone },
    });

    if (checkForPhone) {
      configureReCAPTCHA();
      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = `+91${formik.values.phone}`;
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;

          console.log("otp sent");
          setenableField(false);
        })
        .catch((error) => {
          if (
            error.message !==
            "reCAPTCHA has already been rendered in this element"
          ) {
            seterror(error.message);
          }
        });
    } else {
      seterror("invalid phone number");
    }
  };

  const handelChangePasssword = async () => {
    console.log("handelChangePasssword", formik.values);
    if (formik.values.newPssword !== formik.values.confirmPassword) {
      seterror("password does not match");
    }
    try {
      const { updateUser } = await client.request(UPDATE_USER, {
        updateUserFilter: { phone: formik.values.phone },
        updateUserRecord: { password: formik.values.newPssword },
      });
      // seterror("password is changed succefully");
      if (updateUser.recordId) {
        router.push("/signIn");
      }
    } catch (error) {
      console.error(error);
      seterror("something went wrong");
    }
  };

  return (
    <Layout title="Reset Password">
      <KeyboardAvoidingView
        style={{
          minHeight: "100vh",
          flex: 1,
          justifyContent: "center",
          backgroundColor: lightAccentColor,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: accentColor,
            paddingVertical: 10,
          }}
        >
          <Icon name="lock" type="material" color={primaryColor} />
          <Text style={{ color: primaryColor, marginLeft: 10 }}>
            Forget Password
          </Text>
        </View>

        {phoneVerified ? (
          <>
            <TextInput
              // disabled={!enableField}
              label="New Password"
              onChangeText={formik.handleChange("newPssword")}
              onBlur={formik.handleBlur("newPssword")}
              value={formik.values.newPssword}
              textContentType="password"
              autoCompleteType="password"
              secureTextEntry={true}
            />

            <TextInput
              // disabled={enableField}
              label="Confirm Password"
              onBlur={formik.handleBlur("confirmPassword")}
              onChangeText={formik.handleChange("confirmPassword")}
              value={formik.values.confirmPassword}
              textContentType="password"
              autoCompleteType="password"
              secureTextEntry={true}
            />

            <Button
              onPress={handelChangePasssword}
              // loading={isLoading || loading}
              // disabled={isLoading || loading || enableField}
              // contentStyle={{ width: "100%" }}
              labelStyle={{ color: primaryColor, fontWeight: "bold" }}
              style={{
                // flex: 1,
                height: "45px",
                backgroundColor: accentColor,
                justifyContent: "center",
                borderRadius: 0,
              }}
            >
              Reset
            </Button>
          </>
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: accentColor,
              }}
            >
              <div id="sign-in-button"></div>
              <TextInput
                disabled={!enableField}
                style={{ flex: 1 }}
                label="Phone Number"
                onChangeText={formik.handleChange("phone")}
                onBlur={formik.handleBlur("phone")}
                value={formik.values.phone}
                left={<TextInput.Affix text="+91" />}
                right={<TextInput.Icon name="phone" />}
              />
              <TouchableOpacity
                disabled={!enableField}
                style={{ padding: 5 }}
                onPress={onSignInSubmit}
              >
                <Text style={{ textAlign: "center", color: primaryColor }}>
                  Send OTP
                </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              disabled={enableField}
              label="Code"
              onChangeText={formik.handleChange("code")}
              onBlur={formik.handleBlur("code")}
              value={formik.values.code}
            />

            <Button
              onPress={formik.handleSubmit}
              // loading={isLoading || loading}
              disabled={enableField}
              // contentStyle={{ width: "100%" }}
              labelStyle={{ color: primaryColor, fontWeight: "bold" }}
              style={{
                // flex: 1,
                height: "45px",
                backgroundColor: accentColor,
                justifyContent: "center",
                borderRadius: 0,
              }}
            >
              Submit
            </Button>
          </>
        )}
      </KeyboardAvoidingView>

      <Portal>
        <Snackbar
          wrapperStyle={{
            position: "absolute",
            bottom: 66,
          }}
          style={{
            marginHorizontal: "auto",
            maxWidth: 1000,
          }}
          duration={4000}
          visible={error !== ""}
          onDismiss={() => seterror("")}
        >
          {error}
        </Snackbar>
      </Portal>
    </Layout>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({});

// import { Button } from "@chakra-ui/button";
// import { FormControl, FormLabel } from "@chakra-ui/form-control";
// import { Input } from "@chakra-ui/input";
// import { Box, Heading } from "@chakra-ui/layout";
// import { useFormik } from "formik";
// import { ForgetPasswordMutation } from "../../api";
// import React from "react";

// function ForgetPassword() {
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//     },
//     onSubmit: async (values, { resetForm }) => {
//       const { email } = values;
//       await ForgetPasswordMutation(email);
//       alert("If email exists please check your email");
//       resetForm();
//     },
//   });

//   return (
//     <Box
//       d="flex"
//       justifyContent="center"
//       alignItems="center"
//       flexDirection="column"
//       gridGap="5"
//       p="4"
//       boxShadow="lg"
//       backgroundColor="#fff"
//     >
//       <Box d="flex" alignItems="center" justifyContent="space-between">
//         <Heading as="h4" size="md" textShadow="1px 1px #aaa" textAlign="center">
//           Enter your email to reset your password
//         </Heading>
//       </Box>
//       <form
//         style={{ width: "100%" }}
//         className="flex flex-col gap-4"
//         onSubmit={formik.handleSubmit}
//       >
//         <FormControl id="email">
//           <FormLabel textAlign="center">Email address</FormLabel>
//           <Input
//             type="email"
//             backgroundColor="#bbb"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//           />
//         </FormControl>
//         <Button colorScheme="blue" type="submit" w="full" mt="2">
//           Reset
//         </Button>
//       </form>
//     </Box>
//   );
// }

// export default ForgetPassword;
