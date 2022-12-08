import { Box, Link, Pressable, Text } from "native-base";
import router from "next/router";
import React from "react";
import { Icon, ListItem } from "react-native-elements";
import { accentColor, lightPrimaryColor, linkColor, primaryColor } from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";

function CatAccordin({ title, desc, mid }) {
  // const { isOpen, onOpen, onClose, onToggle } = useDisclose();

  const [expanded, setExpanded] = React.useState(false);

  // useEffect(() => {
  //   if (expanded) {
  //     onOpen();
  //   } else {
  //     onClose();
  //   }
  // }, [expanded, onClose, onOpen]);

  const handlePress = () => setExpanded(!expanded);

  const { show } = ScreenState();

  return (
    <Box my={["2", "2", "0"]}>
      <Pressable
        flexDirection='row'
        // bg={show ? accentColor : "#d4d4d4"}
        bg={accentColor}
        justifyContent='space-between'
        alignItems='center'
        onPress={() => {
          if (mid) {
            router.push(`/categories/${title._id}`);
          } else {
            handlePress();
          }
        }}
        // onHoverIn={() => setExpanded(true)}
        // onHoverOut={() => setExpanded(false)}
      >
        <ListItem
          style={{ width: "100%", margin: 0 }}
          containerStyle={{
            padding: 10,
            marginHorizontal: 10,
            marginVertical: 5,
            backgroundColor: primaryColor,
            margin: 0,
            // backgroundColor: show ? primaryColor : "#d4d4d4",
            borderRadius: 5,
          }}>
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: 500, color: accentColor }}>
              <Link
                isUnderlined
                fontWeight={500}
                fontSize={"15px"}
                _hover={{ _text: { color: linkColor } }}
                onPress={() =>
                  router.push(
                    mid
                      ? `/categories/${title._id}`
                      : title.hasProduct
                      ? `/categories/${title._id}`
                      : `/categories/allCategories/mid/${title._id}`
                  )
                }>
                {title.name}
              </Link>
            </ListItem.Title>
          </ListItem.Content>
          {!mid && (
            <Icon
              color={accentColor}
              style={{
                marginLeft: "auto",
              }}
              type='material'
              name={!expanded ? "expand-more" : "expand-less"}
              // onPress={handlePress}
            />
          )}
        </ListItem>
      </Pressable>
      {expanded && (
        <Box my={show ? "0" : "2"}>
          {desc.map((d, i) => (
            <Pressable
              key={i}
              onPress={() => router.push(`/categories/${d._id}`)}
              // bg={show ? accentColor : "#fff"}
              bg={accentColor}
              rounded='sm'
              _pressed={{
                bg: !show && primaryColor,
                _text: {
                  color: !show && accentColor,
                },
              }}
              // my="2"
            >
              <Text
                padding={2}
                mx={4}
                fontWeight={500}
                fontSize={"14px"}
                // color={show ? primaryColor : accentColor}
                color={primaryColor}
                _hover={{ bg: lightPrimaryColor, color: accentColor }}>
                {d.name}
              </Text>
            </Pressable>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default CatAccordin;

// <ListItem.Subtitle>{d.name}</ListItem.Subtitle>
//               <Drawer.Item
//                 style={{ backgroundColor: primaryColor }}
//                 label={d.name}
//                 onPress={() => router.push(`/categories/${d._id}`)}
//               />

//  <Text
//    style={{
//      fontSize: 15,
//      fontWeight: 500,
//      color: linkColor,
//    }}
//  >
//    {title.name}
//  </Text>;

//  <TouchableOpacity
//    style={{
//      justifyContent: "flex-start",
//      alignItems: "flex-start",
//      padding: 10,
//    }}
//  >
//    <Text
//      style={{
//        fontSize: 15,
//        fontWeight: "500",
//      }}
//    >
//      {title}
//    </Text>
//  </TouchableOpacity>;

//    <List.Accordion
//       title={title}
//       descriptionStyle={{ paddingLeft: 10 }}
//       expanded={expanded}
//       onPress={handlePress}
//       descriptionNumberOfLines={5}
//       style={{
//         padding: 10,
//         backgroundColor: textColor,
//         maxHeight: 40,
//         justifyContent: "center",
//         alignItems: "stretch",
//       }}
//       titleStyle={{ fontWeight: "700", fontSize: 15, color: accentColor }}
//       right={(props) => (
//         <List.Icon
//           {...props}
//           icon={!expanded ? "plus" : "minus"}
//           color={accentColor}
//         />
//       )}
//     >
//   {desc.map((d, i) => (
//     <List.Item
//       key={i}
//       title={d.name}
//       titleStyle={{ marginLeft: 20, color: "#000", fontSize: 15 }}
//     />
//   ))}
//     </List.Accordion>

// <TouchableOpacity
//   // style={{ flexBasis: "90%", height: "100%" }}
// onPress={() =>
//   router.push(
//     title.hasProduct
//       ? `/categories/${title._id}`
//       : `/categories/allCategories/mid/${title._id}`
//   )
// }
// >
//   <Drawer.Item
//     style={{ backgroundColor: accentColor }}
//     label={title.name}
//     onPress={() =>
//       router.push(
//         title.hasProduct
//           ? `/categories/${title._id}`
//           : `/categories/allCategories/mid/${title._id}`
//       )
//     }
//   />
// </TouchableOpacity>;
