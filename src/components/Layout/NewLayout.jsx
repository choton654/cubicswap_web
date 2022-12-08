import * as React from "react";
import { KeyboardAvoidingView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
import CustomLoader from "./CustomLoader";
import firebase from "firebase/app";

enableScreens();

const Stack = createStackNavigator();

const NewLayout = ({ children }) => {


  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
      });
    } else {
      firebase.app();
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("load", () => {
      console.log(navigator.onLine);

      window.addEventListener("online", () => console.log("online"));
      window.addEventListener("offline", () => console.log("offline"));
    });
  }, []);

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        localStorage.setItem(
          "user_location",
          JSON.stringify({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          })
        );
      });
      navigator.permissions.query({ name: "geolocation" }).then(function (result) {
        if (result.state === "granted") {
          localStorage.setItem("permission", "granted");
        } else if (result.state === "prompt") {
          localStorage.setItem("permission", "prompted");
        } else if (result.state === "denied") {
          return;
        }
        result.onchange = function () {
          console.log("Permission " + result.state);
        };
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  if (!isMounted) {
    return <CustomLoader />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='cubicswap'>
          {() => (
            <KeyboardAvoidingView
              style={{
                flex: 1,
                height: "100%",
                backgroundColor: "#fff",
                scrollbarWidth: "none",
              }}>
              {children}
            </KeyboardAvoidingView>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NewLayout;
