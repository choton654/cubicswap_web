import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { DataTable } from "react-native-paper";
import { accentColor, lightText } from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import { StoreState } from "../../context/state/storeState";
import TablePagination from "./TablePagination";
import TableRow from "./TableRow";

const Wrapper = ({ children }) => (
  <Text style={{ fontSize: 15, fontWeight: "500", color: accentColor }}>
    {children}
  </Text>
);

const ListView = (props) => {
  const { data, setSort } = props;

  const { show, screenHeight } = ScreenState();

  const { open, setOpen } = StoreState();

  // const [visible, setVisible] = React.useState(false);

  // const openMenu = () => setVisible(true);

  // const closeMenu = () => setVisible(false);

  return (
    <>
      <DataTable>
        <DataTable.Header style={{ backgroundColor: lightText }}>
          <DataTable.Title>
            <Wrapper>Image</Wrapper>
          </DataTable.Title>
          <DataTable.Title>
            <TouchableOpacity
              style={{ gridGap: 5, flexDirection: "row" }}
              onPress={() =>
                setSort((p) => (p !== "NAME_ASC" ? "NAME_ASC" : "NAME_DESC"))
              }
            >
              <Wrapper>Name</Wrapper>
              <Icon type="material" name="import-export" size={15} />
            </TouchableOpacity>
          </DataTable.Title>
          <DataTable.Title>
            <TouchableOpacity
              style={{ gridGap: 5, flexDirection: "row" }}
              onPress={() =>
                setSort((p) => (p !== "PRICE_ASC" ? "PRICE_ASC" : "PRICE_DESC"))
              }
            >
              <Wrapper>Price</Wrapper>
              <Icon type="material" name="import-export" size={15} />
            </TouchableOpacity>
          </DataTable.Title>
          <DataTable.Title>
            <View>
              <Icon
                type="material"
                name="format-list-bulleted"
                size={20}
                onPress={() => setOpen(!open)}
              />
            </View>
          </DataTable.Title>
        </DataTable.Header>

        <ScrollView
          contentContainerStyle={{
            maxHeight: !show ? screenHeight - 256 : screenHeight - 229,
          }}
        >
          {data?.pages.map((p, i) => (
            <React.Fragment key={i}>
              {p?.products?.length > 0 ? (
                p?.products?.map((p, idx) => <TableRow key={idx} p={p} />)
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>No products found</Text>
                </View>
              )}
            </React.Fragment>
          ))}
        </ScrollView>

        <TablePagination {...props} />
      </DataTable>
    </>
  );
};

export default ListView;

const styles = StyleSheet.create({});

{
  /* <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <TouchableOpacity
                    style={{ gridGap: 5, flexDirection: "row" }}
                    onPress={openMenu}
                  >
                    <Wrapper>{category}</Wrapper>
                    <Icon type="material" name="arrow-drop-down" size={15} />
                  </TouchableOpacity>
                }
              >
                {[
                  { name: "All" },
                  ...data.pages[0].getStoreById.categories,
                ].map((c, i) => (
                  <Menu.Item
                    key={i}
                    // onPress={() => setCategory(c)}
                    onPress={() => {
                      if (c.name === "All") {
                        setCategories([c.name.toString()]);
                      } else {
                        setCategories([c._id.toString()]);
                      }
                    }}
                    title={c.name}
                    titleStyle={{ color: accentColor }}
                  />
                ))}
              </Menu>
            </View> */
}
