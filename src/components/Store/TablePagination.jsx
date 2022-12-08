import { Box } from "native-base";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { DataTable, Menu } from "react-native-paper";
import { accentColor, lightText } from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";

const Wrapper = ({ children }) => <Text style={{ color: accentColor, fontWeight: "500" }}>{children}</Text>;

const TablePagination = props => {
  const {
    toggle,
    setToggle,
    data,
    setPage,
    page,
    setSort,
    open,
    sort,
    setOpen,
    onItemsPerPageChange,
    numberOfItemsPerPage,
  } = props;
  const { show } = ScreenState();

  const [visible1, setVisible1] = useState(false);
  // const [type, setType] = useState("");

  return (
    <>
      <View
        style={{
          gridGap: 15,
          // padding: 10,
          paddingVertical: 10,
          borderTopColor: "rgba(0, 0, 0, 0.12)",
          borderTopWidth: 1,
          backgroundColor: lightText,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
        {!show && (
          <TouchableOpacity onPress={() => setOpen(!open)}>
            <Box>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='20px'
                viewBox='0 0 24 24'
                width='20px'
                fill={accentColor}>
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z' />
              </svg>
            </Box>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => setToggle(!toggle)}>
          {toggle ? (
            <Box>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='20px'
                viewBox='0 0 24 24'
                width='20px'
                fill={accentColor}>
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M11 7h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zM20.1 3H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM19 19H5V5h14v14z' />
              </svg>
            </Box>
          ) : (
            <Box>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                enableBackground='new 0 0 24 24'
                height='20px'
                viewBox='0 0 24 24'
                width='20px'
                fill={accentColor}>
                <rect fill='none' height='24' width='24' />
                <path d='M3,5v14h18V5H3z M19,11h-3.33V7H19V11z M13.67,11h-3.33V7h3.33V11z M8.33,7v4H5V7H8.33z M5,17v-4h3.33v4H5z M10.33,17v-4 h3.33v4H10.33z M15.67,17v-4H19v4H15.67z' />
              </svg>
            </Box>
          )}
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}>
          <Menu
            visible={visible1}
            onDismiss={() => setVisible1(false)}
            anchor={
              <TouchableOpacity
                style={{
                  gridGap: 5,
                  flexDirection: "row",
                }}
                onPress={() => setVisible1(true)}>
                <Wrapper>Shows {numberOfItemsPerPage}</Wrapper>
                <Icon type='material' name='arrow-drop-down' size={20} />
              </TouchableOpacity>
            }>
            {[10, 20, 50].map((c, i) => (
              <Menu.Item
                key={i}
                onPress={() => {
                  onItemsPerPageChange(c);
                  setVisible1(false);
                }}
                title={`Shows ${c}`}
                titleStyle={{ color: accentColor }}
              />
            ))}
          </Menu>
        </View>

        <TouchableOpacity
          style={{ gridGap: 5, flexDirection: "row" }}
          onPress={() => {
            setSort(p => (p !== "NAME_ASC" ? "NAME_ASC" : "NAME_DESC"));
            // setType("Name");
          }}>
          <Wrapper>Name</Wrapper>
          {/* <Wrapper>{type === "Name" ? (sort === "NAME_ASC" ? "Name Desc" : "Name asc") : "Name asc"}</Wrapper> */}
          {/* {sort === "NAME_ASC" ? (
            <Icon type='material' name={"arrow-downward"} size={15} />
          ) : (
            sort === "NAME_DESC" && <Icon type='material' name={"arrow-upward"} size={15} />
          )} */}

          <Icon type='material' name='import-export' size={15} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ gridGap: 5, flexDirection: "row" }}
          onPress={() => {
            setSort(p => (p !== "PRICE_ASC" ? "PRICE_ASC" : "PRICE_DESC"));
            // setType("Price");
          }}>
          <Wrapper>Price</Wrapper>
          {/* <Wrapper>{type === "Price" ? (sort === "PRICE_ASC" ? "Price Desc" : "Price asc") : "Price asc"}</Wrapper> */}
          {/* {sort === "PRICE_ASC" ? (
            <Icon type='material' name={"arrow-downward"} size={15} />
          ) : (
            sort === "PRICE_DESC" && <Icon type='material' name={"arrow-upward"} size={15} />
          )} */}

          <Icon type='material' name='import-export' size={15} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TablePagination;

const styles = StyleSheet.create({});

//  <View>
//    <Text style={{ fontWeight: "500" }}>Page {data.pages[0].pageCount}</Text>
//  </View>;

// <Dialog
//   visible={showDialog}
//   onDismiss={hideDialog}
//   onBackdropPress={hideDialog}
//   overlayStyle={{}}
// >
//   <Dialog.Title title="Enter page number" />
//   <View>
//     <Text>Total number of pages {data.pages[0].pageCount}</Text>
//   </View>
//   <Input
//     inputStyle={{ maxWidth: 180 }}
//     value={pageNumber}
//     keyboardType="numeric"
//     errorMessage={
//       Number(pageNumber) > Number(data.pages[0].pageCount)
//         ? `max number of pages ${data.pages[0].pageCount}`
//         : ""
//     }
//     onChangeText={(e) => {
//       setPageNumber(e);
//     }}
//   />
//   <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
//     <Dialog.Button title="Cancel" onPress={hideDialog} />
//     <Dialog.Button
//       title="Go"
//       onPress={() => {
//         if (!Number(pageNumber)) {
//           return;
//         } else if (Number(pageNumber) > data.pages[0].pageCount) {
//           return;
//         } else {
//           setPage((p) => (p === 0 ? 1 : Number(pageNumber)));
//         }
//       }}
//     />
//   </View>
// </Dialog>;

{
  /* <TouchableOpacity onPress={getDialog}>
          <Icon type="material" name="pages" size={20} />
        </TouchableOpacity> */
}

{
  /* <View style={{ flexDirection: "row" }}>
          <Icon
            type="material"
            name="navigate-next"
            disabled={data.pages[0].pageCount === page}
            size={25}
            onPress={goNextPage}
            disabledStyle={{ opacity: 0.4 }}
          />
          <Icon
            type="material"
            name="skip-next"
            disabled={data.pages[0].pageCount === page}
            size={25}
            onPress={goLastPage}
            disabledStyle={{ opacity: 0.4 }}
          />
        </View> */
}

{
  /* <View style={{ flexDirection: "row" }}>
          <Icon
            type="material"
            name="skip-previous"
            disabled={page === 1}
            size={25}
            onPress={goFirstPage}
            disabledStyle={{ opacity: 0.4 }}
          />
          <Icon
            type="material"
            name="navigate-before"
            disabled={page === 1}
            disabledStyle={{ opacity: 0.4 }}
            size={25}
            onPress={goPrevPage}
          />
        </View> */
}

// const [showDialog, setShowDialog] = useState(false);

// const [pageNumber, setPageNumber] = useState(page?.toString() || "1");

// const hideDialog = () => {
//   setShowDialog(false);
// };
// const getDialog = () => {
//   setShowDialog(true);
// };

// const goNextPage = () => {
//   if (data.pages[0].pageCount === page) {
//     return;
//   }
//   setPage((p) => (p += 1));
// };
// const goPrevPage = () => {
//   if (page === 1 || page === 0) {
//     return;
//   }
//   setPage((p) => (p -= 1));
// };
// const goLastPage = () => {
//   setPage(data.pages[0].pageCount);
// };
// const goFirstPage = () => {
//   setPage(1);
// };
