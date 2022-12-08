/** @format */

import { extendTheme, NativeBaseProvider } from "native-base";
import Head from "next/head";
import React from "react";
import "react-native-gesture-handler";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "react-query";
import "setimmediate";
import { queryClient } from "../api";
import NewLayout from "../components/Layout/NewLayout";
import { ScreenContextProvider } from "../context/state/screenState";
import { UserContextProvider } from "../context/state/userState";
import "../css/index.css";

function MyApp({ Component, pageProps }) {


  const theme = {
    ...DefaultTheme,
    roundness: 2,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: "#f0bf4c",
      accent: "#262626",
      text: "#f0f0f0",
      // text: "#262626",
      background: "#525252",
      placeholder: "#f0bf4c",
      // surface: "#737373",
      // disabled: "#525252",
    },
    fonts: {
      ...DefaultTheme.fonts,
      // regular: "20px",
      // medium
      // light
      // thin
    },
  };

  const nativeTheme = extendTheme({
    colors: {
      primary: {
        50: "#ff6161",
        700: "#b45309",
        800: "#fddc5c",
        900: "#f0bf4c",
      },
      secondary: {
        50: "rgba(39, 39, 39, 0.2)",
        100: "rgba(39, 39, 39, 0.8)",
        500: "#fafafa",
        600: "#d4d4d4",
        700: "#525252",
        800: "#262626",
        900: "#171717",
      },
      success: {
        50: "#007185",
        100: "#42ba96",
      },
    },
  });

  return (
    <>
      <Head>
        <title>Cubicswap</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <ScreenContextProvider>
            <NativeBaseProvider theme={nativeTheme}>
              <PaperProvider theme={theme}>
                <SafeAreaProvider>
                  <NewLayout>
                    <Component {...pageProps} />
                  </NewLayout>
                </SafeAreaProvider>
              </PaperProvider>
            </NativeBaseProvider>
          </ScreenContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

//  <NewLayout></NewLayout>;

// export function reportWebVitals(metric) {
//   console.log(metric);
// }
// <ApolloProvider client={client}></ApolloProvider>;

// <div suppressHydrationWarning>
//     {typeof window === "undefined" ? null : (
// )}
//   </div>
{
  /* <ReactQueryDevtools initialIsOpen /> */
}

// (async () => {
//   await gapi.load("auth2", function () {
//     gapi.auth2.init();
//   });
// })();

// <meta
//           name="google-signin-client_id"
//           content=process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
//         ></meta>
//         <script src="https://apis.google.com/js/platform.js"></script>

// import * as PusherPushNotifications from "@pusher/push-notifications-web";

// const beamsClient = new PusherPushNotifications.Client({
//   instanceId: "cce8f571-3223-4fcc-ac46-4341d00ca605",
// });

// beamsClient
//   .start()
//   .then((beamsClient) => beamsClient.getDeviceId())
//   .then((deviceId) =>
//     console.log("Successfully registered with Beams. Device ID:", deviceId)
//   )
//   .catch(console.error);

// useEffect(() => {
//   (async () => {
//     // Let's check if the browser supports notifications

//     if (!("serviceWorker" in navigator)) {
//       // Service Worker isn't supported on this browser, disable or hide UI.
//       alert("Service Worker isn't supported on this browser,");
//     }

//     if (!("PushManager" in window)) {
//       // Push isn't supported on this browser, disable or hide UI.
//       alert("Push isn't supported on this browser,");
//     }

//     if (!("Notification" in window)) {
//       alert("This browser does not support desktop notification");
//     }

//     // Let's check whether notification permissions have already been granted
//     else if (Notification.permission === "granted") {
//       // If it's okay let's create a notification
//       console.log("permission granted");
//       const messaging = firebase.messaging();
//       messaging
//         .getToken()
//         .then((fcmToken) => {
//           console.log(fcmToken);
//           // window.localStorage.setItem("fcmToken", fcmToken ? fcmToken : "");
//         })
//         .catch((e) => console.error(e.message));
//       messaging.onMessage((payload) => {
//         console.log("onMessage", payload);
//         new Notification(payload.notification.title, {
//           body: payload.notification.body,
//         });
//       });
//     }

//     // Otherwise, we need to ask the user for permission
//     else if (Notification.permission !== "denied") {
//       await Notification.requestPermission().then(function (permission) {
//         // If the user accepts, let's create a notification
//         if (permission === "granted") {
//           // var notification = new Notification("Hi there!");
//           console.log("permission granted");
//         }
//       });
//     }

//     // At last, if the user has denied notifications, and you
//     // want to be respectful there is no need to bother them any more.
//   })();
// }, []);
