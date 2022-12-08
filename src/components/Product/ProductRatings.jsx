import React from "react";
import { Text, View } from "react-native";

function ProductRatings() {
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: ".4rem",
        flexDirection: "row",
        // justifyContent: "space-between",
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "rgb(55, 190, 95)",
          marginRight: "4px",
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: "5px",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: "1rem", color: "#fff" }}>4.1</Text>
        <Text
          style={{
            alignItems: "center",
            marginLeft: "4px",
            fontSize: "15px",
            width: "1rem",
            paddingLeft: "2px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="20px"
            viewBox="0 0 24 24"
            width="20px"
            fill="#FFFFFF"
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
            </g>
          </svg>
        </Text>
      </View>
      <Text style={{ fontSize: "1rem", color: "#717171", marginLeft: 5 }}>
        51 ratings, 4 reviews
      </Text>
    </View>
  );
}

export default ProductRatings;
