import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  accentColor,
  lightPrimaryColor,
  primaryColor,
} from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
const Footer = () => {
  const { show } = ScreenState();

  return (
    <View
      style={{
        backgroundColor: accentColor,
        padding: 20,
        marginTop: 20,
        paddingBottom: 40,
      }}
    >
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: show ? "row" : "column",
          gridGap: 20,
          borderBottomWidth: 1,
          borderBottomColor: lightPrimaryColor,
          paddingBottom: 20,
        }}
      >
        <View style={{ gridGap: 10, textAlign: !show && "center" }}>
          <Text
            style={{ color: primaryColor, fontWeight: 700, fontSize: "18px" }}
          >
            Connect with Us
          </Text>
          <TouchableOpacity
            accessibilityRole="link"
            href="https://www.facebook.com/Cubicswap-108024004861873"
          >
            <Text style={{ color: primaryColor, fontWeight: 400 }}>
              Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="link"
            //   href="https://www.facebook.com/Cubicswap-108024004861873"
          >
            <Text style={{ color: primaryColor, fontWeight: 400 }}>
              Linkedin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="link"
            //   href="https://www.facebook.com/Cubicswap-108024004861873"
          >
            <Text style={{ color: primaryColor, fontWeight: 400 }}>
              Twitter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="link"

            //   href="https://www.facebook.com/Cubicswap-108024004861873"
          >
            <Text style={{ color: primaryColor, fontWeight: 400 }}>
              Instagram
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ gridGap: 10, textAlign: !show && "center" }}>
          <Text
            style={{ color: primaryColor, fontWeight: 700, fontSize: "18px" }}
          >
            Shop Non-Stop on Cubicswap
          </Text>
          <TouchableOpacity
            accessibilityRole="link"
            //   href="https://www.facebook.com/Cubicswap-108024004861873"
          >
            <Text style={{ color: primaryColor, fontWeight: 400 }}>
              Sell on Cubicswap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="link"
            //   href="https://www.facebook.com/Cubicswap-108024004861873"
          >
            <Text style={{ color: primaryColor, fontWeight: 400 }}>
              Advertise Your Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="link"
            //   href="https://www.facebook.com/Cubicswap-108024004861873"
          >
            <Text style={{ color: primaryColor, fontWeight: 400 }}>
              Become a supplier
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          textAlign: !show && "center",
        }}
      >
        <Text style={{ color: primaryColor }}>
          All Rights Reserved. Copyright &copy; 2021,{" "}
          <Text style={{ fontWeight: "700", color: primaryColor }}>
            Cubicswap.com, Inc.
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});
