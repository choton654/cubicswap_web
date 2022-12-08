import { useRouter } from "next/router";
import React from "react";
import { View } from "react-native";
import { Drawer } from "react-native-paper";
import Layout from "../components/Layout";
import { UserState } from "../context/state/userState";

function Menu() {
  const {
    logoutUser,
    state: { isAuthenticated },
  } = UserState();

  const router = useRouter();
  return (
    <Layout title={"Menu"}>
      <View
        style={{
          height: "100vh",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Drawer.Section title="Menu">
          <Drawer.Item
            style={{ color: "#fff", backgroundColor: "rgb(39, 39, 39)" }}
            label={isAuthenticated ? "You are Logged In" : "Who are You?"}
            active={isAuthenticated}
          />
          {isAuthenticated ? (
            <Drawer.Item
              style={{ color: "#fff", backgroundColor: "rgb(39, 39, 39)" }}
              icon={"logout"}
              label="Logout"
              onPress={() => logoutUser()}
            />
          ) : (
            <Drawer.Item
              style={{ color: "#fff", backgroundColor: "rgb(39, 39, 39)" }}
              icon={"login"}
              label="Login"
              onPress={() => router.push("/signIn")}
            />
          )}
        </Drawer.Section>
      </View>
    </Layout>
  );
}

export default Menu;
