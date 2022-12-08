import { Box } from "native-base";
import { useRouter } from "next/router";
import React from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import { accentColor, darkPrimaryColor } from "../../Constant/color";

const StoreLayout = ({ store, children }) => {
  const router = useRouter();
  return (
    <View>
      <View>
        <Appbar.Header
          style={{
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}>
          <Appbar.Action
            animated={false}
            onPress={() => router.push(`/store/${store._id}`)}
            icon={() => (
              <Box>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='20px'
                  viewBox='0 0 24 24'
                  width='20px'
                  fill={router.pathname === `/store/[id]` ? darkPrimaryColor : accentColor}>
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path d='M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z' />
                </svg>
              </Box>
            )}
          />

          <Appbar.Action
            animated={false}
            onPress={() => router.push(`/store/${store._id}/products`)}
            icon={() => (
              <Box>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='20px'
                  viewBox='0 0 24 24'
                  width='20px'
                  fill={router.pathname === `/store/[id]/products` ? darkPrimaryColor : accentColor}>
                  <path d='M0 0h24v24H0V0z' fill='none' />
                  <path d='M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4l16-.02V7z' />
                </svg>
              </Box>
            )}
          />
        </Appbar.Header>
      </View>
    </View>
  );
};

export default StoreLayout;

// underlayColor={
//   router.pathname === `/store/[id]` ? darkPrimaryColor : accentColor
// }
// style={{
//   borderBottomColor: darkPrimaryColor,
//   borderBottomWidth: router.pathname === `/store/[id]` && 5,
//   borderRadius: 0,
// }}
// disabled={router.pathname === `/store/[id]`}
// color={
// 	router.pathname === `/store/[id]` ? darkPrimaryColor : accentColor
// }

// underlayColor={
//   router.pathname === `/store/[id]/products`
//     ? darkPrimaryColor
//     : accentColor
// }
// color={
// 	router.pathname === `/store/[id]/products`
// 		? darkPrimaryColor
// 		: accentColor
// }
// style={{
//   borderBottomColor: darkPrimaryColor,
//   borderBottomWidth:
//     router.pathname === `/store/[id]/products` && 5,
//   borderRadius: 0,
// }}
// disabled={router.pathname === `/store/[id]/products`}

//  <Appbar.Action
//           onPress={() => router.push(`/store/${store._id}/productsList`)}
//           icon={() => (
//             <Icon
//               type="material"
//               name="list-alt"
//               size={20}
//               color={accentColor}
//             />
//           )}
//         />

{
  /* <Appbar.Action
            onPress={() => setToggle(!toggle)}
            icon={() => (
              <Icon
                type="material"
                name={!toggle ? "list-alt" : "view-module"}
                size={20}
                color={accentColor}
              />
            )}
          />
          <Appbar.Action
            onPress={() => setOpen(!open)}
            icon={() => (
              <Icon
                type="material"
                name={"filter-list"}
                size={20}
                color={accentColor}
              />
            )}
          /> */
}
