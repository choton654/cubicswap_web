import { useEmblaCarousel } from "embla-carousel/react";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Image } from "react-native-elements";
import {
  accentColor,
  lightAccentColor,
  lightText,
  textColor,
} from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import { useRecursiveTimeout } from "../../utils/useRecursiveTimeout";

const Slider = ({ slides, mediaByIndex }) => {
  const { screenWidth, show, screenHeight } = ScreenState();

  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const autoplay = useCallback(() => {
    if (!embla) return;
    if (embla.canScrollNext()) {
      embla.scrollNext();
    } else {
      embla.scrollTo(0);
    }
  }, [embla]);

  const { play, stop } = useRecursiveTimeout(autoplay, 3000);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    play();
  }, [play]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    //   embla.on("pointerDown", stop);
  }, [embla, onSelect]);

  return (
    <View
      style={{
        maxWidth: show ? "100%" : screenWidth,
        marginHorizontal: "auto",
        padding: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          overflow: "hidden",
          width: "100%",
          position: "relative",
        }}
        ref={mainViewportRef}
      >
        <View style={{ flexDirection: "row" }}>
          {slides.map((index) => (
            <View key={index}>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  source={{ uri: mediaByIndex(index).url }}
                  resizeMode="contain"
                  style={{
                    width: screenWidth * 0.9,
                    height: screenHeight * 0.3,
                  }}
                  transition
                  alt="pic"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  a: {
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.6,
    borderRadius: "50%",
    backgroundColor: textColor,
    borderColor: accentColor,
    borderWidth: 2,
    flexDirection: "row",
  },
  b: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: "50%",
    width: "100%",
  },
  c: {
    backgroundColor: lightAccentColor,
    borderRadius: "50%",
    borderColor: lightText,
    borderWidth: 2,
  },
});

// <View style={styles.b}>
//   <TouchableOpacity>
//     <Icon
//       name="chevron-left"
//       type="material"
//       onPress={scrollPrev}
//       size={30}
//       color={!prevBtnEnabled ? lightText : accentColor}
//       disabled={!prevBtnEnabled}
//       disabledStyle={styles.c}
//       style={[
//         styles.a,
//         {
//           display: !prevBtnEnabled ? "none" : "flex",
//         },
//       ]}
//     />
//   </TouchableOpacity>
//   <TouchableOpacity>
//     <Icon
//       name="chevron-right"
//       type="material"
//       size={30}
//       onPress={scrollNext}
//       color={!nextBtnEnabled ? lightText : accentColor}
//       disabled={!nextBtnEnabled}
//       disabledStyle={styles.c}
//       style={[
//         styles.a,
//         {
//           display: !nextBtnEnabled ? "none" : "flex",
//         },
//       ]}
//     />
//   </TouchableOpacity>
// </View>;

// import { keyframes } from "@chakra-ui/system";
// import React, { useEffect, useRef, useState } from "react";
// import { TouchableOpacity, View } from "react-native";
// import { Card } from "react-native-paper";

// export const bannerImages = [
//   {
//     show: "block",
//     url: "https://images-eu.ssl-images-amazon.com/images/G/31/img20/PC/Mayactivation/Accessoriesday1/D23140543_IN_CEPC_Electronicsaccessories_underRs999_1242x450._CB669031984_SY300_FMwebp_.jpg",
//   },
//   {
//     show: "none",
//     url: "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/OPPO/A74/17990_WOBO/V348719848_IN_WLD_OPPO_A74_Mob_Hero_1242x450._CB669473435_SY300_FMwebp_.jpg",
//   },
//   {
//     show: "none",
//     url: "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Samsung/SamsungM/Family/8thMay/D20729242_IN_WLME_SamsungM_Family_Mob_1242x450_1.1._CB669478640_SY300_FMwebp_.jpg",
//   },
//   {
//     show: "none",
//     url: "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Xiaomi/RedmiNote10S/Teaser/Set2/D23007216_WLD_Xiaomi_RedmiNote10S_NewLaunch_mobhero_1242x450._CB669093425_SY300_FMwebp_.jpg",
//   },
//   {
//     show: "none",
//     url: "https://images-eu.ssl-images-amazon.com/images/G/31/img20/Sports/2021/Sports_Gear_1242x450._CB658074318_SY300_FMwebp_.jpg",
//   },
// ];

// const fadeIn = keyframes`
// 0% { opacity:0; }
// 100% { opacity:1; }
// `;

// function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   // Remember the latest function.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

// function Slider() {
//   const [value, setValue] = useState(1);
//   const [delay, setDelay] = useState(3000);

//   const handleChange = (e) => {
//     if (e.target.id === "+") {
//       value === 4 ? setValue(0) : setValue(value + 1);
//       arr.map((i) => {
//         return (i.show = "none");
//       });
//       arr[value].show = "block";
//     } else {
//       //(value - 1);
//       if (value - 1 === -1) {
//         setValue(4);
//       } else {
//         setValue(value - 1);
//       }
//       arr.map((i) => {
//         return (i.show = "none");
//       });
//       arr[value].show = "block";
//     }
//   };
//   useInterval(() => {
//     // Your custom logic here
//     value === 4 ? setValue(1) : setValue(value + 1);
//     arr.map((i) => {
//       return (i.show = "none");
//     });
//     arr[value].show = "block";
//   }, delay);
//   return (
//     <View>
//       <View style={{ position: "relative", margin: "auto" }}>
//         {arr.map((im, i) => (
//           <Card.Cover
//             key={i}
//             source={{ uri: `${im.url}` }}
//             style={{ maxWidth: "100%", display: im.show }}
//           />
//         ))}
//       </View>

//       <View
//         style={{
//           justifyContent: "space-between",
//           position: "relative",
//           bottom: "45%",
//           paddingHorizontal: "7px",
//         }}
//       >
//         <TouchableOpacity
//           onPress={handleChange}
//           style={{
//             padding: "16px",
//             backgroundColor: "rgba(0,0,0,0.8)",
//           }}
//         >
//           &#10094;
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={handleChange}
//           style={{
//             padding: "16px",
//             backgroundColor: "rgba(0,0,0,0.8)",
//           }}
//         >
//           &#10094;
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// export default Slider;
// {
//   /* <Image
//             key={i}
//             // className="mySlides"
//             src={im.url}
//             width="100%"
//             display={im.show}
//             animation={`${fadeIn} ease 3s`}
//             verticalAlign="middle"
//           /> */
// }

// {
//   /* <Box
//           _hover={{ cursor: "pointer", backgroundColor: "rgba(0,0,0,0.8)" }}
//           className="prev"
//           onClick={handleChange}
//           padding="16px"
//           color="white"
//           fontWeight="bold"
//           fontSize="18px"
//           transition="0.6s ease"
//           w="auto"
//           borderRadius="0 3px 3px 0"
//           userSelect="none"
//         >
//           &#10094;
//         </Box>
//         <Box
//           _hover={{ cursor: "pointer", backgroundColor: "rgba(0,0,0,0.8)" }}
//           className="next"
//           onClick={handleChange}
//           padding="16px"
//           color="white"
//           fontWeight="bold"
//           fontSize="18px"
//           transition="0.6s ease"
//           w="auto"
//           borderRadius="0 3px 3px 0"
//           userSelect="none"
//         >
//           &#10095;
//         </Box> */
// }
