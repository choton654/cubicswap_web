import { DrawerContentScrollView } from "@react-navigation/drawer";
import router from "next/router";
import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { StyleSheet, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import { accentColor, lightText, primaryColor } from "../../Constant/color";
import { UserState } from "../../context/state/userState";
import DrawerItem from "./DrawerItem";

const LeftDrawerContent = (props) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        a: {
          borderColor: lightText,
          justifyContent: "center",
          borderRadius: 10,
          borderWidth: 2,
        },
        d: {
          position: "absolute",
          top: -4,
          right: -2,
        },
        e: {
          color: primaryColor,
          fontSize: 10,
          fontWeight: "bold",
        },
        f: {
          width: 18,
          height: 18,
          borderRadius: 50,
        },
        g: {
          backgroundColor: accentColor,
          paddingTop: 0,
          height: "100%",
        },
      }),
    []
  );

  const {
    state: {
      isAuthenticated,
      user: { _id, role, name, myStore, myNotifications },
    },
  } = UserState();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.g}>
      <ScrollView>
        <Appbar.Header
          style={{
            backgroundColor: accentColor,
            justifyContent: "center",
          }}
        >
          <Appbar.Content
            style={{ alignItems: "center" }}
            title={
              name === "" ? (
                <TouchableOpacity onPress={() => router.push("/signIn")}>
                  <Text>SignIn</Text>
                </TouchableOpacity>
              ) : (
                name
              )
            }
          />
        </Appbar.Header>

        <DrawerItem
          title="Market Place"
          icon="shopping-outline"
          onPress={() => router.push(`/`)}
          active={
            router.pathname === "/" ||
            router.pathname === "/product/[id]" ||
            router.pathname === "/categories/[catId]" ||
            router.pathname === "/categories" ||
            router.pathname === "/store/[id]"
          }
        />

        <DrawerItem
          icon={"shape"}
          title="All Collections"
          onPress={() => router.push(`/categories/allCategories`)}
          active={router.pathname === "/categories/allCategories"}
        />

        <DrawerItem
          title="Map"
          icon="map-outline"
          onPress={() => router.push(`/map`)}
          active={router.pathname === "/map"}
        />

        <DrawerItem
          icon={"bell-outline"}
          title="Notification"
          onPress={() => router.push(`/notification`)}
          active={router.pathname === "/notification"}
          right={{ data: myNotifications.length }}
        />

        {isAuthenticated && role === "seller" && (
          <DrawerItem
            title="My Store"
            icon="storefront-outline"
            onPress={() => router.push(`/profile/myStore/${myStore._id}`)}
            active={
              router.pathname === "/profile/myStore/[storeId]" ||
              router.pathname === "/profile/myStore/[storeId]/images" ||
              router.pathname === "/profile/myStore/[storeId]/videos" ||
              router.pathname === "/profile/myStore/[storeId]/update" ||
              router.pathname === "/profile/myStore/[storeId]/myProducts" ||
              router.pathname === "/profile/myProducts" ||
              router.pathname === "/profile/myProducts/[productId]" ||
              router.pathname === "/profile/myStore/[storeId]/addProduct"
            }
          />
        )}

        {isAuthenticated && role === "user" ? (
          <DrawerItem
            title="My Orders"
            icon="package-variant"
            onPress={() => router.push("/orderSummery")}
            active={
              router.pathname === "/orderSummery" ||
              router.pathname === "/singleOrder"
            }
          />
        ) : (
          role === "seller" && (
            <DrawerItem
              title="Orders"
              icon="package-variant"
              onPress={() =>
                router.push(`/profile/myStore/${myStore._id}/orderRecived`)
              }
              active={
                router.pathname === "/profile/myStore/[storeId]/orderRecived" ||
                router.pathname === "/singleOrder"
              }
            />
          )
        )}

        {isAuthenticated && (
          <DrawerItem
            title="Messenger"
            icon="chat-outline"
            onPress={() => router.push(`/chatList/${_id}`)}
            active={
              router.pathname === "/chatList/[id]" ||
              router.pathname === "/chatroom/[name]"
            }
          />
        )}

        {/* <DrawerItem
          icon={"menu"}
          title="Menu"
          onPress={() => router.push(`/menu`)}
          active={router.pathname === "/menu"}
        /> */}
      </ScrollView>
    </DrawerContentScrollView>
  );
};

export default LeftDrawerContent;

// {
//   role === "user" && (
//     <DrawerItem
//       icon={"cart-outline"}
//       title="Cart"
//       onPress={() => router.push(`/cart`)}
//       active={router.pathname === "/cart"}
//       right={{ data: products?.length }}
//     />
//   );
// }

//  <DrawerItem
//    title="Profile"
//    icon="account-outline"
//    onPress={() => router.push(`/profile`)}
//    active={
//      router.pathname === "/profile" ||
//      router.pathname === "/checkout" ||
//      router.pathname === "/address"
//    }
//  />;

//  <Appbar.Action
//           size={30}
//           onPress={() => router.push("/")}
//           icon={() => (
//             <Image
//               transition
//               alt="pic"
//               style={{ width: 30, height: 30 }}
//               source={"/img/online-shopping.png"}
//             />
//           )}
//         />
