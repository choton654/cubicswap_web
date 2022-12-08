import NextImage from "next/image";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ScreenState } from "../../context/state/screenState";

const StoreImage = ({ item, index, images, toggleOverlay, flist }) => {
  const { screenWidth, screenHeight } = ScreenState();

  return (
    <View>
      <TouchableOpacity style={styles.f} onPress={toggleOverlay}>
        <NextImage
          src={item.split("https://res.cloudinary.com/choton/image/upload/")[1]}
          layout="intrinsic"
          alt={"pic"}
          objectFit="contain"
          objectPosition="center"
          width={screenWidth}
          priority
          height={screenHeight / 3}
          placeholder="blur"
          blurDataURL="/img/20x20-7171497f.png"
        />
      </TouchableOpacity>
    </View>
  );
};

export default StoreImage;

const styles = StyleSheet.create({
  f: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

{
  /* <Text>
          {index + 1}/{images.length}
        </Text> */
}

//  <TouchableOpacity style={{ flexDirection: "row", gridGap: 10 }}>
//    <Text onPress={() => {}}>{"<"}</Text>
//    <Text onPress={() => {}}>{">"}</Text>
//  </TouchableOpacity>;
