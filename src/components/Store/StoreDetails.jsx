import { Box, Button, IconButton } from "native-base";
import NextImage from "next/image";
import React, { useState } from "react";
import Carousel, { consts } from "react-elastic-carousel";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Overlay } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { ScreenState } from "../../context/state/screenState";
import Footer from "../Layout/Footer";
import StoreContent from "./StoreContent";
const { width, height } = Dimensions.get("window");

function StoreDetails({ store }) {
  const [visible, setVisible] = useState(false);
  const { show, screenHeight, screenWidth } = ScreenState();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? <Text>👈</Text> : <Text>👉</Text>;
    return (
      <>
        {show && (
          <Button
            colorScheme='secondary.700'
            mt='10%'
            h='30px'
            mx='10px'
            bg='#eee'
            justifyContent='center'
            alignItems='center'
            _pressed={{ bg: "#eee" }}
            _hover={{ bg: "#ccc", rounded: "md" }}
            onPress={onClick}
            disabled={isEdge}>
            {pointer}
          </Button>
        )}
      </>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        maxHeight: !show ? screenHeight - 162 : screenHeight - 106,
        backgroundColor: "#fff",
        color: "rgb(39, 39, 39)",
      }}>
      {store?.images && (
        <View style={{ paddingTop: 5 }}>
          <Carousel renderArrow={myArrow} pagination={false}>
            {store?.images.map((item, idx) => (
              <View style={styles.g} key={idx}>
                <NextImage
                  src={item.split("https://res.cloudinary.com/choton/image/upload/")[1]}
                  blurDataURL='/img/20x20-7171497f.png'
                  layout='intrinsic'
                  alt={"pic"}
                  objectFit='contain'
                  objectPosition='center'
                  width={screenWidth}
                  priority
                  height={screenHeight / 3}
                  placeholder='blur'
                />
                <Text style={{ color: "rgb(39,39,39)" }}>
                  {idx + 1}/{store?.images.length}
                </Text>
              </View>
            ))}
          </Carousel>
        </View>
      )}

      <StoreContent store={store} />

      <View>
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          fullScreen
          overlayStyle={{
            paddingHorizontal: 0,
            backgroundColor: "#fff",
          }}>
          <View style={{ backgroundColor: "#fff" }}>
            <Text style={{ textAlign: "center" }} onPress={toggleOverlay}>
              <Icon name='cancel' type='material' color='rgb(39,39,39)' />
            </Text>

            <Box flex={1} justifyContent='center' alignItems='center'>
              <Carousel>
                {store?.images.map((item, idx) => (
                  <Box key={idx}>
                    <NextImage
                      src={item.split("https://res.cloudinary.com/choton/image/upload/")[1]}
                      blurDataURL='/img/20x20-7171497f.png'
                      layout='intrinsic'
                      alt={"pic"}
                      objectFit='contain'
                      objectPosition='center'
                      width={screenWidth}
                      priority
                      height={screenHeight * 0.8}
                      placeholder='blur'
                    />
                    <Text style={{ color: "rgb(39,39,39)" }}>
                      {idx + 1}/{store?.images.length}
                    </Text>
                  </Box>
                ))}
              </Carousel>
            </Box>
          </View>
        </Overlay>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  f: {
    flex: 1,
    width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  a: {},
  g: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },
});

export default StoreDetails;

//  <FlatList
//    data={store?.images}
//    keyExtractor={(_, idx) => idx.toString()}
//    horizontal
//    pagingEnabled
//    // showsHorizontalScrollIndicator={false}
//    scrollEventThrottle={10}
//    renderItem={({ item, index }) => (
//      <StoreImage
//        item={item}
//        index={index}
//        images={store?.images}
//        toggleOverlay={toggleOverlay}
//      />
//    )}
//  />;

//  <FlatList
//    data={store?.images}
//    keyExtractor={(_, idx) => idx.toString()}
//    horizontal
//    pagingEnabled
//    scrollEventThrottle={10}
//    renderItem={({ item, index }) => (
//      <View style={styles.g}>
//        <NextImage
//          src={
//            item.split("https://res.cloudinary.com/choton/image/upload/")[1]
//          }
//          blurDataURL="/img/20x20-7171497f.png"
//          layout="intrinsic"
//          alt={"pic"}
//          objectFit="contain"
//          objectPosition="center"
//          width={screenWidth}
//          priority
//          height={screenHeight * 0.8}
//          placeholder="blur"
//        />
//        <Text style={{ color: "rgb(39,39,39)" }}>
//          {index + 1}/{store?.images.length}
//        </Text>
//      </View>
//    )}
//  />;
