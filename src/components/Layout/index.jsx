import dynamic from "next/dynamic";
import React from "react";
import { StyleSheet } from "react-native";
import CustomLoader from "./CustomLoader";

import { enableScreens } from "react-native-screens";
enableScreens();

const MainNavigation = dynamic(() => import("./MainNavigation").then(p => p.default), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <CustomLoader />,
});

const Layout = ({ children, title }) => {
  return <MainNavigation title={title}>{children}</MainNavigation>;
};

export default Layout;

const styles = StyleSheet.create({});
