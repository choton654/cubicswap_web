import { useRouter } from "next/router";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { Button } from "react-native-paper";
import { primaryColor } from "../../Constant/color";

function AddressCard({ me, checkout }) {
  const { shippingAddress } = me;
  const router = useRouter();
  return (
    <View style={styles.a}>
      {shippingAddress ? (
        <>
          <View style={styles.b}>
            <View style={styles.c}>
              <Text style={styles.d}>{me.name}</Text>
            </View>
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text style={styles.e}>
                {`${shippingAddress.roadName},
                  ${shippingAddress.houseNo},
                  ${shippingAddress.landmark},
                  ${shippingAddress.city},
                  ${shippingAddress.state},
                  ${shippingAddress.pinCode}, Phone: ${
                  me?.phone || "Your phone number"
                }
                `}
              </Text>
            </View>
            {/* <Text style={styles.f}>{me?.phone || "Your phone number"}</Text> */}
          </View>
          <Button
            style={{ height: "100%", padding: 10 }}
            contentStyle={{
              backgroundColor: primaryColor,
              height: "100%",
            }}
            labelStyle={{ fontWeight: "600", fontSize: 12 }}
            color="rgb(39, 39, 39)"
            onPress={() => {
              if (checkout) {
                router.push("/address?type=checkout");
              } else {
                router.push("/address?type=address");
              }
            }}
          >
            <Text>Change your address</Text>
          </Button>
        </>
      ) : (
        <TouchableOpacity
          onPress={() => router.push("/address?type=checkout")}
          style={styles.g}
        >
          <Icon type="material" name="add" color={primaryColor} />
          <Text style={styles.h}>Add Your delivery address to continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  a: {
    backgroundColor: "rgba(39, 39, 39,.8)",
    marginTop: 10,
    // boxShadow: "3px 0 8px 1px rgb(0 0 0 / 40%)",
  },
  b: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 12,
    color: primaryColor,
  },
  c: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  d: {
    fontWeight: "bold",
    fontSize: "16px",
    color: primaryColor,
    fontFamily:
      "Roboto, Droid Sans, Helvetica Neue, Arial, Helvetica, sans-serif",
  },
  e: {
    width: "100%",
    overflow: "hidden",
    whiteSpace: "normal",
    fontSize: 15,
    letterSpacing: 1,
    // textOverflow: "ellipsis",
    color: primaryColor,
  },
  f: {
    marginTop: 6,
    whiteSpace: "nowrap",
    color: primaryColor,
  },
  g: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "rgb(39, 39, 39)",
  },
  h: {
    fontSize: 16,
    paddingLeft: 14,
    color: primaryColor,
  },
});

export default AddressCard;
