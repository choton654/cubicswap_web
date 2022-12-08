import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/messaging";
import { Formik } from "formik";
import router from "next/router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useMutation } from "react-query";
import { RegisterUser } from "../api";
import Layout from "../components/Layout";
import Footer from "../components/Layout/Footer";
import { initializeUser } from "../utils/isServer";

function SignUp() {
  const [error, seterror] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [loading, setloading] = useState(false);
  const [enableField, setenableField] = useState(true);

  const { mutate, isLoading } = useMutation(RegisterUser);

  const configureReCAPTCHA = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("sign-in-button", {
      size: "invisible",
      callback: response => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
        console.log("Recaptca varified");
      },
      defaultCountry: "IN",
    });
  };

  const onSignInSubmit = phone => {
    if (phone.length < 10 || phone.length > 10) {
      seterror("invalid phone number");
      return;
    }

    configureReCAPTCHA();
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = `+91${phone}`;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;

        console.log("otp sent");
        setenableField(false);
      })
      .catch(error => {
        // Error; SMS not sent

        if (error.message !== "reCAPTCHA has already been rendered in this element") {
          seterror(error.message);
        }
      });
  };

  return (
    <Layout title='Register'>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          backgroundColor: "rgba(39, 39, 39, .8)",
          minHeight: "100vh",
          paddingVertical: 10,
        }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "rgb(39, 39, 39)",
            paddingVertical: 10,
          }}>
          <Icon name='lock-open' type='material' color='rgb(240, 191, 76)' />
          <Text style={{ color: "rgb(240, 191, 76)", marginLeft: 10 }}>Signup</Text>
        </View>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            code: "",
          }}
          onSubmit={(values, { resetForm }) => {
            if (Object.values(values).includes(" ")) {
              seterror("All fields are required");
              return;
            }
            if (!values.email.includes("@")) {
              seterror("please give a valid email");
              return;
            }
            if (values.password.length < 8) {
              seterror("password must be 8 charecters long");
              return;
            }
            if (values.code.trim() === "") {
              seterror("please enter a valid code");
              return;
            }
            if (values.password.trim() !== values.confirmPassword.trim()) {
              seterror("password does not match");
              return;
            }
            setloading(true);
            window.confirmationResult
              .confirm(values.code)
              .then(result => {
                // User signed in successfully.
                // const user = result.user;

                mutate(
                  {
                    ...values,
                  },
                  {
                    onSuccess: data => {
                      resetForm();
                      // localStorage.setItem(
                      //   "firebase-user",
                      //   JSON.stringify(user)
                      // );
                      localStorage.setItem("token", data.token);
                      initializeUser(data, true);
                      window.location.assign("/");
                    },
                    onError: err => {
                      seterror(err.response.data.msg);
                    },
                  }
                );
              })
              .catch(error => {
                // User couldn't sign in (bad verification code?)
                seterror("bad verification code!");
              })
              .finally(() => setloading(false));
          }}>
          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
            <View>
              <div id='sign-in-button'></div>
              {error.length > 0 && (
                <HelperText type='error' visible={error.length > 0} style={{ backgroundColor: "rgb(39, 39, 39)" }}>
                  {error}
                </HelperText>
              )}
              <TextInput
                disabled={enableField}
                label='Name'
                onChangeText={text => {
                  setFieldValue("name", text);
                  seterror("");
                }}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              <TextInput
                disabled={enableField}
                label='Email'
                placeholder='example@example.com'
                onChangeText={text => {
                  setFieldValue("email", text);
                  seterror("");
                }}
                onBlur={handleBlur("email")}
                value={values.email}
                right={<TextInput.Icon name='email' />}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "rgb(39,39,39)",
                }}>
                <TextInput
                  disabled={!enableField}
                  style={{ flex: 1 }}
                  label='Phone Number'
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  left={<TextInput.Affix text='+91' />}
                  right={<TextInput.Icon name='phone' />}
                />
                <TouchableOpacity
                  disabled={!enableField}
                  style={{ padding: 5 }}
                  onPress={() => {
                    // verifyPhone(values.phone)

                    onSignInSubmit(values.phone);
                  }}>
                  <Text style={{ textAlign: "center", color: "rgb(240, 191, 76)" }}>Send OTP</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                disabled={enableField}
                label='Code'
                onChangeText={handleChange("code")}
                onBlur={handleBlur("code")}
                value={values.code}
              />
              <TextInput
                disabled={enableField}
                label='Password'
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                right={<TextInput.Icon name='eye' onPress={() => setShowPass(p => !p)} />}
                textContentType='password'
                autoCompleteType='password'
                secureTextEntry={showPass}
              />
              <TextInput
                disabled={enableField}
                label='Confirm password'
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                textContentType='password'
                autoCompleteType='password'
                secureTextEntry={true}
              />
              <Button
                onPress={handleSubmit}
                loading={isLoading || loading}
                disabled={isLoading || loading || enableField}
                contentStyle={{ width: "100%" }}
                labelStyle={{ color: "rgb(240, 191, 76)", fontWeight: "bold" }}
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}>
          <Text style={{ color: "rgb(240, 191, 76)" }}>Already have an account</Text>
          <TouchableOpacity onPress={() => router.push("/signIn")}>
            <Text style={{ color: "rgb(240, 191, 76)" }}>login here</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </ScrollView>
    </Layout>
  );
}

export default SignUp;

// const verifyPhone = async (phone) => {
//   if (phone.length !== 10 || isNaN(parseInt(phone))) {
//     seterror("phone number must be 10 charecters long");
//     return;
//   }
//   setloading(true);
//   try {
//     const { data } = await axios.post("/api/users/verifyPhone", { phone });
//     if (data.id.length === 34) {
//       setenableField(false);
//     }
//   } catch (error) {
//     console.error(error);
//   } finally {
//     setloading(false);
//   }
// };

// firebase
//   .messaging()
//   .getToken()
//   .then((fcmToken) => {

//   })
//   .catch((e) => seterror("something went wrong!"));
