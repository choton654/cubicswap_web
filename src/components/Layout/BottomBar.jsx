/** @format */

import { Box } from "native-base";
import router from "next/router";
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { UserState } from "../../context/state/userState";

function BottomBar() {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        a: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "rgb(39, 39, 39)",
          boxShadow: "3px 0 8px 1px rgb(0 0 0 / 40%)",
        },
      }),
    []
  );
  const {
    state: {
      isAuthenticated,
      user: { myStore, role },
    },
  } = UserState();
  return (
    <Appbar style={styles.a}>
      <Appbar.Action
        animated={false}
        icon={() => (
          <Box>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              enableBackground='new 0 0 24 24'
              height='24px'
              viewBox='0 0 24 24'
              width='24px'
              fill={router.pathname === "/" ? "rgb(240, 191, 76)" : "rgba(240, 191, 76, 0.6)"}>
              <g>
                <rect fill='none' height='24' width='24' />
              </g>
              <g>
                <g />
                <g>
                  <path d='M21.9,8.89l-1.05-4.37c-0.22-0.9-1-1.52-1.91-1.52H5.05C4.15,3,3.36,3.63,3.15,4.52L2.1,8.89 c-0.24,1.02-0.02,2.06,0.62,2.88C2.8,11.88,2.91,11.96,3,12.06V19c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-6.94 c0.09-0.09,0.2-0.18,0.28-0.28C21.92,10.96,22.15,9.91,21.9,8.89z M18.91,4.99l1.05,4.37c0.1,0.42,0.01,0.84-0.25,1.17 C19.57,10.71,19.27,11,18.77,11c-0.61,0-1.14-0.49-1.21-1.14L16.98,5L18.91,4.99z M13,5h1.96l0.54,4.52 c0.05,0.39-0.07,0.78-0.33,1.07C14.95,10.85,14.63,11,14.22,11C13.55,11,13,10.41,13,9.69V5z M8.49,9.52L9.04,5H11v4.69 C11,10.41,10.45,11,9.71,11c-0.34,0-0.65-0.15-0.89-0.41C8.57,10.3,8.45,9.91,8.49,9.52z M4.04,9.36L5.05,5h1.97L6.44,9.86 C6.36,10.51,5.84,11,5.23,11c-0.49,0-0.8-0.29-0.93-0.47C4.03,10.21,3.94,9.78,4.04,9.36z M5,19v-6.03C5.08,12.98,5.15,13,5.23,13 c0.87,0,1.66-0.36,2.24-0.95c0.6,0.6,1.4,0.95,2.31,0.95c0.87,0,1.65-0.36,2.23-0.93c0.59,0.57,1.39,0.93,2.29,0.93 c0.84,0,1.64-0.35,2.24-0.95c0.58,0.59,1.37,0.95,2.24,0.95c0.08,0,0.15-0.02,0.23-0.03V19H5z' />
                </g>
              </g>
            </svg>
          </Box>
        )}
        color={router.pathname === "/" ? "rgb(240, 191, 76)" : "rgba(240, 191, 76, 0.6)"}
        onPress={() => router.replace("/", undefined, { shallow: true })}
      />
      <Appbar.Action
        animated={false}
        icon={() => (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            fill={
              router.pathname === "/categories/allCategories" ? "rgb(240, 191, 76)" : "rgba(240, 191, 76, 0.6)"
            }>
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z' />
          </svg>
        )}
        color={router.pathname === "/categories/allCategories" ? "rgb(240, 191, 76)" : "rgba(240, 191, 76, 0.6)"}
        onPress={() =>
          router.replace("/categories/allCategories", undefined, {
            shallow: true,
          })
        }
      />
      {/* <Appbar.Action
        animated={false}
        icon={() => (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            fill={router.pathname === "/map" ? "rgb(240, 191, 76)" : "rgba(240, 191, 76, 0.6)"}>
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM10 5.47l4 1.4v11.66l-4-1.4V5.47zm-5 .99l3-1.01v11.7l-3 1.16V6.46zm14 11.08l-3 1.01V6.86l3-1.16v11.84z' />
          </svg>
        )}
        color={router.pathname === "/map" ? "rgb(240, 191, 76)" : "rgba(240, 191, 76, 0.6)"}
        onPress={() => router.replace("/map", undefined, { shallow: true })}
      />

      <NotificationIcon /> */}

      {role === "user" && (
        <Appbar.Action
          animated={false}
          icon={() => (
            <Box>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill={router.pathname === "/orderSummery" ? "rgb(240, 191, 76)" : "rgba(240, 191, 76, 0.6)"}>
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z' />
              </svg>
            </Box>
          )}
          color={router.pathname === "/orderSummery" ? "rgb(240, 191, 76)" : "rgba(240, 191, 76, 0.6)"}
          onPress={() => router.replace("/orderSummery", undefined)}
        />
      )}
      {isAuthenticated && role === "seller" && (
        <Appbar.Action
          animated={false}
          icon={() => (
            <Box>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill={
                  router.pathname === "/profile/myStore/[storeId]"
                    ? "rgb(240, 191, 76)"
                    : "rgba(240, 191, 76, 0.6)"
                }>
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z' />
              </svg>
            </Box>
          )}
          color={
            router.pathname === "/profile/myStore/[storeId]" ? "rgb(240, 191, 76)" : "rgba(240, 191, 76, 0.6)"
          }
          onPress={() =>
            router.replace(`/profile/myStore/${myStore._id}`, undefined, {
              shallow: true,
            })
          }
        />
      )}
      <Appbar.Action
        animated={false}
        icon={() => (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            fill={router.pathname === "/profile" ? "rgb(240, 191, 76)" : "rgba(240, 191, 76, 0.6)"}>
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
          </svg>
        )}
        color={router.pathname === "/profile" ? "rgb(240, 191, 76)" : "rgba(240, 191, 76, 0.6)"}
        onPress={() => router.replace("/profile", undefined, { shallow: true })}
      />
    </Appbar>
  );
}

export default BottomBar;
