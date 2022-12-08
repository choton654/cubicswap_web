/* eslint-disable react/no-children-prop */
/* eslint-disable react/display-name */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useMemo } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";
import { accentColor, primaryColor, textColor } from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import BottomBar from "./BottomBar";
import Header from "./Header";
import LeftDrawerContent from "./LeftDrawer";
import StackHeader from "./StackHeader";

function Root({ title, children }) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        b: {
          flex: 1,
          marginBottom: 56,
        },
      }),
    []
  );

  const { show, md, lg, lgSidebar, isrouteChanging, smSidebar, screenWidth } =
    ScreenState();
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cubicswap">
        {() => (
          <>
            {show ? (
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen
                  name="Cubicswap"
                  options={{
                    cardStyle: {
                      backgroundColor: textColor,
                    },
                  }}
                >
                  {() => (
                    <Drawer.Navigator
                      drawerContent={(props) => (
                        <LeftDrawerContent {...props} />
                      )}
                      screenOptions={{
                        drawerStyle: {
                          backgroundColor: textColor,
                          maxWidth: lgSidebar,
                        },
                        headerShown: false,
                        drawerType: "front",
                        drawerPosition: "left",
                      }}
                    >
                      <Drawer.Screen name="Cubicswap">
                        {() => (
                          <Stack.Navigator
                            screenOptions={({ navigation }) => ({
                              header: () => (
                                <StackHeader
                                  navigation={navigation}
                                  title={title}
                                />
                              ),
                            })}
                          >
                            <Stack.Screen name="Cubicswap">
                              {() => (
                                <Stack.Navigator
                                  screenOptions={({ navigation }) => ({
                                    headerShown: false,
                                  })}
                                >
                                  <Stack.Screen
                                    name="Cubicswap"
                                    options={{
                                      cardStyle: {
                                        maxWidth: screenWidth,
                                        width: screenWidth,
                                        marginHorizontal: "auto",
                                      },
                                    }}
                                  >
                                    {() => (
                                      <>
                                        {isrouteChanging && (
                                          <ProgressBar
                                            color={primaryColor}
                                            indeterminate
                                            style={{
                                              backgroundColor: accentColor,
                                            }}
                                          />
                                        )}
                                        <ScrollView>{children}</ScrollView>
                                      </>
                                    )}
                                  </Stack.Screen>
                                </Stack.Navigator>
                              )}
                            </Stack.Screen>
                          </Stack.Navigator>
                        )}
                      </Drawer.Screen>
                    </Drawer.Navigator>
                  )}
                </Stack.Screen>
              </Stack.Navigator>
            ) : (
              <Stack.Navigator
                screenOptions={{ header: () => <Header title={title} /> }}
              >
                <Stack.Screen name="Cubicswap">
                  {() => (
                    <Tab.Navigator
                      screenOptions={{ headerShown: false }}
                      tabBar={() => <BottomBar />}
                    >
                      <Tab.Screen name="Cubicswap">
                        {() => (
                          <KeyboardAvoidingView style={styles.b}>
                            {isrouteChanging && (
                              <ProgressBar
                                color={primaryColor}
                                indeterminate
                                style={{
                                  backgroundColor: accentColor,
                                }}
                              />
                            )}
                            <ScrollView>{children}</ScrollView>
                          </KeyboardAvoidingView>
                        )}
                      </Tab.Screen>
                    </Tab.Navigator>
                  )}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default Root;

{
  /* {router.pathname !==
                                            "/store/[id]/products" ||
                                          router.pathname !== "/store/[id]" ? (
                                            <Footer />
                                          ) : (
                                            <View></View>
                                          )} */
}
