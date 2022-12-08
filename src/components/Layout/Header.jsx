/** @format */

import { Box } from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-elements/dist/image/Image";
import { Appbar } from "react-native-paper";
import { accentColor, primaryColor } from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import { UserState } from "../../context/state/userState";
import CartIcon from "./CartIcon";
import SearchIcon from "./SearchIcon";

const NewHeader = ({ title }) => {
  const router = useRouter();
  const { show, md, lg } = ScreenState();

  const [NotShow] = React.useState(router.pathname !== "/");

  const {
    state: {
      user: {
        myCart: { products },
        role,
      },
    },
  } = UserState();

  return (
    <Appbar.Header style={styles.a}>
      {NotShow && (
        <Box>
          <Appbar.Action
            animated={false}
            icon={() => (
              <Box>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='24px'
                  viewBox='0 0 24 24'
                  width='24px'
                  fill={"rgb(240, 191, 76)"}>
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' />
                </svg>
              </Box>
            )}
            onPress={() => {
              router.back();
            }}
          />
        </Box>
      )}

      {!show && !NotShow && (
        <Appbar.Action
          animated={false}
          onPress={() => router.push("/")}
          icon={() => (
            <View style={styles.b}>
              <Image transition alt='pic' style={{ width: 30, height: 30 }} source={"/img/cubicSwap-new.png"} />
            </View>
          )}
        />
      )}

      <Appbar.Content
        title={title || ""}
        titleStyle={{
          fontSize: "15px",
          color: primaryColor,
        }}
      />
      {!show && <SearchIcon />}
      {/* {!show && role === "user" && <CartIcon products={products} />} */}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  a: {
    backgroundColor: accentColor,
  },
  b: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewHeader;

// {title !== "Home" && (
//       <Appbar.Action
//         icon="account"
//         color={primaryColor}
//         onPress={() => router.push("/profile", undefined, { shallow: true })}
//       />
//     )}

// {products?.length > 0 && (
//             )}

// <Appbar.BackAction
//   color={primaryColor}
//   onPress={() => {
//     router.back();
//   }}
// />;
