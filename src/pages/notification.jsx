import router from "next/router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../api";
import { client } from "../client";
import Layout from "../components/Layout";
import CustomLoader from "../components/Layout/CustomLoader";
import { UserState } from "../context/state/userState";
import { REMOVE_NOTIFICATION } from "../graphql/mutation";
import { GET_NOTIFICATIONS } from "../graphql/query";

const deleteNotification = async (variables) => {
  const { removeNotify } = await client.request(REMOVE_NOTIFICATION, variables);
  return removeNotify;
};

function Notification() {
  const {
    state: {
      user: { role, _id, myStore },
      isAuthenticated,
    },
  } = UserState();

  const {
    data,
    loading: getLoading,
    error: getError,
  } = useQuery(
    "notificationData",
    async () => {
      const data = await client.request(GET_NOTIFICATIONS, {
        recipient: _id.toString(),
        isSeller: role === "seller",
        isUser: role === "user",
      });

      return data;
    },
    {
      enabled: isAuthenticated,
      onError: (e) => console.log(e),
    }
  );

  const {
    mutate: notificationRemoveOne,
    isLoading,
    isError,
  } = useMutation(deleteNotification, {
    onMutate: async (d) => {
      await queryClient.cancelQueries("notificationData");
      await queryClient.cancelQueries("authUser");
      queryClient.setQueryData("authUser", (old) => {
        return {
          ...old,
          myNotifications: old.myNotifications.filter(
            (p) => p._id !== d.notifyId
          ),
        };
      });

      const previousNotificationData =
        queryClient.getQueryData("notificationData");

      queryClient.setQueryData("notificationData", (old) => {
        return old.getNotifications.filter((p, i) => p._id !== d.notifyId);
      });

      return previousNotificationData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("authUser");
      queryClient.invalidateQueries("notificationData");
    },
    onError: (e) => console.log(e),
  });

  return (
    <Layout title={"Notifications"}>
      {isLoading || getLoading ? (
        <CustomLoader />
      ) : isError || getError ? (
        <View
          style={{
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>An error occurred</Text>
        </View>
      ) : (
        <ScrollView>
          {isAuthenticated && data && data?.getNotifications?.length === 0 && (
            <View
              style={{
                flex: 1,
                marginVertical: 156,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>You have no notifications</Text>
            </View>
          )}
          {isAuthenticated && data && data?.getNotifications?.length > 0 ? (
            data?.getNotifications.map((n, i) => (
              <ScrollView key={i}>
                {role === "user" ? (
                  <ListItem
                    key={i}
                    bottomDivider
                    onPress={() =>
                      router.push(
                        `/singleOrder?orderId=${n?.order?._id}&productId=${n?.order?.orderItems[0]?.product?._id}`
                      )
                    }
                  >
                    <Avatar
                      source={{
                        uri:
                          n?.order?.orderItems[0]?.product?.image ||
                          n?.order?.orderItems[0]?.product?.images[0],
                      }}
                    />
                    <ListItem.Content>
                      <ListItem.Title>
                        You have ordered{" "}
                        {n?.order?.orderItems[0]?.product?.name}
                      </ListItem.Title>
                      <ListItem.Subtitle>
                        {new Date(n?.order?.createdAt).toDateString()}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                    <ListItem.Chevron
                      name="delete"
                      type="material"
                      size={20}
                      onPress={() =>
                        notificationRemoveOne({
                          notifyId: n?._id.toString(),
                          recipient: _id.toString(),
                        })
                      }
                    />
                  </ListItem>
                ) : (
                  role === "seller" && (
                    <ListItem
                      key={i}
                      bottomDivider
                      onPress={() =>
                        router.push(
                          `/profile/myStore/${myStore._id}/orderRecived`
                        )
                      }
                    >
                      <Avatar
                        source={{
                          uri:
                            n?.order?.recivedOrders[0]?.product?.image ||
                            n?.order?.recivedOrders[0]?.product?.images[0],
                        }}
                      />
                      <ListItem.Content>
                        <ListItem.Title>
                          {n?.order?.recivedOrders[0]?.product?.name} has been
                          ordered
                        </ListItem.Title>
                        <ListItem.Subtitle>
                          {new Date(n?.order?.createdAt).toDateString()}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                      <ListItem.Chevron />
                      <ListItem.Chevron
                        name="delete"
                        type="material"
                        size={20}
                        onPress={() =>
                          notificationRemoveOne({
                            notifyId: n?._id.toString(),
                            recipient: _id.toString(),
                          })
                        }
                      />
                    </ListItem>
                  )
                )}
              </ScrollView>
            ))
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>You have no notifications</Text>
            </View>
          )}
        </ScrollView>
      )}
    </Layout>
  );
}

export default Notification;
