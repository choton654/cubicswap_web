import { useEmblaCarousel } from "embla-carousel/react";
import { Box, Flex, HStack, Icon, Pressable, Text, VStack } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Image } from "react-native-elements/dist/image/Image";
import { MapInteraction, MapInteractionCSS } from "react-map-interaction";
// import { accentColor, primaryColor } from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const EmblaCarousel = ({ slides, mediaByIndex, width, height, toggleOverlay, overlay, shwTabs, notShow }) => {
  const { screenWidth, show, selectedIndex, setSelectedIndex } = ScreenState();

  const [mainViewportRef, embla] = useEmblaCarousel({
    skipSnaps: false,
    dragFree: false,
    draggable: !overlay,
    startIndex: selectedIndex,
  });
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    // draggable: false,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  // const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  // const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onThumbClick = useCallback(
    index => {
      if (!embla || !emblaThumbs) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    if (slides) {
      embla.reInit({ skipSnaps: false });
      // setSelectedIndex(0);
      onSelect();
      embla.on("select", onSelect);
    }
    onSelect();
    embla.on("select", onSelect);

    return () => {
      if (!overlay) {
        setSelectedIndex(0);
      }
    };
  }, [embla, onSelect, overlay, setSelectedIndex, slides]);

  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      h={overlay ? (show ? "80vh" : "50vh") : "full"}
      maxW={show ? "100%" : screenWidth}
      position={"relative"}>
      <Box maxW={show ? "100%" : screenWidth} mx={"auto"} p={"10px"}>
        <Box flex={1} overflow={"hidden"} w={"100%"} position={"relative"} ref={mainViewportRef}>
          <Flex direction='row'>
            {slides.map(index => (
              <Box key={index}>
                <Pressable
                  // onPress={toggleOverlay}
                  justifyContent={"center"}
                  alignItems={"center"}
                  w={"100%"}
                  h={"100%"}>
                  {overlay ? (
                    <MapInteractionCSS minScale={1} maxScale={5}>
                      <Image
                        source={{ uri: mediaByIndex(index) }}
                        resizeMode='contain'
                        style={{
                          width,
                          height,
                        }}
                        transition
                        alt='pic'
                      />
                    </MapInteractionCSS>
                  ) : (
                    <Image
                      source={{ uri: mediaByIndex(index) }}
                      resizeMode='contain'
                      style={{
                        width,
                        height,
                      }}
                      transition
                      alt='pic'
                    />
                  )}
                </Pressable>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
      {notShow && !overlay && (
        <Pressable flexDirection={"row"} onPress={toggleOverlay}>
          <Box>
            <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#bbb'>
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm.5-7H9v2H7v1h2v2h1v-2h2V9h-2z' />
            </svg>
          </Box>
          <Text>View larger image</Text>
        </Pressable>
      )}

      {overlay &&
        (show ? (
          <HStack space={"2"} style={{ justifyContent: "center", alignItems: "center" }}>
            <Icon name='close-fullscreen' as={MaterialIcons} size={"lg"} />
            <Text>{"Scroll to zoom"}</Text>
          </HStack>
        ) : (
          <HStack space={"2"} style={{ justifyContent: "center", alignItems: "center" }}>
            <Icon name='gesture-pinch' as={MaterialCommunityIcons} size={"lg"} />
            <Text>{"Pinch to zoom"}</Text>
          </HStack>
        ))}
      {!shwTabs && (
        <View
          style={{
            maxWidth: show ? "100%" : screenWidth,
            marginHorizontal: "auto",
            padding: 10,
            // position: overlay && "absolute",
            // bottom: overlay && 5,
          }}>
          <View style={{ width: "100%" }} ref={thumbViewportRef}>
            <TouchableOpacity style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
              {slides.map(index => (
                <Thumb
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  imgSrc={mediaByIndex(index)}
                  key={index}
                />
              ))}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Box>
  );
};

const Thumb = ({ selected, onClick, imgSrc }) => (
  <View style={{ margin: 5 }}>
    <TouchableOpacity onPress={onClick} style={{ opacity: selected ? 1 : 0.3 }}>
      <Image
        source={{ uri: imgSrc }}
        resizeMode='contain'
        style={{
          width: 50,
          height: 50,
        }}
        transition
        alt='pic'
      />
    </TouchableOpacity>
  </View>
);

export default EmblaCarousel;

//  {
//    overlay && (
//      <Box flexDirection='row' justifyContent='space-between' position='absolute' bottom='50%' width='full'>
//        <Button
//          colorScheme='secondary.700'
//          justifyContent={"center"}
//          alignItems={"center"}
//          onPress={scrollPrev}
//          rounded={"full"}
//          disabled={!prevBtnEnabled}>
//          <Box bg={accentColor} rounded={"full"}>
//            <svg
//              xmlns='http://www.w3.org/2000/svg'
//              enableBackground='new 0 0 24 24'
//              height='24px'
//              viewBox='0 0 24 24'
//              width='24px'
//              fill={primaryColor}>
//              <g>
//                <rect fill='none' height='24' width='24' />
//              </g>
//              <g>
//                <path d='M2,12c0,5.52,4.48,10,10,10c5.52,0,10-4.48,10-10S17.52,2,12,2C6.48,2,2,6.48,2,12z M20,12c0,4.42-3.58,8-8,8 c-4.42,0-8-3.58-8-8s3.58-8,8-8C16.42,4,20,7.58,20,12z M8,12l4-4l1.41,1.41L11.83,11H16v2h-4.17l1.59,1.59L12,16L8,12z' />
//              </g>
//            </svg>
//          </Box>
//        </Button>

//        <Button
//          colorScheme='secondary.700'
//          justifyContent={"center"}
//          alignItems={"center"}
//          onPress={scrollNext}
//          rounded={"full"}
//          disabled={!nextBtnEnabled}>
//          <Box bg={accentColor} rounded={"full"}>
//            <svg
//              xmlns='http://www.w3.org/2000/svg'
//              enableBackground='new 0 0 24 24'
//              height='24px'
//              viewBox='0 0 24 24'
//              width='24px'
//              fill={primaryColor}>
//              <g>
//                <rect fill='none' height='24' width='24' />
//              </g>
//              <g>
//                <path d='M22,12c0-5.52-4.48-10-10-10C6.48,2,2,6.48,2,12s4.48,10,10,10C17.52,22,22,17.52,22,12z M4,12c0-4.42,3.58-8,8-8 c4.42,0,8,3.58,8,8s-3.58,8-8,8C7.58,20,4,16.42,4,12z M16,12l-4,4l-1.41-1.41L12.17,13H8v-2h4.17l-1.59-1.59L12,8L16,12z' />
//              </g>
//            </svg>
//          </Box>
//        </Button>
//      </Box>
//    );
//  }

// const styles = StyleSheet.create({
//   a: {
//     justifyContent: "center",
//     alignItems: "center",
//     opacity: 0.6,
//     borderRadius: "50%",
//     backgroundColor: textColor,
//     borderColor: accentColor,
//     borderWidth: 2,
//     flexDirection: "row",
//   },
//   b: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     position: "absolute",
//     bottom: "50%",
//     width: "100%",
//   },
//   c: {
//     backgroundColor: lightAccentColor,
//     borderRadius: "50%",
//     borderColor: lightText,
//     borderWidth: 2,
//   },
// });

{
  /* <Icon
                  name="chevron-right"
                  type="material"
                  size={30}
                  onPress={scrollNext}
                  color={!nextBtnEnabled ? lightText : accentColor}
                  disabled={!nextBtnEnabled}
                  disabledStyle={styles.c}
                  style={[
                    styles.a,
                    {
                      display: !nextBtnEnabled ? "none" : "flex",
                    },
                  ]}
                /> */
}

// <TouchableOpacity>
//   <Icon
//     name="chevron-left"
//     type="material"
//     onPress={scrollPrev}
//     size={30}
//     color={!prevBtnEnabled ? lightText : accentColor}
//     disabled={!prevBtnEnabled}
//     disabledStyle={styles.c}
//     style={[
//       styles.a,
//       {
//         display: !prevBtnEnabled ? "none" : "flex",
//       },
//     ]}
//   />
// </TouchableOpacity>;

{
  /* <TransformWrapper>
                      <TransformComponent>
                      </TransformComponent>
                    </TransformWrapper> */
}
