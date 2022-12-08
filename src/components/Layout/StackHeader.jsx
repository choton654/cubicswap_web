import { Box, Flex } from "native-base";
import router from "next/router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-elements/dist/image/Image";
import { Appbar } from "react-native-paper";
import { accentColor, primaryColor } from "../../Constant/color";
import { UserState } from "../../context/state/userState";
import Search from "../Search/search";
import CartIcon from "./CartIcon";

const StackHeader = ({ navigation, title }) => {
  const {
    state: {
      user: {
        role,
        myCart: { products },
      },
    },
  } = UserState();

  return (
    <Appbar.Header
      style={{
        backgroundColor: accentColor,
      }}>
      <Appbar.Action
        animated={false}
        size={30}
        onPress={() => router.push("/")}
        icon={() => (
          <Image transition alt='pic' style={{ width: 30, height: 30 }} source={"/img/cubicSwap-new.png"} />
        )}
      />
      <Appbar.Action
        animated={false}
        size={30}
        onPress={() => navigation.toggleDrawer()}
        color={primaryColor}
        icon={() => (
          <Flex justifyContent={"center"} alignItems={"center"}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='30px'
              viewBox='0 0 24 24'
              width='30px'
              fill={primaryColor}>
              <path d='M0 0h24v24H0z' fill='none' />
              <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
            </svg>
          </Flex>
        )}
      />
      {router.pathname !== "/" ? (
        <Box>
          <Appbar.Action
            animated={false}
            icon={() => (
              <Flex justifyContent={"center"} alignItems={"center"}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='24px'
                  viewBox='0 0 24 24'
                  width='24px'
                  fill={"rgb(240, 191, 76)"}>
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' />
                </svg>
              </Flex>
            )}
            onPress={() => {
              router.back();
            }}
          />
        </Box>
      ) : (
        <Appbar.Action animated={false} />
      )}
      <Appbar.Content title={title} color={primaryColor} />
      <View style={{ flex: 1 }}>
        <Search />
      </View>
      <Appbar.Action
        animated={false}
        icon={() => (
          <Box>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 0 24 24'
              width='24px'
              fill={primaryColor}>
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
            </svg>
          </Box>
        )}
        color={primaryColor}
        onPress={() => router.push("/profile", undefined, { shallow: true })}
      />
      {/* {role === "user" && <CartIcon products={products} />} */}
    </Appbar.Header>
  );
};

export default StackHeader;

const styles = StyleSheet.create({});
