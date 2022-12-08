import { Pressable, Spinner } from "native-base";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon, ListItem, Overlay } from "react-native-elements";
import { accentColor, darkPrimaryColor, primaryColor } from "../../Constant/color";

const StoreCategories = ({
  open,
  setOpen,
  setCategories,
  storeCategories,
  selectCatName,
  setSelectCatName,
  isFetching,
}) => {
  return (
    <Overlay
      isVisible={open}
      statusBarTranslucent
      animationType='slide'
      fullScreen
      collapsable
      focusable
      overlayStyle={{ backgroundColor: accentColor }}>
      <TouchableOpacity style={{ padding: 10 }} onPress={() => setOpen(!open)}>
        {isFetching ? (
          <Spinner color={primaryColor} />
        ) : (
          <Icon size={30} type='material' name='cancel' color={primaryColor} />
        )}
      </TouchableOpacity>
      <View
        style={{
          // flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
        }}>
        <Text style={{ fontSize: 15, fontWeight: "500", color: primaryColor }}>Select collection</Text>
      </View>
      <ScrollView>
        {[{ name: "All" }, ...storeCategories].map((c, i) => (
          <Pressable key={i} _pressed={{ bg: primaryColor }}>
            <ListItem
              bottomDivider
              containerStyle={{ backgroundColor: selectCatName === c.name ? darkPrimaryColor : accentColor }}
              onPress={() => {
                if (c.name === "All") {
                  setCategories([c.name.toString()]);
                  setSelectCatName(c.name.toString());
                  // setOpen(!open);
                } else {
                  setCategories([c._id.toString()]);
                  setSelectCatName(c.name.toString());
                  // setOpen(!open);
                }
              }}>
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "500", color: primaryColor }}>{c.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </Pressable>
        ))}
      </ScrollView>
    </Overlay>
  );
};

export default StoreCategories;

const styles = StyleSheet.create({});
