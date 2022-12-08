import router from "next/router";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

const Searchlist = ({ search, show, data, setIsVisible, setKeyword }) => {
  return (
    <>
      <FlatList
        key={(item, idx) => idx.toString()}
        contentContainerStyle={{
          paddingTop: 10,
          backgroundColor: "#fff",
        }}
        data={data.slice(0, 8)}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <ListItem
            bottomDivider
            onPress={() => {
              if (search) {
                router.push(`/product/${item._id}`).then(() => {
                  if (!show) {
                    setIsVisible(false);
                  }
                });
              } else {
                router.push(`/product/${item._id}`).then(() => {
                  if (show) {
                    setKeyword("");
                  }
                });
              }
            }}
          >
            <Avatar source={{ uri: item.images[0] }} />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )}
      />
    </>
  );
};

export default Searchlist;
