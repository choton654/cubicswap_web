import axios from "axios";
import { Formik } from "formik";
import { Actionsheet } from "native-base";
import router from "next/router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { Button, HelperText, Snackbar, TextInput } from "react-native-paper";
import { useMutation, useQueryClient } from "react-query";
import { LoginMutation } from "../../api";
import { client } from "../../client";
import { deleteColor, textColor } from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import { AUTH_USER } from "../../graphql/query";
import { initializeUser } from "../../utils/isServer";

function ProdDrawer({
  isVisible,
  setIsVisible,
  isCart,
  isCheckout,
  setisCart,
  product,
  setisCheckout,
  addCartmutation,
  addCheckoutmutation,
  createChatRoomMutation,
  isChatroom,
  store,
  setisChatroom,
  orderQty,
  selectedRange,
}) {
  const queryClient = useQueryClient();

  const [error, seterror] = useState("");

  const [showPass, setShowPass] = useState(true);
  const [invalidOrder, setInvalidOrder] = useState("");

  const { screenWidth } = ScreenState();

  const { mutate, isLoading } = useMutation(LoginMutation, {
    onSuccess: async data => {
      client.setHeader("authorization", `Bearer ${data.token}`);

      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      localStorage.setItem("token", data.token);

      initializeUser(data, false);

      try {
        await queryClient.fetchQuery("authUser", async () => {
          const { authUser } = await client.request(AUTH_USER, {
            isSeller: data.user.role === "seller",
            phone: data.user.phone,
            _id: data.user._id.toString(),
          });

          return authUser;
        });

        if (isCart) {
          if (orderQty < product.minOrder) {
            setInvalidOrder(`min order is ${product.minOrder}`);
            return;
          }
          if (!Number(orderQty)) {
            setInvalidOrder(`invalid order number`);
            return;
          }

          await addCartmutation.mutate({
            productId: product._id,
            quantity: parseFloat(orderQty),
          });
        }
        if (isCheckout) {
          if (orderQty < product.minOrder) {
            setInvalidOrder(`min order is ${product.minOrder}`);
            return;
          }
          if (!Number(orderQty)) {
            setInvalidOrder(`invalid order number`);
            return;
          }

          await addCheckoutmutation.mutate({
            productId: product._id,
            quantity: parseFloat(orderQty),
          });
        }
        if (isChatroom) {
          console.log("chat-room");
          router.push(
            `https://api.whatsapp.com/send?phone=91${store.phone}&text=Hi we found you on Cubicswap. Want to enquire about ${product.name}`
          );
          // await createChatRoomMutation.mutate();
        }

        setIsVisible(false);
      } catch (error) {
        console.error(error);
      }
    },

    onError: err => {
      console.log(err.response.data.msg);
      seterror(err.response.data.msg);
    },
  });

  return (
    <>
      <Actionsheet
        isOpen={isVisible}
        onClose={() => setIsVisible(false)}
        maxW={screenWidth}
        w={screenWidth}
        mx={"auto"}>
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
          }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "rgb(39, 39, 39)",
                justifyContent: "space-between",
                padding: 10,
                alignItems: "center",
              }}>
              <Text style={{ fontWeight: "500", color: "rgb(240, 191, 76)" }}>
                Please enter your details to continue
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                  seterror("");
                }}>
                <Icon name='close' type='material' color='rgb(240, 191, 76)' />
              </TouchableOpacity>
            </View>

            <Formik
              initialValues={{ phone: "", password: "" }}
              onSubmit={(values, { resetForm }) => {
                if (Object.values(values).includes("")) {
                  seterror("All fields are required");
                  return;
                }
                if (values.phone.length !== 10 || isNaN(parseInt(values.phone))) {
                  seterror("phone number must be 10 charecters long");
                  return;
                }

                mutate({ ...values });
                setisCart(false);
                setisCheckout(false);
                setisChatroom(false);
                resetForm();
              }}>
              {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
                <View>
                  <TextInput
                    label='Phone'
                    style={{
                      borderTopStartRadius: 0,
                      borderTopEndRadius: 0,
                      width: "100%",
                    }}
                    onChangeText={text => {
                      // handleChange("email");
                      setFieldValue("phone", text);
                      seterror("");
                    }}
                    onBlur={handleBlur("phone")}
                    value={values.phone}
                    right={<TextInput.Icon name='phone' />}
                    left={<TextInput.Affix text='+91' />}
                  />
                  {error.length > 0 && (
                    <HelperText
                      type='error'
                      visible={error.length > 0}
                      style={{ backgroundColor: "rgb(39, 39, 39)" }}>
                      {error}
                    </HelperText>
                  )}
                  <TextInput
                    label='Password'
                    style={{
                      borderTopStartRadius: 0,
                      borderTopEndRadius: 0,
                      width: "100%",
                    }}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    right={<TextInput.Icon name='eye' onPress={() => setShowPass(p => !p)} />}
                    textContentType='password'
                    autoCompleteType='password'
                    secureTextEntry={showPass}
                  />
                  <Button
                    onPress={() => {
                      handleSubmit();
                      // resetForm();
                    }}
                    loading={isLoading}
                    disabled={isLoading}
                    contentStyle={{ width: "100%" }}
                    labelStyle={{
                      color: "rgb(240, 191, 76)",
                      fontWeight: "bold",
                    }}
                    icon='login'
                    style={{
                      flex: 1,
                      height: "45px",
                      backgroundColor: "rgb(39, 39, 39)",
                      justifyContent: "center",
                      borderRadius: 0,
                    }}>
                    Login
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Actionsheet>

      <Snackbar
        wrapperStyle={{
          bottom: 66,
        }}
        duration={1500}
        style={{ backgroundColor: deleteColor, boxShadow: "none" }}
        visible={invalidOrder !== ""}
        onDismiss={() => setInvalidOrder("")}>
        <Text style={{ color: textColor, fontWeight: "600" }}>{invalidOrder}</Text>
      </Snackbar>
    </>
  );
}

export default ProdDrawer;

// firebase
//   .messaging()
//   .getToken()
//   .then((fcmToken) => {
//   })
//   .catch((e) => seterror("something went wrong!"));

// Cookies.set("token", data.token, {
//   path: "/",
//   secure: true,
//   sameSite: "strict",
//   expires: 30,
// });

//  <BottomSheet
//       isVisible={isVisible}
//       containerStyle={{
//         backgroundColor: "rgba(0.5, 0.25, 0, 0.2)",
//         maxWidth: screenWidth,
//         width: screenWidth,
//         marginHorizontal: "auto",
//         // marginLeft: md ? lgSidebar : show ? smSidebar : 0,
//       }}></BottomSheet>
