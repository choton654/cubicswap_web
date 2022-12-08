import { Badge, Flex, HStack, Pressable, VStack } from "native-base";
import router, { useRouter } from "next/router";
import React from "react";
import { View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { accentColor, primaryColor } from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import { UserState } from "../../context/state/userState";

function MyProdList({ storeId, item }) {
  const {
    state: {
      user: { role },
      isAuthenticated,
    },
  } = UserState();

  const { show } = ScreenState();

  const router = useRouter();

  return (
    <ListItem
      bottomDivider
      containerStyle={{
        padding: 10,
        backgroundColor: "#fff",
        borderColor: "rgba(39, 39, 39,.2)",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gridGap: 10,
      }}>
      <HStack space={2} w={"100%"}>
        <Avatar rounded source={{ uri: item?.image || item?.images[0] }} />
        <ListItem.Content>
          <ListItem.Title style={{ color: "rgb(39, 39, 39)" }}>{item.name}</ListItem.Title>
        </ListItem.Content>
      </HStack>
      {item?.queries?.length > 0 && (
        <Pressable
          onPress={() => router.push(`/profile/myStore/${router.query.storeId}/queries?prodId=${item?._id}`)}>
          <Badge bg={primaryColor} color={accentColor} flexDirection={"row"} my={"2"}>
            view {item?.queries?.length} queries
          </Badge>
        </Pressable>
      )}

      {role === "admin" && (
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "flex-start",
          }}>
          <ListItem.Chevron name='videocam' type='material' size={20} color='rgba(39, 39, 39,.5)' />
          <ListItem.Chevron name='add-a-photo' type='material' size={20} color='rgba(39, 39, 39,.5)' />
          <ListItem.Chevron
            onPress={() => router.push(`/profile/myStore/${storeId}/addProduct/?productId=${item._id}`)}
            name='edit'
            type='material'
            size={20}
            color='rgba(39, 39, 39,.5)'
          />
          <ListItem.Chevron name='delete' type='material' size={20} color='rgba(39, 39, 39,.5)' />
        </View>
      )}
    </ListItem>
  );
}

export default MyProdList;

// : (
//         role === "seller" && <ListItem.Chevron color="white" />
//       )
