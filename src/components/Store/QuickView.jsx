import { Box } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { DataTable } from "react-native-paper";
import { accentColor } from "../../Constant/color";

const QuickView = ({ p, setViewProduct, setIsVisible }) => {
  const showDetails = () => {
    setViewProduct(p);
    setIsVisible(true);
  };

  return (
    <DataTable.Cell>
      <TouchableOpacity onPress={showDetails}>
        <Box>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='20px'
            viewBox='0 0 24 24'
            width='20px'
            fill={accentColor}>
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z' />
          </svg>
        </Box>
      </TouchableOpacity>
    </DataTable.Cell>
  );
};

export default QuickView;

const styles = StyleSheet.create({});

// <Overlay
//       fullScreen
//       animationType='fade'
//       // visible={isVisible}
//       isVisible={isVisible}
//       onBackdropPress={hideDetails}
//       // onRequestClose={hideDetails}
//       // ModalComponent={Modal}
//       overlayStyle={{ padding: 0 }}></Overlay>

{
  /* <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: primaryColor,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => router.push(`/product/${p._id}`)}>
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 15,
                      color: accentColor,
                    }}>
                    Show all details
                  </Text>
                </TouchableOpacity> */
}
{
  /* <AddToCart p={p} /> */
}
