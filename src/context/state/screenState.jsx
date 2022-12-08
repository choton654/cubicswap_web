/** @format */

import router from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";

const ScreenContext = createContext();

export const ScreenContextProvider = ({ children }) => {
  let show = false;
  let md = false;
  let lg = false;

  const [isrouteChanging, setIsrouteChanging] = useState(false);
  const [smScreen] = useState("62em");
  const [lgSidebar] = useState(275);
  const [smSidebar] = useState(88);

  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get("window").height);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (Dimensions.get("window").width >= 1440) {
      setScreenWidth(1440);
    }
    const onResize = event => {
      if (Dimensions.get("window").width >= 1440) {
        setScreenWidth(1440);
      } else {
        setScreenWidth(event.window.width);
      }
      setScreenHeight(event.window.height);
    };
    Dimensions.addEventListener("change", onResize);

    return () => Dimensions.removeEventListener("change", onResize);
  }, [screenWidth]);

  useEffect(() => {
    router.events.on("routeChangeStart", url => {
      setIsrouteChanging(true);
    });
    router.events.on("routeChangeComplete", () => {
      setIsrouteChanging(false);
    });
    router.events.on("routeChangeError", () => {
      setIsrouteChanging(false);
    });
  }, []);

  if (screenWidth > smScreen) {
    show = true;
    md = false;
    lg = false;
  }

  if (screenWidth > 1024) {
    show = true;
    md = true;
    lg = false;
  }
  if (screenWidth > 1280) {
    show = true;
    md = true;
    lg = true;
  }

  return (
    <ScreenContext.Provider
      value={{
        isrouteChanging,
        screenWidth,
        screenHeight,
        lgSidebar,
        smSidebar,
        smScreen,
        show,
        md,
        lg,
        selectedIndex,
        setSelectedIndex,
      }}>
      {children}
    </ScreenContext.Provider>
  );
};

export const ScreenState = () => useContext(ScreenContext);
