/** @format */
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import Cookies from "js-cookie";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useQuery } from "react-query";
import { client } from "../../client";
import CustomLoader from "../../components/Layout/CustomLoader";
import { AUTH_USER } from "../../graphql/query";
import appState from "../../utils/appState";
import { beamsClient } from "../../utils/isServer";
const AuthContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { token, decode } = appState();
  const [isEnable, setisEnable] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
  const [currentTime] = useState(Date.now() / 1000);

  const [state, setstate] = useState({
    isAuthenticated: false,
    token: "",
    user: {
      _id: "",
      role: "user",
      name: "",
      myStore: {},
      myCart: { products: [] },
      myWishlist: { products: [] },
      myNotifications: [],
      shippingAddress: {},
    },
  });

  const { isLoading, isError, isSuccess } = useQuery(
    "authUser",
    async () => {
      const { authUser } = await client.request(AUTH_USER, {
        isSeller: decode.role === "seller",
        phone: decode.phone,
        _id: decode.id,
      });
      return authUser;
    },
    {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: isEnable,
      onSuccess: d => {
        if (decode?.phone.toString() === d?.phone.toString() && decode?.id.toString() === d?._id.toString()) {
          setstate({
            ...state,
            user: { ...state.user, ...d },
            isAuthenticated: true,
            token,
          });
        } else {
          console.log("else");
          logoutUser();
          // window.location.assign("/");
        }
      },

      onerror: e => {
        console.error(e);
        // window.location.assign('/')
        logoutUser();
      },
    }
  );

  useEffect(() => {
    if (token.trim() !== "" && decode?.phone !== "") {
      setisEnable(true);
    }

    if (token === null || !Object.keys(decode).includes === "phone") {
      console.log("not login");
    }
    if (decode && decode.exp < currentTime) {
      logoutUser();
    }
  }, [decode, token, currentTime, logoutUser]);

  const logoutUser = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/logout`).then(res => {
        //   if (res.data.success) {
        //     // Sign-out successful.
        //     // client.clearStore();
        //   }
        // });
        setstate({ ...state });
        window.localStorage.setItem("logout", Date.now());
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user_location");
        window.localStorage.removeItem("firebase-user");
        Cookies.remove("token");
        delete axios.defaults.headers.common["Authorization"];

        beamsClient
          .clearAllState()
          .then(() => {
            console.log("Beams state has been cleared");
            window.location.assign("/");
          })
          .catch(e => {
            console.error("Could not clear Beams state", e);
            // clearState()
          });
      })
      .catch(error => {
        // An error happened.
        console.error(error);
      });
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        state,
        isSuccess,
        orderSuccess,
        setOrderSuccess,
        cartSuccess,
        setCartSuccess,
        logoutUser,
      }}>
      {isEnable ? (
        isLoading ? (
          <CustomLoader />
        ) : isError ? (
          <View
            style={{
              minHeight: "100vh",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(39, 39, 39, .8)",
            }}>
            <Text color='rgb(240, 191, 76)'>something went wrong!</Text>
          </View>
        ) : (
          children
        )
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const UserState = () => useContext(AuthContext);

// useQuery(
//   "auth-User",
//   async () => {
//     const {
//       data: { authUser },
//     } = await client.request({
//       query: AUTH_USER,
//       // fetchPolicy: "no-cache",
//     });

//     return authUser;
//   },
//   {
//     retry: false,
//     refetchOnMount: false,
//     refetchOnReconnect: false,
//     refetchOnWindowFocus: false,
//     enabled: !!decode && !!token,
//     onError: (e) => {
//       console.error(e);
//       // logoutUser();
//     },
//     onSuccess: async (data) => {
//       console.log(data);
//       setstate({
//         ...state,
//         notifications: data.myNotifications.length,
//       });
//     },
//   }
// );

// const addTocart = (product) => {
//   let pcartItems = [];
//   const prod = state?.user?.cartItems?.find(
//     (p) => p.products[0]._id === product._id
//   );
//   if (prod) {
//     pcartItems = [...state?.user?.cartItems];
//   } else {
//     pcartItems = [
//       ...state?.user?.cartItems,
//       { products: [{ _id: product._id }] },
//     ];
//   }
//   setstate({
//     ...state,
//     user: {
//       ...state.user,
//       cartItems: pcartItems,
//     },
//   });
// };
// const removeFromcart = (product) => {
//   setstate({
//     ...state,
//     user: {
//       ...state.user,
//       cartItems: state.user.cartItems.filter(
//         (c) => c.products[0]._id !== product._id
//       ),
//     },
//   });
// };
// const clearcart = () => {
//   setstate({
//     ...state,
//     user: { ...state.user, cartItems: [] },
//   });
// };

// useEffect(() => {
//   const token = Cookies.get("token");
//   if (token) {
//     const decode = jwt_decode(token);
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     (async () => {
//       setloading(true);
//       try {
//         const authUser = await queryClient.fetchQuery(
//           "authUser",
//           GetAuthUser
//         );

//         if (decode.phone.toString() === authUser.phone.toString()) {
//           setstate({
//             token: token,
//             user: authUser,
//             isAuthenticated: true,
//           });
//           Cookies.set("jsuser", authUser, {
//             path: "/",
//             secure: true,
//             sameSite: "strict",
//             expires: 30,
//           });
//         } else {
//           logoutUser();
//         }
//       } catch (error) {
//         console.error(error);
//         logoutUser();
//       } finally {
//         setloading(false);
//       }
//       const currentTime = Date.now() / 1000;
//       if (decode.exp < currentTime) {
//         logoutUser();
//       }
//     })();
//   }
// }, []);

// useEffect(() => {
//   if ((state.isAuthenticated && state.user) || orderSuccess) {
//     (async () => {
//       try {
//         setloading(true);
//         await client.request({
//           query: GET_NOTIFICATIONS,
//           variables: {
//             recipient: state.user._id.toString(),
//             isSeller: state.user.role === "seller",
//             isUser: state.user.role === "user",
//           },
//           fetchPolicy: "network-only",
//         });
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setloading(false);
//       }
//     })();
//   }
// }, [state.isAuthenticated, state.user]);

// useQuery(
//   "notifyCount",
//   async () => {
//     const { data } = await client.request({
//       query: NOTIFICATION_COUNT,
//       variables: { recipient: state?.user?._id.toString() },
//       fetchPolicy: "no-cache",
//     });

//     return data;
//   },
//   {
//     retry: false,
//     // refetchOnMount: false,
//     refetchOnReconnect: false,
//     refetchOnWindowFocus: false,
//     enabled: !!decode && !!token && state.isAuthenticated,
//     onSuccess: (d) => {
//       setstate({ ...state, notifications: d?.getNotificationsCount });
//     },

//     onerror: (e) => console.error(e),
//   }
// );

// const { isLoading, isError, isSuccess } = useQuery("authUser", GetAuthUser, {
//   retry: false,
//   refetchOnMount: false,
//   refetchOnReconnect: false,
//   refetchOnWindowFocus: false,
//   enabled: !!decode && !!token,
//   onError: (e) => {
//     console.error(e);
//     logoutUser();
//   },
//   onSuccess: async (data) => {
//     try {
//       if (
//         decode &&
//         decode?.phone.toString() === data?.phone.toString() &&
//         decode?.id.toString() === data?._id.toString()
//       ) {
//         setstate({
//           ...state,
//           // token: token,
//           user: data,
//           isAuthenticated: true,
//         });
//       } else {
//         console.log("else");
//         logoutUser();
//       }
//     } catch (error) {
//       console.error(error);
//       logoutUser();
//     }
//   },
// });

// useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     const decode = jwt_decode(token);
//     console.log(decode);
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     (async () => {
//       setloading(true);
//       try {
//         const authUser = await queryClient.fetchQuery(
//           "authUser",
//           async () => {
//             const {
//               data: { authUser },
//             } = await client.request({
//               query: AUTH_USER,
//               variables: {
//                 isSeller: decode.role === "seller",
//                 _id: decode.id,
//               },
//               fetchPolicy: "no-cache",
//             });

//             return authUser;
//           }
//         );

//         if (
//           decode.phone.toString() === authUser.phone.toString() &&
//           decode.id.toString() === authUser._id.toString()
//         ) {
//           setstate({
//             ...state,
//             user: { ...state.user, ...authUser },
//             isAuthenticated: true,
//           });
//         } else {
//           console.log("else");
//           // logoutUser();
//         }
//       } catch (error) {
//         console.error(error);
//         logoutUser();
//       } finally {
//         setloading(false);
//       }
//       const currentTime = Date.now() / 1000;
//       if (decode.exp < currentTime) {
//         logoutUser();
//       }
//     })();
//   }
// }, []);
