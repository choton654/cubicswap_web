import { gql } from "graphql-request";
import jwt_decode from "jwt-decode";
import router from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { ssrClient } from "../client";
import Layout from "../components/Layout";

const AllStores = ({ getAllStores }) => {
  console.log(getAllStores);
  return (
    <Layout title={"All Stores"}>
      <View>
        <FlatList
          key={(item, idx) => idx.toString()}
          data={getAllStores}
          centerContent
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <ListItem
              bottomDivider
              onPress={() => router.push(`/profile/myStore/${item._id}`)}
            >
              <ListItem.Content>
                <ListItem.Title>{item.storeName}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
        />
      </View>
    </Layout>
  );
};

export default AllStores;

const styles = StyleSheet.create({});

export async function getServerSideProps(ctx) {
  // const { token } = parseCookies(ctx);

  // console.log("----admin----", ctx);
  // console.log("----admin----", token, decode);
  // if (!token) {
  //   return {
  //     notFound: true,
  //   };
  // }
  // const decode = jwt_decode(token);
  // if (decode.role !== "admin") {
  //   return {
  //     notFound: true,
  //   };
  // }

  const { getAllStores } = await ssrClient("admin").request(
    gql`
      query ExampleQuery {
        getAllStores {
          _id
          storeName
        }
      }
    `
  );

  return {
    props: {
      // token,
      getAllStores,
    },
  };
}
