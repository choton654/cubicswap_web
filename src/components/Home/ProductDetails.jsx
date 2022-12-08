import { Box, Flex, HStack, Pressable, Text } from "native-base";
import router from "next/router";
import React from "react";
import NextImage from "next/image";
import { accentColor } from "../../Constant/color";
// import Carousel from "react-elastic-carousel";
// import { TouchableOpacity } from "react-native";
// import { accentColor, primaryColor } from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import WishlistIcon from "../Wishlist/WishlistIcon";
import { Image } from "react-native-elements";

function ProductDetails({ p }) {
  const { show } = ScreenState();

  // console.log(p.images[0]);

  return (
    <Pressable
      flex={1}
      w='full'
      h='full'
      position='relative'
      // borderColor='secondary.600'
      // borderWidth='1px'
      // m={"2"}
      // m={["2", "4"]}
      // borderRadius={["sm", "md"]}
      // rounded={hover && "md"}
      // shadow={hover && "5"}
      onPress={() => router.push(`/product/${p._id}`)}
      // onHoverIn={() => sethover(true)}
      // onHoverOut={() => sethover(false)}
    >
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            style={{
              transform: [
                {
                  scale: isPressed ? 0.95 : 1,
                  scale: isHovered ? 0.95 : 1,
                },
              ],
            }}>
            <Image
              source={{ uri: p?.images[0] }}
              resizeMode='contain'
              containerStyle={{
                width: "100%",
                height: "200px",
              }}
              // resizeMode='contain'
              // rounded={"sm"}
              // w={"full"}
              // h={"200"}
              alt={`pic-${p?.name}`}
            />

            <Box p={["2", "4"]}>
              <Box h={"63px"}>
                {show ? (
                  <Text fontWeight='500' color={"secondary.700"} textTransform='uppercase' fontSize='14px'>
                    {p?.name?.length < 70 ? p?.name : p?.name.slice(0, 70) + `...`}
                  </Text>
                ) : (
                  <Text fontWeight='500' color={"secondary.700"} textTransform='uppercase' fontSize='14px'>
                    {p?.name?.length < 40 ? p?.name : p?.name.slice(0, 40) + `...`}
                  </Text>
                )}
              </Box>
              <Box>
                <Text fontSize='.9rem'>
                  <Text fontWeight='500' color={"secondary.800"}>
                    {p?.minOrder} {p?.minOrder === 1 ? `Piece` : `Pieces`}
                  </Text>{" "}
                  <Text fontSize='11px' color={"secondary.700"}>
                    {` (MOQ)`}
                  </Text>
                </Text>
              </Box>
              <Flex justifyContent='space-between' direction='row'>
                <Text fontSize='.8rem' fontWeight='700' color={"secondary.800"}>
                  ₹ {p?.price}
                </Text>
                <HStack space={2}>
                  {/* <Flex direction='row'>
                    <Box>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='20px'
                        viewBox='0 0 24 24'
                        width='24px'
                        fill={accentColor}>
                        <path d='M0 0h24v24H0z' fill='none' />
                        <path d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z' />
                      </svg>
                    </Box>
                    <Text ml={"5px"}>{p?.views?.length || 0}</Text>
                  </Flex> */}
                  <Box
                    // position='absolute'
                    // right={5}
                    // top={5}
                    // bottom={5}
                    w={25}
                    h={25}
                    borderRadius={18}
                    borderWidth={1}
                    borderColor={"secondary.600"}
                    bg={"secondary.500"}
                    justifyContent='center'
                    alignItems='center'
                    // flex={1}
                  >
                    <WishlistIcon product={p} size={15} />
                  </Box>
                </HStack>
              </Flex>
            </Box>
          </Box>
        );
      }}
    </Pressable>
  );
}
export default ProductDetails;

{
  /* <Image
              source={{ uri: p?.images[0] }}
              resizeMode='contain'
              rounded={"sm"}
              w={"full"}
              h={"200"}
              alt={`pic-${p?.name}`}
            /> */
}

// const {
//   state: {
//     isAuthenticated,
//     user: { role },
//   },
// } = UserState();

// const carouselref = useRef(null);

// const [hover, sethover] = React.useState(false);

{
  /* <Box>
  <NextImage
    src={p?.images[0]?.split("https://res.cloudinary.com/choton/image/upload/")[1]}
    layout='intrinsic'
    alt={"pic"}
    objectFit='contain'
    objectPosition='center'
    width={"100%"}
    priority
    height={"100%"}
    placeholder='blur'
    blurDataURL='/img/20x20-7171497f.png'
  />
</Box>; */
}

// {isAuthenticated && role === "user" && (
// 					)}

// <Carousel
//             ref={carouselref}
//             pagination={show ? hover && true : true}
//             enableAutoPlay={hover}
//             enableSwipe={show ? false : true}
//             autoPlaySpeed={1000}
//             itemsToShow={1}
//             itemsToScroll={1}
//             showArrows={false}
//             itemPosition={"START"}
//             onChange={(currentItemObject, currentPageIndex) => {
//               if (show && currentPageIndex === 3) {
//                 carouselref.current.goTo(0);
//               }
//             }}
//             renderPagination={({ pages, activePage, onClick }) => {
//               return (
//                 <Flex direction="row" mt="1">
//                   {pages.map((page) => {
//                     const isActivePage = activePage === page;
//                     return (
//                       <TouchableOpacity
//                         key={page}
//                         onPress={() => onClick(page)}
//                         disabled={!isActivePage}
//                       >
//                         <Box
//                           mx="1"
//                           rounded="full"
//                           w="1.5"
//                           h="1.5"
//                           bg={isActivePage ? accentColor : primaryColor}
//                         ></Box>
//                       </TouchableOpacity>
//                     );
//                   })}
//                 </Flex>
//               );
//             }}
//           >
//             {p?.images?.slice(0, 4)?.map((img, idx) => (
//               <Box key={idx} w="full" h="full">
//                 <NextImage
//                   src={
//                     img.split(
//                       "https://res.cloudinary.com/choton/image/upload/"
//                     )[1]
//                   }
//                   layout="intrinsic"
//                   alt={"pic"}
//                   objectFit="contain"
//                   objectPosition="center"
//                   width={250}
//                   priority
//                   height={250}
//                   placeholder="blur"
//                   blurDataURL="/img/20x20-7171497f.png"
//                 />
//               </Box>
//             ))}
//           </Carousel>
// const styles = useMemo(
//   () =>
//     StyleSheet.create({
//       outer: {
//         flex: 1,
//         alignSelf: "baseline",
//         border: "1px solid rgba(39, 39, 39,.08)",
//         // maxHeight: "325px",
//         // margin: show ? 5 : 2.5,
//         // borderRadius: 8,
//         position: "relative",
//         width: "100%",
//         height: "100%",
//         // shadowColor: "#ddd",
//         // shadowOpacity: 5,
//         // shadowRadius: 5,
//         // shadowOffset: { height: 1, width: 1 },
//       },
//       box: {
//         overflow: "hidden",
//         // border: "1px solid #e6e6e6",
//         borderRadius: "4px",
//         transform: "translate3d(0,0,0)",
//         flexDirection: "column",
//         height: "100%",
//         justifyContent: "space-between",
//       },
//       box1: {
//         justifyContent: "center",
//         alignItems: "center",
//         overflow: "hidden",
//         position: "relative",
//       },
//       box2: {
//         position: "relative",
//         backgroundColor: "#fff",
//         overflow: "hidden",
//         alignItems: "center",
//         // flex: 1,
//         justifyContent: "center",
//       },

//       bbox: {
//         padding: 6,
//         // paddingVertical: 6,
//         alignItems: "center",
//         // maxHeight: "72px",
//         // flex: 1,
//       },
//       bbox1: {
//         alignItems: "center",
//       },
//       font1: {
//         fontWeight: "500",
//         textTransform: "uppercase",
//         color: "rgb(113, 113, 113)",
//         fontSize: "13px",
//       },
//       fontP: {
//         fontSize: ".8rem",
//         color: accentColor,
//         fontWeight: "700",
//       },
//       fontb: { fontSize: ".9rem" },
//     }),
//   []
// );

{
  /* <TouchableOpacity
      style={styles.outer}
      onPress={() => router.push(`/product/${p._id}`)}
    >
      <View style={styles.box}>
        <View style={styles.box1}>
          <View style={styles.box2}>
            {p && (
              <NextImage
                src={
                  p.images[0].split(
                    "https://res.cloudinary.com/choton/image/upload/"
                  )[1]
                }
                layout="intrinsic"
                alt={"pic"}
                objectFit="contain"
                objectPosition="center"
                width={250}
                priority
                height={250}
                placeholder="blur"
                blurDataURL="/img/20x20-7171497f.png"
              />
            )}
          </View>
        </View>

        <View
          style={{
            padding: show ? 12 : 6,
            gridGap: 3,
            justifyContent: "flex-start",
            // alignItems: "center",
            // paddingHorizontal: 6,
            flex: 1,
            width: "100%",
          }}
        >
          <View
            style={{
              flex: 1,
              // flexDirection: "row",
              justifyContent: "flex-start",
              // alignItems: "center",
              // gridGap: 5,
              width: "100%",
            }}
          >
            {show ? (
              <Text style={styles.font1}>
                {p?.name?.length < 70 ? p?.name : p?.name.slice(0, 70) + `...`}
              </Text>
            ) : (
              <Text style={styles.font1}>
                {p?.name?.length < 40 ? p?.name : p?.name.slice(0, 40) + `...`}
              </Text>
            )}
          </View>
          <Text style={styles.fontb}>
            <Text style={{ fontWeight: "500", color: accentColor }}>
              {p?.minOrder} {p?.minOrder === 1 ? `Piece` : `Pieces`}
            </Text>{" "}
            <Text style={{ fontSize: "11px", color: "rgb(113, 113, 113)" }}>
              {` (MOQ)`}
            </Text>
          </Text>

          <View style={{}}>
            <Text style={styles.fontP}>₹ {p?.price}</Text>
          </View>
        </View>
      </View>
      {isAuthenticated && role === "user" && (
        <View
          style={{
            position: "absolute",
            right: 5,
            top: 8,
            width: 25,
            height: 25,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: lightText,
            backgroundColor: textColor,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <WishlistIcon
            product={p}
            addWishlistMutation={addWishlistMutation}
            removeFromWishlistMutation={removeFromWishlistMutation}
            size={15}
          />
        </View>
      )}
    </TouchableOpacity> */
}

//  <Image
//               source={{ uri: p.images[0] }}
//               resizeMode="contain"
//               style={styles.img}
//             />
