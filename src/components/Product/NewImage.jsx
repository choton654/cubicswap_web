import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
// import { ScreenState } from "../../context/state/screenState";
import ImageCorosal from "./ImageCorosal";

const NewImage = ({ images, toggleOverlay, width, height, overlay }) => {
  // const { show } = ScreenState();

  const mediaByIndex = index => images[index % images.length];
  const SLIDE_COUNT = images.length;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <View style={{ marginVertical: 10 }}>
      <TouchableOpacity>
        <ImageCorosal
          overlay={overlay}
          slides={slides}
          mediaByIndex={mediaByIndex}
          toggleOverlay={toggleOverlay}
          width={width}
          height={height}
          notShow
        />
      </TouchableOpacity>
    </View>
  );
};

export default NewImage;

const styles = StyleSheet.create({});

// <Carousel
//   navButtonsAlwaysVisible={show}
//   autoPlay={false}
//   indicators
//   swipe
//   stopAutoPlayOnHover
//   animation="slide"
// >
//   {images &&
//     images.length > 0 &&
//     images.map((item, i) => (
//       <TouchableOpacity
//         key={i}
//         onPress={toggleOverlay}
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "#fff",
//         }}
//       >
//         <Image
//           source={{ uri: item }}
//           resizeMode="contain"
//           style={{
//             width,
//             height,
//           }}
//           transition
//           alt="pic"
//         />
//       </TouchableOpacity>
//     ))}
// </Carousel>;
