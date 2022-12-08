// import { Modal } from "native-base";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View, Modal } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Overlay } from "react-native-elements/dist/overlay/Overlay";
import { ScreenState } from "../../context/state/screenState";
import NewImage from "./NewImage";

function ImageOverlay({ images, toggleOverlay, visible, overlay }) {
  const { screenWidth, screenHeight, show } = ScreenState();

  return (
    <Overlay
      // fullScreen
      animationType='fade'
      isVisible={visible}
      // ModalComponent={Modal}
      onBackdropPress={toggleOverlay}
      overlayStyle={{
        paddingHorizontal: 0,
        height: show ? screenHeight - 56 : screenHeight - 112,
        maxWidth: screenWidth,
        width: screenWidth,
        marginTop: 56,
        marginBottom: show ? 0 : 56,
        // margin: "auto",
      }}>
      <TouchableOpacity onPress={toggleOverlay} style={{ position: "absolute", top: 10, right: 10, zIndex: 100 }}>
        <Text>
          <Icon name='close' type='material' size={30} />
        </Text>
      </TouchableOpacity>

      <ScrollView>
        <NewImage
          overlay={overlay}
          toggleOverlay={() => null}
          images={images}
          width={screenWidth}
          height={screenHeight * 0.8}
        />
      </ScrollView>
    </Overlay>
  );
}

export default ImageOverlay;

// <Actionsheet
//       isOpen={visible}
//       onClose={toggleOverlay}
//       maxW={screenWidth}
//       w={screenWidth}
//       mx={"auto"}
//       hideDragIndicator>
//       <Actionsheet.Content></Actionsheet.Content>
//  </Actionsheet>

//  <FlatList
//    data={images}
//    keyExtractor={(_, idx) => idx.toString()}
//    horizontal
//    pagingEnabled
//    scrollEventThrottle={32}
//    showsHorizontalScrollIndicator={false}
//    // onScroll={Animated.event(
//    //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//    //   { useNativeDriver: false }
//    // )}
//    renderItem={({ item, index }) => (
//      <View>
//        <SingleImage item={item} overlay />
//        <Indicator images={images} index={index} scrollX={scrollX} />
//      </View>
//    )}
//  />;
