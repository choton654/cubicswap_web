import { Component } from "react";
import { Text, View } from "react-native";
const { DrawerLayout } = require("react-native-gesture-handler");

class Drawerable extends Component {
  handleDrawerSlide = (status) => {
    console.log(status);
  };

  renderDrawer = () => {
    return (
      <View>
        <Text onPress={() => this.drawer.closeDrawer()}>
          I am in the drawer!{" "}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DrawerLayout
          ref={(drawer) => {
            this.drawer = drawer;
          }}
          drawerWidth={250}
          drawerPosition={DrawerLayout.positions.Right}
          drawerType="front"
          drawerBackgroundColor="#ddd"
          renderNavigationView={this.renderDrawer}
        >
          <View>
            <Text onPress={() => this.drawer.openDrawer()}>
              Hello, its me, slide right to open drawer
            </Text>
          </View>
        </DrawerLayout>
      </View>
    );
  }
}

export default Drawerable;

// import React, { Component } from "react";
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   Animated,
//   View,
//   TextInput,
// } from "react-native";

// import { RectButton, DrawerLayout } from "react-native-gesture-handler";

// const TYPES = ["front", "back", "back", "slide"];
// const PARALLAX = [false, false, true, false];

// const Page = ({
//   fromLeft,
//   type,
//   parallaxOn,
//   flipSide,
//   nextType,
//   openDrawer,
// }) => (
//   <View style={styles.page}>
//     <Text style={styles.pageText}>Hi 👋</Text>
//     <RectButton style={styles.rectButton} onPress={flipSide}>
//       <Text style={styles.rectButtonText}>
//         Drawer to the {fromLeft ? "left" : "right"}
//       </Text>
//     </RectButton>
//     <RectButton style={styles.rectButton} onPress={nextType}>
//       <Text style={styles.rectButtonText}>
//         Type {type}
//         {parallaxOn && " with parallax"}
//       </Text>
//     </RectButton>
//     <RectButton style={styles.rectButton} onPress={openDrawer}>
//       <Text style={styles.rectButtonText}>Open drawer</Text>
//     </RectButton>
//     <TextInput
//       style={styles.pageInput}
//       placeholder="Just an input field to test kb dismiss mode"
//     />
//   </View>
// );

// export default class Example extends Component {
//   state = { fromLeft: true, type: 0 };

//   renderParallaxDrawer = (progressValue) => {
//     const parallax = progressValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [this.state.fromLeft ? -50 : 50, 0],
//     });
//     const animatedStyles = {
//       transform: [{ translateX: parallax }],
//     };
//     return (
//       <Animated.View style={[styles.drawerContainer, animatedStyles]}>
//         <Text style={styles.drawerText}>I am in the drawer!</Text>
//         <Text style={styles.drawerText}>
//           Watch parallax animation while you pull the drawer!
//         </Text>
//       </Animated.View>
//     );
//   };

//   renderDrawer = () => {
//     return (
//       <View style={styles.drawerContainer}>
//         <Text style={styles.drawerText}>I am in the drawer!</Text>
//       </View>
//     );
//   };

//   render() {
//     const drawerType = TYPES[this.state.type];
//     const parallax = PARALLAX[this.state.type];
//     return (
//       <View style={styles.container}>
//         <DrawerLayout
// ref={(drawer) => {
//   this.drawer = drawer;
// }}
//           drawerWidth={200}
//           keyboardDismissMode="on-drag"
//           drawerPosition={
//             this.state.fromLeft
//               ? DrawerLayout.positions.Left
//               : DrawerLayout.positions.Right
//           }
//           drawerType={drawerType}
//           drawerBackgroundColor="#ddd"
//           overlayColor={drawerType === "front" ? "black" : "#00000000"}
//           renderNavigationView={
//             parallax ? this.renderParallaxDrawer : this.renderDrawer
//           }
//           contentContainerStyle={
//             // careful; don't elevate the child container
//             // over top of the drawer when the drawer is supposed
//             // to be in front - you won't be able to see/open it.
//             drawerType === "front"
//               ? {}
//               : Platform.select({
//                   ios: {
//                     shadowColor: "#000",
//                     shadowOpacity: 0.5,
//                     shadowOffset: { width: 0, height: 2 },
//                     shadowRadius: 60,
//                   },
//                   android: {
//                     elevation: 100,
//                     backgroundColor: "#000",
//                   },
//                 })
//           }
//         >
//           <Page
//             type={drawerType}
//             fromLeft={this.state.fromLeft}
//             parallaxOn={parallax}
//             flipSide={() => this.setState({ fromLeft: !this.state.fromLeft })}
//             nextType={() =>
//               this.setState({ type: (this.state.type + 1) % TYPES.length })
//             }
//             openDrawer={() => this.drawer.openDrawer()}
//           />
//         </DrawerLayout>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   page: {
//     ...StyleSheet.absoluteFillObject,
//     alignItems: "center",
//     paddingTop: 40,
//     backgroundColor: "gray",
//   },
//   pageText: {
//     fontSize: 21,
//     color: "white",
//   },
//   rectButton: {
//     height: 60,
//     padding: 10,
//     alignSelf: "stretch",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//     backgroundColor: "white",
//   },
//   rectButtonText: {
//     backgroundColor: "transparent",
//   },
//   drawerContainer: {
//     flex: 1,
//     paddingTop: 10,
//   },
//   pageInput: {
//     height: 60,
//     padding: 10,
//     alignSelf: "stretch",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//     backgroundColor: "#eee",
//   },
//   drawerText: {
//     margin: 10,
//     fontSize: 15,
//     textAlign: "left",
//   },
// });

// import React, { Component } from "react";
// import {
//   Text,
//   View,
//   FlatList,
//   Dimensions,
//   Button,
//   StyleSheet,
// } from "react-native";

// const { width } = Dimensions.get("window");

// const style = {
//   justifyContent: "center",
//   alignItems: "center",
//   width: width,
//   height: 50,
//   flex: 1,
//   borderWidth: 1,
// };

// const COLORS = ["deepskyblue", "fuchsia", "lightblue "];

// function getData(number) {
//   let data = [];
//   for (var i = 0; i < number; ++i) {
//     data.push("" + i);
//   }

//   return data;
// }

// class ScrollToExample extends Component {
//   getItemLayout = (data, index) => ({
//     length: 100,
//     offset: 100 * index,
//     index,
//   });

//   getColor(index) {
//     const mod = index % 3;
//     return COLORS[mod];
//   }

//   scrollToIndex = () => {
//     let randomIndex = Math.floor(
//       Math.random(Date.now()) * this.props.data.length
//     );
//     this.flatListRef.scrollToIndex({ animated: true, index: randomIndex });
//   };

//   scrollToItem = () => {
//     let randomIndex = Math.floor(
//       Math.random(Date.now()) * this.props.data.length
//     );
//     this.flatListRef.scrollToIndex({ animated: true, index: "" + randomIndex });
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Button
//             onPress={this.scrollToIndex}
//             title="Tap to scrollToIndex"
//             color="darkblue"
//           />
//           <Button
//             onPress={this.scrollToItem}
//             title="Tap to scrollToItem"
//             color="purple"
//           />
//         </View>
//         <FlatList
//           ref={(ref) => {
//             this.flatListRef = ref;
//           }}
//           data={this.props.data}
//           keyExtractor={(item) => item}
//           getItemLayout={this.getItemLayout}
//           initialScrollIndex={50}
//           initialNumToRender={2}
//           renderItem={({ item, index }) => (
//             <View style={{ ...style, backgroundColor: this.getColor(index) }}>
//               <Text>{item}</Text>
//             </View>
//           )}
//           {...this.props}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     paddingTop: 20,
//     backgroundColor: "darkturquoise",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default class app extends Component {
//   render() {
//     return <ScrollToExample data={getData(100)} />;
//   }
// }

// import React from "react";
// import ImageCorosal from "../components/Product/ImageCorosal";

// function about() {
//   const media = [
//     "https://res.cloudinary.com/choton/image/upload/$imgwidth_500/$imgheight_500/$border_10/e_trim/if_w_gte_h,w_$imgwidth_sub_$border_mul_2/if_else,h_$imgheight_sub_$border_mul_2/bo_10px_solid_rgb:ffffff00/c_pad,w_$imgwidth,h_$imgheight,b_rgb:ffffff/q_auto,f_auto/v1627147813/ooqqcekvfmsr7dvqndwg.webp",
//     "https://res.cloudinary.com/choton/image/upload/$imgwidth_500/$imgheight_500/$border_10/e_trim/if_w_gte_h,w_$imgwidth_sub_$border_mul_2/if_else,h_$imgheight_sub_$border_mul_2/bo_10px_solid_rgb:ffffff00/c_pad,w_$imgwidth,h_$imgheight,b_rgb:ffffff/q_auto,f_auto/v1627147813/busj0eo1smxwxzdvounq.webp",
//     "https://res.cloudinary.com/choton/image/upload/$imgwidth_500/$imgheight_500/$border_10/e_trim/if_w_gte_h,w_$imgwidth_sub_$border_mul_2/if_else,h_$imgheight_sub_$border_mul_2/bo_10px_solid_rgb:ffffff00/c_pad,w_$imgwidth,h_$imgheight,b_rgb:ffffff/q_auto,f_auto/v1627147814/s2tgz8yg3eubuw3j7z2d.webp",
//     "https://res.cloudinary.com/choton/image/upload/$imgwidth_500/$imgheight_500/$border_10/e_trim/if_w_gte_h,w_$imgwidth_sub_$border_mul_2/if_else,h_$imgheight_sub_$border_mul_2/bo_10px_solid_rgb:ffffff00/c_pad,w_$imgwidth,h_$imgheight,b_rgb:ffffff/q_auto,f_auto/v1627147814/cpxxnlu6c96se5124w5f.webp",
//     "https://res.cloudinary.com/choton/image/upload/$imgwidth_500/$imgheight_500/$border_10/e_trim/if_w_gte_h,w_$imgwidth_sub_$border_mul_2/if_else,h_$imgheight_sub_$border_mul_2/bo_10px_solid_rgb:ffffff00/c_pad,w_$imgwidth,h_$imgheight,b_rgb:ffffff/q_auto,f_auto/v1627147813/eli51wxwriucdqoal0xt.webp",
//     "https://res.cloudinary.com/choton/image/upload/$imgwidth_500/$imgheight_500/$border_10/e_trim/if_w_gte_h,w_$imgwidth_sub_$border_mul_2/if_else,h_$imgheight_sub_$border_mul_2/bo_10px_solid_rgb:ffffff00/c_pad,w_$imgwidth,h_$imgheight,b_rgb:ffffff/q_auto,f_auto/v1627147813/jbwunim84dw1fhjujxaf.webp",
//     "https://res.cloudinary.com/choton/image/upload/$imgwidth_500/$imgheight_500/$border_10/e_trim/if_w_gte_h,w_$imgwidth_sub_$border_mul_2/if_else,h_$imgheight_sub_$border_mul_2/bo_10px_solid_rgb:ffffff00/c_pad,w_$imgwidth,h_$imgheight,b_rgb:ffffff/q_auto,f_auto/v1627147814/ab5oahxfnaay5dls0q6g.webp",
//     "https://res.cloudinary.com/choton/image/upload/$imgwidth_500/$imgheight_500/$border_10/e_trim/if_w_gte_h,w_$imgwidth_sub_$border_mul_2/if_else,h_$imgheight_sub_$border_mul_2/bo_10px_solid_rgb:ffffff00/c_pad,w_$imgwidth,h_$imgheight,b_rgb:ffffff/q_auto,f_auto/v1627147814/s0vxsxcmlat6ef5y2e2b.webp",
//   ];
//   const mediaByIndex = (index) => media[index % media.length];

//   const SLIDE_COUNT = media.length;
//   const slides = Array.from(Array(SLIDE_COUNT).keys());

//   return (
//     <ImageCorosal
//       slides={slides}
//       mediaByIndex={mediaByIndex}
//       width={200}
//       height={200}
//     />
//   );
// }

// export default about;

// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
// } from "react-native-reanimated";
// import { View, Button } from "react-native";
// import React from "react";

// export default function AnimatedStyleUpdateExample(props) {
//   const randomWidth = useSharedValue(10);

//   const config = {
//     duration: 500,
//     easing: Easing.bezier(0.5, 0.01, 0, 1),
//   };

//   const style = useAnimatedStyle(() => {
//     return {
//       width: withTiming(randomWidth.value, config),
//     };
//   });

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "column",
//       }}
//     >
//       <Animated.View
//         style={[
//           { width: 100, height: 80, backgroundColor: "black", margin: 30 },
//           style,
//         ]}
//       />
//       <Button
//         title="toggle"
//         onPress={() => {
//           randomWidth.value = Math.random() * 350;
//         }}
//       />
//     </View>
//   );
// }

// import React from "react";

// function about() {
//   return <div>about</div>;
// }

// export default about;
