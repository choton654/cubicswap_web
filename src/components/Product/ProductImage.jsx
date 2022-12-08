import { UniqueTypeNamesRule } from "graphql";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScreenState } from "../../context/state/screenState";
import ImageOverlay from "./ImageOverlay";
import NewImage from "./NewImage";

function ProductImage({ product }) {
  const { screenWidth, screenHeight, show, md } = ScreenState();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        a: {
          // height: screenHeight * 0.6,
          backgroundColor: "#fff",
          justifyContent: "center",
          // flex: 1,
        },
      }),
    []
  );

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.a}>
      {product && (
        <>
          <NewImage
            overlay={false}
            images={product.images}
            toggleOverlay={toggleOverlay}
            width={show ? screenWidth * 0.5 : screenWidth * 0.95}
            height={show ? screenHeight * 0.5 : screenHeight * 0.55}
          />
          <ImageOverlay
            overlay={true}
            images={product.images}
            visible={visible}
            toggleOverlay={toggleOverlay}
            scrollX={scrollX}
          />
        </>
      )}
    </View>
  );
}

export default ProductImage;

// <View style={{ flex: 1, flexDirection: "row" }}>
//           <FlatList
//             data={product.images}
//             keyExtractor={(_, idx) => idx.toString()}
//             horizontal
//             pagingEnabled
//             scrollEventThrottle={32}
//             // getItemLayout={(data, index) => ({
//             //   length: product.images.length,
//             //   offset: product.images.length * index,
//             //   index,
//             // })}
//             showsHorizontalScrollIndicator={false}
//             initialNumToRender={1}
//             // onViewableItemsChanged={handleViewableItemsChanged.current}
//             // viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
//             // extraData={screenWidth}
//             // ref={flatlistRef}
//             // onScroll={Animated.event(
//             //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//             //   { useNativeDriver: false }
//             // )}
//             renderItem={({ item, index }) => (
//               <View style={{ flex: 1 }}>
//                 <SingleImage
//                   item={item}
//                   name={product?.name}
//                   toggleOverlay={toggleOverlay}
//                 />
//                 <Indicator
//                   images={product.images}
//                   index={index}
//                   scrollX={scrollX}
//                 />
//               </View>
//             )}
//           />
//         </View>

//  <View
//    style={{
//      flexDirection: "row",
//      justifyContent: "space-between",
//      position: "absolute",
//      top: "50%",
//      paddingHorizontal: 20,
//      width: "100%",
//    }}
//  >
//    <TouchableOpacity
//      onPress={handleBack}
//      style={{
//        flexDirection: "row",
//        alignItems: "center",
//        justifyContent: "center",
//        width: 60,
//        height: 60,
//        borderRadius: 30,
//        backgroundColor: primaryColor,
//      }}
//      activeOpacity={0.8}
//    >
//      <AntDesignIcons
//        name="left"
//        style={{ fontSize: 18, color: textColor, opacity: 0.3 }}
//      />
//      <AntDesignIcons
//        name="left"
//        style={{ fontSize: 25, color: textColor, marginLeft: -15 }}
//      />
//    </TouchableOpacity>

//    <TouchableOpacity
//      onPress={handleNext}
//      style={{
//        flexDirection: "row",
//        alignItems: "center",
//        justifyContent: "center",
//        width: 60,
//        height: 60,
//        borderRadius: 30,
//        backgroundColor: primaryColor,
//      }}
//      activeOpacity={0.8}
//    >
//      <AntDesignIcons
//        name="right"
//        style={{ fontSize: 18, color: textColor, opacity: 0.3 }}
//      />
//      <AntDesignIcons
//        name="right"
//        style={{ fontSize: 25, color: textColor, marginLeft: -15 }}
//      />
//    </TouchableOpacity>
//  </View>;

// const flatlistRef = useRef();
// const [currentPage, setCurrentPage] = useState(0);
// const [viewableItems, setViewableItems] = useState([]);

// const handleViewableItemsChanged = useRef(({ viewableItems }) => {
//   setViewableItems(viewableItems);
// });

// useEffect(() => {
//   if (!viewableItems[0] || currentPage === viewableItems[0].index) return;
//   setCurrentPage(viewableItems[0].index);
// }, [viewableItems, currentPage]);

// const handleNext = () => {
//   console.log("next", flatlistRef.current.scrollToIndex);
//   if (currentPage == product.images.length - 1) return;
//   flatlistRef.current.scrollToIndex({
//     animated: true,
//     index: currentPage + 1,
//     viewOffset: product.images.length,
//     viewPosition: product.images.length,
//   });
// };

// const handleBack = () => {
//   console.log("back");

//   if (currentPage == 0) return;
//   flatlistRef.current.scrollToIndex({
//     animated: true,
//     index: currentPage - 1,
//   });
// };
