import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Indicator({ scrollX, images, index }) {
  return (
    <View style={styles.a}>
      <View style={styles.b}>
        <Text style={{ color: "#fff", fontWeight: "500" }}>
          {index + 1}/{images.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  a: {
    flexDirection: "row",
    marginVertical: 6,
    position: "absolute",
    bottom: "1%",
    left: 0,
    right: 0,
    justifyContent: "center",
  },
  b: {
    height: 25,
    width: 35,
    borderRadius: 10,
    backgroundColor: "rgba(39, 39, 39,.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Indicator;

// {
//   images.map((_, i) => {
//     const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

//     const scale = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.8, 1.4, 0.8],
//       extrapolate: "clamp",
//     });
//     const opacity = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.6, 0.9, 0.6],
//       extrapolate: "clamp",
//     });

//     return (
//       <Animated.View
//         key={i}
//         style={{
//           height: 8,
//           width: 8,
//           borderRadius: 5,
//           margin: 5,
//           backgroundColor: "rgba(39, 39, 39,.5)",
//           opacity,
//           transform: [{ scale }],
//         }}
//       />
//     );
//   });
// }
