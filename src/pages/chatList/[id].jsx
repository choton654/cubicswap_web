import router from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import { FlatList, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { useQuery } from "react-query";
import { client, ssrClient } from "../../client";
import Layout from "../../components/Layout";
import CustomLoader from "../../components/Layout/CustomLoader";
import { UserState } from "../../context/state/userState";
import { MY_CHATLIST } from "../../graphql/query";

function ChatList({ data: ssrData, token }) {
  const {
    state: { isAuthenticated },
  } = UserState();

  const { isLoading, isError, data } = useQuery(
    "cartData",
    async () => {
      const data = await client.request(MY_CHATLIST, {
        chatroomUserId: router.query.id,
      });

      return data;
    },
    {
      initialData: ssrData,
      enabled: isAuthenticated,
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Layout title={"Messages"}>
      {isLoading ? (
        <CustomLoader height />
      ) : data?.getMyUsers?.length !== 0 ? (
        <FlatList
          key={(item, idx) => idx.toString()}
          data={data?.getMyUsers}
          centerContent
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => {
            const cu = item.chatRoomUsers.filter(
              (cu) => cu.user._id.toString() !== router.query.id.toString()
            );
            return (
              <ListItem
                bottomDivider
                onPress={() => router.push(`/chatroom/${item.name}`)}
              >
                <ListItem.Content>
                  <ListItem.Title>{cu[0]?.user?.name}</ListItem.Title>
                  {item.lastmessage && (
                    <>
                      <ListItem.Subtitle>
                        {item?.lastmessage?.content}
                      </ListItem.Subtitle>
                      <ListItem.Subtitle>
                        {new Date(item?.lastmessage?.createdAt).toDateString()}
                      </ListItem.Subtitle>
                    </>
                  )}
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            );
          }}
        />
      ) : (
        <Text>You have no customers for chat</Text>
      )}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  if (!token) {
    return {
      notFound: true,
    };
  }

  try {
    const data = await ssrClient(token).request(MY_CHATLIST, {
      chatroomUserId: ctx.query.id,
    });
    return {
      props: { data, token },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

export default ChatList;

// useEffect(() => {
//   if (data) {
//     console.log(data);
//     subscribeToMore({
//       document: CREATE_CHATROOM_SUB,
//       variables: { userRole: role },
//       updateQuery: (prev, { subscriptionData }) => {
//         console.log(data, prev, subscriptionData);
//         if (!subscriptionData.data) return prev;
//         return {
//           ...prev,
//           getMyUsers: [
//             subscriptionData.data.createChatRoomSub,
//             ...prev.getMyUsers,
//           ],
//         };
//       },
//       onError: (err) => console.error(err),
//     });
//   }
// }, [data]);
