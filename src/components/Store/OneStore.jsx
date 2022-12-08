// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import React from "react";
// import { ScreenState } from "../../context/state/screenState";
// import CustomLoader from "../Layout/CustomLoader";
// import GridView from "./GridView";
// import ListView from "./ListView";
// import StoreDetails from "./StoreDetails";

// const Tab = createMaterialTopTabNavigator();

// function OneStore(props) {
//   const { screenWidth, screenHeight, show } = ScreenState();

//   return (
//     <Tab.Navigator
//       lazy
//       lazyPlaceholder={() => <CustomLoader />}
//       initialLayout={{
//         width: screenWidth,
//       }}
//       sceneContainerStyle={{
//         height: show ? screenHeight - 104 : screenHeight - 160,
//       }}
//       swipeEnabled={false}
//       screenOptions={{}}
//     >
//       <Tab.Screen name="Details" options={{}}>
//         {() => <StoreDetails store={props.store} />}
//       </Tab.Screen>
//       <Tab.Screen name="List">
//         {() => (
//           <ListView {...props.state} storeCategories={props.storeCategories} />
//         )}
//       </Tab.Screen>
//       <Tab.Screen name="Grid">
//         {() => (
//           <GridView {...props.state} storeCategories={props.storeCategories} />
//         )}
//       </Tab.Screen>
//     </Tab.Navigator>
//   );
// }

// export default OneStore;
