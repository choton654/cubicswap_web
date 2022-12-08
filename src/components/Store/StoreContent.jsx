import router from "next/router";
import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import * as Sharing from "expo-sharing";

const { width, height } = Dimensions.get("window");

const StoreContent = ({ store }) => {
  const sharePage = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      return;
    }
    console.log(`${window.location.origin}/store/${store._id}`);
    await Sharing.shareAsync(`${window.location.origin}/store/${store._id}`);
  };

  return (
    <View style={{ padding: 10 }}>
      <View>
        <View style={styles.b}>
          <Text style={styles.c}>Company Name</Text>
          <Text style={styles.d}>{store.storeName}</Text>
        </View>
        <View style={styles.b1}>
          <Text style={styles.c}>Address</Text>
          <Text style={styles.e}>
            {`${store.address.roadName},
                  ${store.address.landmark},
                  ${store.address.city},
                  ${store.address.state},
                  ${store.address.pincode}
                `}
          </Text>
        </View>
        <View style={styles.b}>
          <Text style={styles.c}>Phone</Text>
          <Text style={styles.d}>{store?.phone}</Text>
        </View>
        <View style={styles.b1}>
          <Text style={styles.c}>About</Text>
          <Text style={styles.e}>{store?.aboutStore}</Text>
        </View>

        {store?.details && store?.details.length > 0 && (
          <View style={{ gridGap: 5 }}>
            {store.details.map((d, i) => (
              <View key={i} style={i % 2 === 0 ? styles.b : styles.b1}>
                <Text style={styles.c}>{d.fieldName}</Text>
                <Text style={styles.d}>
                  {d.fieldValue.map((v, idx) => (
                    <Text key={idx}>{v}</Text>
                  ))}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <Button
        style={{
          paddingVertical: 15,
        }}
        contentStyle={{
          backgroundColor: "rgb(39, 39, 39)",
        }}
        labelStyle={{ fontWeight: "600", fontSize: 12 }}
        color="rgb(240, 191, 76)"
        onPress={() =>
          router.push(
            `/map?lat=${store.geocodeAddress.coordinates[1]}&lang=${store.geocodeAddress.coordinates[0]}`
          )
        }
      >
        <Text>View on map</Text>
      </Button>
      <Button
        style={{
          paddingVertical: 15,
        }}
        contentStyle={{
          backgroundColor: "rgb(39, 39, 39)",
        }}
        labelStyle={{ fontWeight: "600", fontSize: 12 }}
        color="rgb(240, 191, 76)"
        onPress={sharePage}
      >
        <Text>Share this page</Text>
      </Button>
    </View>
  );
};

export default StoreContent;

const styles = StyleSheet.create({
  b: {
    flexDirection: "row",
    padding: 10,
  },
  b1: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "rgba(39, 39, 39,.08)",
  },
  c: {
    flexBasis: "40%",
    color: "rgba(39, 39, 39,.6)",
    fontWeight: "700",
  },
  d: {
    flexBasis: "60%",
    fontWeight: "400",
    fontSize: "15px",
    color: "rgb(39, 39, 39)",
    fontFamily:
      "Roboto, Droid Sans, Helvetica Neue, Arial, Helvetica, sans-serif",
  },
  e: {
    flexBasis: "60%",
    whiteSpace: "normal",
    color: "rgb(39, 39, 39)",
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: 20,
    fontFamily:
      "Roboto, Droid Sans, Helvetica Neue, Arial, Helvetica, sans-serif",
  },
  f: {
    flex: 1,
    width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

// <View style={styles.b}>
//         <Text style={styles.c}>Main Products</Text>
//         <Text style={styles.d}>
//           Mens Jacket, Womens Jacket, Childrens Jacket
//         </Text>
//       </View>
//       <View style={styles.b1}>
//         <Text style={styles.c}>Total Employees</Text>
//         <Text style={styles.e}>100 - 150 People</Text>
//       </View>
//       <View style={styles.b}>
//         <Text style={styles.c}>Year Established</Text>
//         <Text style={styles.d}>1954</Text>
//       </View>
//       <View style={styles.b1}>
//         <Text style={styles.c}>Country / Region</Text>
//         <Text style={styles.e}>Kolkata, India</Text>
//       </View>
