import router from "next/router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Icon } from "react-native-elements";

function ProfileCard({ me }) {
  return (
    <View style={styles.a}>
      <View style={styles.b}>
        <View>
          <View style={styles.c}>
            <Icon
              name="edit"
              type="material"
              color="rgb(240, 191, 76)"
              onPress={() => router.push("/address?type=profile")}
            />
          </View>
          <View style={{ height: 80 }}>
            <View style={styles.d}>
              <Avatar
                size="large"
                rounded
                icon={{ name: "user", type: "font-awesome" }}
                activeOpacity={0.7}
                // containerStyle={{ flex: 2, marginLeft: 20, marginTop: 115 }}
              />
            </View>
          </View>
          <Text style={styles.e}>{me.name}</Text>
          <View style={styles.f}>
            <Text style={styles.g}>
              {me.phone ? me.phone : "You have not add your phone number yet"}
            </Text>
            <Text style={styles.h}>{me.email}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  a: {
    boxShadow: "2px 2px 2px #c2c2c2",
    width: "100%",
  },
  b: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "rgba(39, 39, 39, 0.8)",
  },
  c: {
    position: "absolute",
    bottom: -20,
    right: -15,
    height: 56,
    width: 56,
    padding: 17,
    flex: 1,
  },
  d: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  e: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "rgba(240, 191, 76,.8)",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  f: {
    justifyContent: "center",
    alignItems: "center",
  },
  g: {
    fontSize: 15,
    color: "rgba(240, 191, 76,.8)",
  },
  h: {
    fontSize: 15,
    color: "rgba(240, 191, 76,.8)",
  },
});

export default ProfileCard;
