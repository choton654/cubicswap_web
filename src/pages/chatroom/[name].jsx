import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Layout from "../../components/Layout";
const Chatroo = () => {
  return (
    <Layout title={"Chat"}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Your Chatroom is empty</Text>
      </View>
    </Layout>
  );
};

export default Chatroo;

const styles = StyleSheet.create({});

// import { useMutation, useQuery, useSubscription } from "@apollo/client";
// import { useRouter } from "next/router";
// import React, { useEffect } from "react";
// import {
//   FlatList,
//   KeyboardAvoidingView,
//   ScrollView,
//   Text,
//   View,
// } from "react-native";
// import { TextInput } from "react-native-paper";
// import Layout from "../../components/Layout";
// import CustomLoader from "../../components/Layout/CustomLoader";
// import ChatMessage from "../../components/Message/ChatMessage";
// import { accentColor, primaryColor } from "../../Constant/color";
// import { ScreenState } from "../../context/state/screenState";
// import { UserState } from "../../context/state/userState";
// import { CREATE_MSG, TYPE_MSG_MUTATION } from "../../graphql/mutation";
// import { GET_CHATROOM, GET_MESSAGES } from "../../graphql/query";
// import { CREATE_MSG_SUB, TYPE_MSG_SUB } from "../../graphql/subscription";

// const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
//   const paddingToBottom = 20;
//   return (
//     layoutMeasurement.height + contentOffset.y >=
//     contentSize.height - paddingToBottom
//   );
// };

// function Chatroom() {
//   const [text, setText] = React.useState("");
//   const [notMe, setNotMe] = React.useState({});
//   const [hasMoreItems, sethasMoreItems] = React.useState(true);
//   const router = useRouter();
//   const { screenWidth, screenHeight, md, show } = ScreenState();

//   const {
//     state: {
//       user: { role, _id },
//     },
//   } = UserState();

//   const {
//     data: chatRoomdata,
//     loading: chatRoomLoading,
//     error: chatRoomError,
//   } = useQuery(GET_CHATROOM, {
//     variables: {
//       chatRoomName: router.query.name,
//     },
//     fetchPolicy: "network-only",
//   });

//   const { data, loading, error, subscribeToMore, fetchMore } = useQuery(
//     GET_MESSAGES,
//     {
//       skip: !chatRoomdata,
//       variables: {
//         chatRoomId: chatRoomdata?.getChatRoom?._id,
//         offset: 0,
//       },
//       fetchPolicy: "network-only",
//     }
//   );

//   const { data: typingData } = useSubscription(TYPE_MSG_SUB, {
//     skip: !Object.keys(notMe).includes("user"),
//     variables: {
//       chatRoomId: chatRoomdata?.getChatRoom?._id.toString(),
//       typerId: notMe?.user?._id,
//     },
//   });

//   const [typeMsgMut] = useMutation(TYPE_MSG_MUTATION);

//   const [mutate, { loading: createMsgLoading, error: createMsgError }] =
//     useMutation(CREATE_MSG, {
//       onCompleted: () => {
//         setText("");
//       },
//       onError: () => {},
//       variables: {
//         content: text,
//         chatRoom: chatRoomdata?.getChatRoom?._id,
//       },
//     });

//   useEffect(() => {
//     if (chatRoomdata && _id) {
//       if (text.trim() !== "") {
//         typeMsgMut({
//           variables: {
//             chatRoomId: chatRoomdata?.getChatRoom?._id.toString(),
//             typerId: _id?.toString(),
//             istype: true,
//           },
//         });
//       } else {
//         typeMsgMut({
//           variables: {
//             chatRoomId: chatRoomdata?.getChatRoom?._id.toString(),
//             typerId: _id?.toString(),
//             istype: false,
//           },
//         });
//       }

//       const cu = chatRoomdata?.getChatRoom?.chatRoomUsers.filter(
//         (cu) => cu.user._id.toString() !== _id.toString()
//       );
//       console.log(cu);
//       if (cu.length > 0) {
//         setNotMe(cu[0]);
//       }
//     }
//   }, [text, chatRoomdata, _id, typeMsgMut]);

//   useEffect(() => {
//     if (chatRoomdata) {
//       subscribeToMore({
//         document: CREATE_MSG_SUB,
//         variables: { chatRoomId: chatRoomdata?.getChatRoom?._id },
//         updateQuery: (prev, { subscriptionData }) => {
//           console.log(prev, subscriptionData.data);
//           if (!subscriptionData.data) return prev;
//           return {
//             ...prev,
//             getMessages: [
//               subscriptionData.data.createMsgSub,
//               ...prev.getMessages,
//             ],
//           };
//         },
//         onError: (err) => console.error(err),
//       });
//     }
//   }, [chatRoomdata, subscribeToMore]);

//   const handleScroll = () => {
//     if (hasMoreItems) {
//       fetchMore({
//         variables: {
//           chatRoomId: chatRoomdata?.getChatRoom?._id,
//           offset: data.getMessages.length,
//         },
//       }).then((fetchMoreResult) => {
//         if (fetchMoreResult.data.getMessages.length < 10) {
//           sethasMoreItems(false);
//         }
//       });
//     }
//   };

//   const onSubmit = () => {
//     if (!text || text.trim() === "") {
//       return;
//     }
//     mutate();
//   };

//   return (
//     <Layout title={notMe?.user?.name || "Chat"}>
//       {loading || chatRoomLoading ? (
//         <CustomLoader height />
//       ) : error || chatRoomError || createMsgError ? (
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: accentColor,
//             zIndex: 100,
//             minHeight: 30,
//           }}
//         >
//           <Text style={{ color: primaryColor, fontWeight: "600" }}>
//             Something went wrong try again later!
//           </Text>
//         </View>
//       ) : (
//         <KeyboardAvoidingView
//           style={{
//             height: show ? screenHeight - 56 : screenHeight - 112,
//             backgroundColor: "rgba(39, 39, 39,.3)",
//           }}
//         >
//           <ScrollView
//             contentContainerStyle={{
//               width: "100%",
//               position: "absolute",
//               bottom: 64,
//               top: 0,
//               marginVertical: 8,
//             }}
//           >
//             {data && data.getMessages.length === 0 ? (
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Text>You have no message yet</Text>
//               </View>
//             ) : (
//               <ScrollView
//                 contentContainerStyle={{ flexDirection: "column-reverse" }}
//                 onScroll={({ nativeEvent }) => {
//                   if (isCloseToBottom(nativeEvent)) {
//                     handleScroll();
//                   }
//                 }}
//                 scrollEventThrottle={500}
//               >
//                 <FlatList
//                   data={data.getMessages
//                     .slice()
//                     // .reverse()
//                     .map((m) => m)}
//                   inverted
//                   renderItem={({ item }) => (
//                     <ChatMessage myId={_id} message={item} />
//                   )}
//                 />
//               </ScrollView>
//             )}

//             {typingData && typingData?.typeMsgSub && (
//               <View
//                 style={{
//                   justifyContent: "center",
//                   alignItems: "center",
//                   padding: 5,
//                 }}
//               >
//                 <Text>{notMe?.user?.name} is typing...</Text>
//               </View>
//             )}
//           </ScrollView>

//           <View
//             style={{
//               position: "absolute",
//               bottom: 0,
//               width: "100%",
//             }}
//           >
//             <TextInput
//               style={{ borderTopEndRadius: 0, borderTopStartRadius: 0 }}
//               disabled={createMsgLoading}
//               multiline
//               placeholder="Type here..."
//               value={text}
//               onChangeText={setText}
//               right={
//                 <TextInput.Icon
//                   name="arrow-right-box"
//                   onPress={() => onSubmit()}
//                 />
//               }
//             />
//           </View>
//         </KeyboardAvoidingView>
//       )}
//     </Layout>
//   );
// }

// export default Chatroom;

// import { useRouter } from "next/router";
// import React, { useEffect } from "react";
// import {
//   FlatList,
//   KeyboardAvoidingView,
//   ScrollView,
//   Text,
//   View,
// } from "react-native";
// import { TextInput } from "react-native-paper";
// import { useMutation, useQuery } from "react-query";
// import { client } from "../../client";
// import Layout from "../../components/Layout";
// import CustomLoader from "../../components/Layout/CustomLoader";
// import ChatMessage from "../../components/Message/ChatMessage";
// import { accentColor, primaryColor } from "../../Constant/color";
// import { ScreenState } from "../../context/state/screenState";
// import { UserState } from "../../context/state/userState";
// import { CREATE_MSG, TYPE_MSG_MUTATION } from "../../graphql/mutation";
// import { GET_CHATROOM, GET_MESSAGES } from "../../graphql/query";
// import { useQuery as useGqlQuery, useSubscription } from "urql";
// import { CREATE_MSG_SUB, TYPE_MSG_SUB } from "../../graphql/subscription";
// import { gql } from "graphql-request";
// // import { createClient, SubscribePayload } from "graphql-ws";
// // import { queryClient } from "../../api";

// function Chatroom() {
//   const [text, setText] = React.useState("");
//   const [notMe, setNotMe] = React.useState({});
//   const [hasMoreItems, sethasMoreItems] = React.useState(true);
//   const router = useRouter();
//   const { screenWidth, screenHeight, md, show } = ScreenState();

//   const {
//     state: {
//       isAuthenticated,
//       user: { role, _id },
//     },
//   } = UserState();

//   const {
//     data: chatRoomdata,
//     isLoading: chatRoomLoading,
//     isError: chatRoomError,
//     isSuccess,
//   } = useQuery(
//     ["chatRoomData", router.query.name],
//     async () => {
//       const data = await client.request(GET_CHATROOM, {
//         chatRoomName: router.query.name,
//       });

//       return data;
//     },
//     {
//       enabled: isAuthenticated,
//       retry: false,
//       refetchOnReconnect: false,
//       refetchOnWindowFocus: false,
//     }
//   );

//   const {
//     data,
//     isLoading: loading,
//     isError: error,
//   } = useQuery(
//     "messagesData",
//     async () => {
//       const data = await client.request(GET_MESSAGES, {
//         chatRoomId: chatRoomdata?.getChatRoom?._id,
//         offset: 0,
//       });

//       return data;
//     },
//     {
//       enabled: chatRoomdata !== undefined && isSuccess && isAuthenticated,
//       // refetchInterval: 1000,
//       retry: false,
//       refetchOnReconnect: false,
//       refetchOnWindowFocus: false,
//     }
//   );

//   // const [{ data: msgdata, fetching: loading, error }] = useGqlQuery({
//   //   query: GET_MESSAGES,
//   //   pause: !(chatRoomdata !== undefined && isSuccess && isAuthenticated),
//   //   variables: {
//   //     chatRoomId: chatRoomdata?.getChatRoom?._id,
//   //     offset: 0,
//   //   },
//   // });

//   console.log(msgdata);

//   const { mutate: typeMsgMut } = useMutation(
//     async (variables) => {
//       const { typeMsg } = await client.request(TYPE_MSG_MUTATION, variables);
//       return typeMsg;
//     },
//     {
//       onError: (e) => console.log(e),
//     }
//   );

//   const {
//     mutate: createMsgMutate,
//     isLoading: createMsgLoading,
//     isError: createMsgError,
//   } = useMutation(
//     async (variables) => {
//       const { createMessage } = await client.request(CREATE_MSG, variables);
//       return createMessage;
//     },
//     {
//       onSuccess: () => {
//         setText("");
//       },
//       onError: (e) => console.log(e),
//     }
//   );

//   const subdata = useSubscription({
//     query: TYPE_MSG_SUB,
//     pause: !Object.keys(notMe).includes("user"),
//     variables: {
//       chatRoomId: chatRoomdata?.getChatRoom?._id.toString(),
//       typerId: notMe?.user?._id,
//     },
//   });
//   console.log(subdata[0].data);

//   // const nsubdata = useSubscription({
//   //   query: gql`
//   //     subscription Subscription($notificationSubRecipient: String!) {
//   //       notificationSub(recipient: $notificationSubRecipient) {
//   //         _id
//   //       }
//   //     }
//   //   `,
//   //   variables: {
//   //     notificationSubRecipient: "60672548abb30c0dc0f0cf30",
//   //   },
//   // });
//   // console.log(nsubdata[0].data);

//   useEffect(() => {
//     if (chatRoomdata !== undefined && isSuccess && _id) {
//       if (text.trim() !== "") {
//         typeMsgMut({
//           chatRoomId: chatRoomdata?.getChatRoom?._id.toString(),
//           typerId: _id?.toString(),
//           istype: true,
//         });
//       } else {
//         typeMsgMut({
//           chatRoomId: chatRoomdata?.getChatRoom?._id.toString(),
//           typerId: _id?.toString(),
//           istype: false,
//         });
//       }

//       const cu = chatRoomdata?.getChatRoom?.chatRoomUsers.filter(
//         (cu) => cu.user._id.toString() !== _id.toString()
//       );
//       if (cu.length > 0) {
//         setNotMe(cu[0]);
//       }
//     }
//   }, [text, chatRoomdata, _id, typeMsgMut, isSuccess]);

//   // useEffect(() => {
//   //   if (data) {
//   //     const observer = new QueryObserver(queryClient, {
//   //       queryKey: "messagesData",
//   //       queryFn: async () => {
//   //         const data = await client.request(GET_MESSAGES, {
//   //           chatRoomId: chatRoomdata?.getChatRoom?._id,
//   //           offset: 0,
//   //         });

//   //         return data;
//   //       },
//   //       refetchInterval: 1000,
//   //     });
//   //     observer.subscribe((result) => {
//   //       console.log(result);
//   //     });
//   //   }
//   // }, [data, chatRoomdata?.getChatRoom?._id]);

//   const handleScroll = () => {
//     // if (hasMoreItems) {
//     //   fetchMore({
//     //     variables: {
//     //       chatRoomId: chatRoomdata?.getChatRoom?._id,
//     //       offset: data.getMessages.length,
//     //     },
//     //   }).then((fetchMoreResult) => {
//     //     if (fetchMoreResult.data.getMessages.length < 10) {
//     //       sethasMoreItems(false);
//     //     }
//     //   });
//     // }
//   };

//   const onSubmit = () => {
//     if (!text || text.trim() === "") {
//       return;
//     }
//     createMsgMutate({
//       content: text,
//       chatRoom: chatRoomdata?.getChatRoom?._id,
//     });
//   };

//   return (
//     <Layout title={notMe?.user?.name || "Chat"}>
//       {loading || chatRoomLoading ? (
//         <CustomLoader height />
//       ) : error || chatRoomError || createMsgError ? (
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: accentColor,
//             zIndex: 100,
//             minHeight: 30,
//           }}
//         >
//           <Text style={{ color: primaryColor, fontWeight: "600" }}>
//             Something went wrong try again later!
//           </Text>
//         </View>
//       ) : (
//         <KeyboardAvoidingView
//           style={{
//             height: show ? screenHeight - 56 : screenHeight - 112,
//             backgroundColor: "rgba(39, 39, 39,.3)",
//           }}
//         >
//           <ScrollView
//             contentContainerStyle={{
//               width: "100%",
//               position: "absolute",
//               bottom: 64,
//               top: 0,
//               marginVertical: 8,
//             }}
//           >
//             {data && data.getMessages.length === 0 ? (
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Text>You have no message yet</Text>
//               </View>
//             ) : (
//               <ScrollView
//                 contentContainerStyle={{ flexDirection: "column-reverse" }}
//                 onScroll={handleScroll}
//                 scrollEventThrottle={500}
//               >
//                 <FlatList
//                   data={data.getMessages
//                     .slice()
//                     // .reverse()
//                     .map((m) => m)}
//                   inverted
//                   renderItem={({ item }) => (
//                     <ChatMessage myId={_id} message={item} />
//                   )}
//                 />
//               </ScrollView>
//             )}

//             {/* {typingData && typingData?.typeMsgSub && (
//               <View
//                 style={{
//                   justifyContent: "center",
//                   alignItems: "center",
//                   padding: 5,
//                 }}
//               >
//                 <Text>{notMe?.user?.name} is typing...</Text>
//               </View>
//             )} */}
//           </ScrollView>

//           <View
//             style={{
//               position: "absolute",
//               bottom: 0,
//               width: "100%",
//             }}
//           >
//             <TextInput
//               style={{ borderTopEndRadius: 0, borderTopStartRadius: 0 }}
//               disabled={createMsgLoading}
//               multiline
//               placeholder="Type here..."
//               value={text}
//               onChangeText={setText}
//               right={
//                 <TextInput.Icon
//                   name="arrow-right-box"
//                   onPress={() => onSubmit()}
//                 />
//               }
//             />
//           </View>
//         </KeyboardAvoidingView>
//       )}
//     </Layout>
//   );
// }

// export default Chatroom;

// useEffect(() => {
//   if (Object.keys(notMe).includes("user")) {
//     console.log("messageee");
//      (async () => {
//   const onNext = (d) => {
//     console.log(d);
//   };
//   let unsubscribe = () => {
//     console.log("complete");
//   };
//   try {
//     await new Promise((resolve, reject) => {
//       unsubscribe = wsClient.subscribe(
//         {
//           query: TYPE_MSG_SUB,
//           variables: {
//             chatRoomId: chatRoomdata?.getChatRoom?._id.toString(),
//             typerId: notMe?.user?._id,
//           },
//         },
//         {
//           next: onNext,
//           error: (e) => {
//             console.error(e.);
//             reject;
//           },
//           complete: (d) => {
//             console.log(d);
//             resolve;
//           },
//         }
//       );
//     });
//   } catch (error) {
//     console.error(error);
//   }
//   // expect(onNext).toBeCalledTimes(5);
// })();
//   }
// }, [chatRoomdata?.getChatRoom?._id, notMe, notMe?.user?._id]);

// useEffect(() => {
//     (async () => {
//   await new Promise((resolve, reject) => {
//     wsClient.subscribe(
//       {
//         query: CREATE_MSG_SUB,
//         variables: {
//           chatRoomId: chatRoomdata?.getChatRoom?._id,
//         },
//       },
//       {
//         error: (e) => {
//           // console.error(e);
//           reject;
//         },
//         complete: (s) => {
//           console.log(s);
//           resolve;
//         },
//         next: (d) => console.log(d),
//       }
//     );
//   });
// })();
// }, [chatRoomdata?.getChatRoom?._id]);

// const {
//   data: chatRoomdata,
//   loading: chatRoomLoading,
//   error: chatRoomError,
// } = useQuery(GET_CHATROOM, {
//   variables: {
//     chatRoomName: router.query.name,
//   },
//   fetchPolicy: "network-only",
// });

// const { data, loading, error, subscribeToMore, fetchMore } = useQuery(
//   GET_MESSAGES,
//   {
//     skip: !chatRoomdata,
//     variables: {
//       chatRoomId: chatRoomdata?.getChatRoom?._id,
//       offset: 0,
//     },
//     fetchPolicy: "network-only",
//   }
// );

// updateQuery: (previousResult, { fetchMoreResult }) => {
//   console.log(previousResult, fetchMoreResult);
//   if (!fetchMoreResult) return previousResult;
//   if (fetchMoreResult.getMessages.length < 10) {
//     sethasMoreItems(false);
//   }
//   return {
//     ...previousResult,
//     getMessages: [
//       ...previousResult.getMessages,
//       ...fetchMoreResult.getMessages,
//     ],
//   };
// },

// const [typeMsgMut] = useMutation(TYPE_MSG_MUTATION);

// const [mutate, { loading: createMsgLoading, error: createMsgError }] =
//   useMutation(CREATE_MSG, {
//     onCompleted: () => {
//       setText("");
//     },
//     onError: () => {},
//     variables: {
//       content: text,
//       chatRoom: chatRoomdata?.getChatRoom?._id,
//     },
//   });

// const { data: typingData } = useSubscription(TYPE_MSG_SUB, {
//   skip: !Object.keys(notMe).includes("user"),
//   variables: {
// chatRoomId: chatRoomdata?.getChatRoom?._id.toString(),
// typerId: notMe?.user?._id,
//   },
// });

// useEffect(() => {
//   if (chatRoomdata) {
//     subscribeToMore({
//       document: CREATE_MSG_SUB,
//       variables: { chatRoomId: chatRoomdata?.getChatRoom?._id },
//       updateQuery: (prev, { subscriptionData }) => {
//         console.log(prev, subscriptionData.data);
//         if (!subscriptionData.data) return prev;
//         return {
//           ...prev,
//           getMessages: [
//             subscriptionData.data.createMsgSub,
//             ...prev.getMessages,
//           ],
//         };
//       },
//       onError: (err) => console.error(err),
//     });
//   }
// }, [chatRoomdata, subscribeToMore]);

// const wsClient =
//   process.browser &&
//   createClient({
//     url: `${process.env.NEXT_PUBLIC_WS_URL}/api/graphql`,
//   });
