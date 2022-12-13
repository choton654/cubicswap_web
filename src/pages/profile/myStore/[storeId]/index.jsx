import jwtDecode from "jwt-decode";
import router from "next/router";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useQuery } from "react-query";
import { client, ssrClient } from "../../../../client";
import Layout from "../../../../components/Layout";
import CustomLoader from "../../../../components/Layout/CustomLoader";
import { UserState } from "../../../../context/state/userState";
import { GET_MY_STORE } from "../../../../graphql/query";

function MyStore({ myStore }) {
  const {
    state: {
      user: { _id, role },
      isAuthenticated,
    },
  } = UserState();
  const router = useRouter();
  const { storeId } = router.query;
  const { data, isLoading, isError, isSuccess } = useQuery(
    "myStore",
    async () => {
      const data = await client.request(GET_MY_STORE, {
        filter: { _id: storeId },
      });
      console.log("---storedata---", data);
      return data;
    },
    {
      // initialData: myStore,
      retry: false,
      // refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      // enabled: false,
      onSuccess: (d) => {
        console.log(d);
      },

      onerror: (e) => {
        console.error(e);
      },
    }
  );

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <Layout title="My Store">
      <View style={{ margin: 10 }}>
        {data && data?.getMyStore && (
          <Text style={styles.a}>{data?.getMyStore.storeName}</Text>
        )}
      </View>
      <Button
        style={{ padding: 10 }}
        contentStyle={{
          backgroundColor: "rgb(240, 191, 76)",
        }}
        labelStyle={{ fontWeight: "600", fontSize: 12 }}
        color="rgb(39, 39, 39)"
        onPress={() => router.push(`/store/${data?.getMyStore?._id}`)}
      >
        <Text>View public page of your store</Text>
      </Button>
      <Button
        style={{ padding: 10 }}
        contentStyle={{
          backgroundColor: "rgb(240, 191, 76)",
        }}
        labelStyle={{ fontWeight: "600", fontSize: 12 }}
        color="rgb(39, 39, 39)"
        onPress={() =>
          router.push(`/profile/myStore/${data?.getMyStore?._id}/myProducts`)
        }
      >
        <Text>My Products</Text>
      </Button>

      <Button
        style={{ padding: 10 }}
        contentStyle={{
          backgroundColor: "rgb(240, 191, 76)",
        }}
        labelStyle={{ fontWeight: "600", fontSize: 12 }}
        color="rgb(39, 39, 39)"
        onPress={() =>
          router.push(`/profile/myStore/${data?.getMyStore?._id}/orderRecived`)
        }
      >
        <Text>View Store orders</Text>
      </Button>
      <Button
        style={{ padding: 10 }}
        contentStyle={{
          backgroundColor: "rgb(240, 191, 76)",
        }}
        labelStyle={{ fontWeight: "600", fontSize: 12 }}
        color="rgb(39, 39, 39)"
        onPress={() =>
          router.push(`/profile/myStore/${data?.getMyStore?._id}/update`)
        }
      >
        <Text>Update Store</Text>
      </Button>
      {role === "admin" && (
        <>
          <Button
            style={{ padding: 10 }}
            contentStyle={{
              backgroundColor: "rgb(240, 191, 76)",
            }}
            labelStyle={{ fontWeight: "600", fontSize: 12 }}
            color="rgb(39, 39, 39)"
            onPress={() =>
              router.push(
                `/profile/myStore/${data?.getMyStore?._id}/addProduct`
              )
            }
          >
            <Text>Add product</Text>
          </Button>
          <Button
            style={{ padding: 10 }}
            contentStyle={{
              backgroundColor: "rgb(240, 191, 76)",
            }}
            labelStyle={{ fontWeight: "600", fontSize: 12 }}
            color="rgb(39, 39, 39)"
            onPress={() =>
              router.push(`/profile/myStore/${data?.getMyStore?._id}/update`)
            }
          >
            <Text>Update Store details</Text>
          </Button>
          <Button
            style={{ padding: 10 }}
            contentStyle={{
              backgroundColor: "rgb(240, 191, 76)",
            }}
            labelStyle={{ fontWeight: "600", fontSize: 12 }}
            color="rgb(39, 39, 39)"
            onPress={() =>
              router.push(`/profile/myStore/${data?.getMyStore?._id}/images`)
            }
          >
            <Text>Add Store images</Text>
          </Button>
          <Button
            style={{ padding: 10 }}
            contentStyle={{
              backgroundColor: "rgb(240, 191, 76)",
            }}
            labelStyle={{ fontWeight: "600", fontSize: 12 }}
            color="rgb(39, 39, 39)"
            onPress={() =>
              router.push(`/profile/myStore/${data?.getMyStore?._id}/videos`)
            }
          >
            <Text>Add Store videos</Text>
          </Button>
        </>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  a: {
    textAlign: "center",
  },
});

export default MyStore;

// export async function getServerSideProps(ctx) {
//   const { storeId } = ctx.params;
//   const { token } = parseCookies(ctx);
//   console.log("---ctx---", ctx);
//   if (!token) {
//     return {
//       notFound: true,
//     };
//   }

//   const decode = jwtDecode(token);
//   console.log(decode);
//   if (!token || decode.role === "user") {
//     return {
//       notFound: true,
//     };
//   }

//   const data = await ssrClient(token).request(GET_MY_STORE, {
//     getMyStoreFilter: { _id: storeId },
//   });

//   return {
//     props: {
//       myStore: data || null,
//     },
//   };
// }
