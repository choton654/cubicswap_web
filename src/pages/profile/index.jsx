import { useRouter } from "next/router";
import React from "react";
import { ScrollView, View } from "react-native";
import { List } from "react-native-paper";
import Layout from "../../components/Layout";
import Footer from "../../components/Layout/Footer";
import ActivityBtn from "../../components/Profile/ActivityBtn";
import AddressCard from "../../components/Profile/AddressCard";
import OrderCard from "../../components/Profile/OrderCard";
import ProfileCard from "../../components/Profile/ProfileCard";
import { UserState } from "../../context/state/userState";

const Profile = () => {
  const {
    logoutUser,
    state: { user: me, isAuthenticated },
  } = UserState();
  const router = useRouter();

  return (
    <Layout title={"Profile"}>
      <ScrollView>
        {isAuthenticated ? (
          <>
            <ProfileCard me={me} />
            <View>
              {isAuthenticated && me?.role === "admin" && (
                <>
                  <ActivityBtn href='/allUsers' title='All Users' />
                  <ActivityBtn href='/allStores' title='All Stores' />
                  <ActivityBtn href='/dashboard' title='Dashboard' />
                  <ActivityBtn href='/createSeller' title='Create Sellers' />
                </>
              )}
              {isAuthenticated && me?.role === "seller" && (
                <>
                  {me?.myStore !== null ? (
                    <ActivityBtn href={`/profile/myStore/${me.myStore._id}`} title='View Store' />
                  ) : (
                    <ActivityBtn href='/profile/createStore' title='Create Store' />
                  )}
                  {/* <ActivityBtn href={`/profile/myStore/${me.myStore._id}/queries`} title='Customers Queries' /> */}
                </>
              )}
            </View>

            {me?.role === "user" && (
              <>
                {me?.shippingAddress && !Object.values(me?.shippingAddress).includes(null) ? (
                  <View
                    style={{
                      backgroundColor: "#eee",
                      paddingHorizontal: 10,
                    }}>
                    <AddressCard me={me} />
                  </View>
                ) : (
                  <View style={{ paddingHorizontal: 10 }}>
                    <OrderCard
                      title='Save your delivery locations to place your orders faster!'
                      desc='ADD AN ADDRESS'
                      link='/address?type=address'
                    />
                  </View>
                )}
              </>
            )}
            <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
              {me?.role === "user" && (
                <>
                  <OrderCard title='My Orders' desc='VIEW ALL ORDERS' link='/orderSummery' />
                  {/* <OrderCard title='My Checkouts' desc='VIEW ALL Checkouts' link='/checkout' /> */}
                  <OrderCard title='My Wishlist' desc='VIEW ALL Wishlist' link='/wishlist' />
                </>
              )}
            </View>
            <List.Item
              onPress={() => logoutUser()}
              style={{
                backgroundColor: "rgb(39, 39, 39)",
                margin: 10,
                borderRadius: 5,
                height: 50,
                justifyContent: "center",
              }}
              titleStyle={{ color: "rgb(240, 191, 76)" }}
              title='logout'
              left={props => <List.Icon {...props} icon='logout' color='rgb(240, 191, 76)' />}
            />
          </>
        ) : (
          <List.Item
            onPress={() => router.push("/signIn")}
            style={{
              backgroundColor: "rgb(39, 39, 39)",
              margin: 10,
              borderRadius: 5,
              height: 50,
              justifyContent: "center",
            }}
            titleStyle={{ color: "rgb(240, 191, 76)" }}
            title='login'
            left={props => <List.Icon {...props} icon='login' color='rgb(240, 191, 76)' />}
          />
        )}
        {/* <Footer /> */}
      </ScrollView>
    </Layout>
  );
};

export default Profile;

{
  /* Object.keys(me?.myStore).includes("_id") */
}

// <OrderCard
//   title="My Recived Orders"
//   desc="VIEW ALL RECIVED ORDERS"
//   link={`/profile/myStore/${me?.myStore._id}/orderRecived`}
// />;

{
  /* <List.Item
                    onPress={() => router.push(`/chatList/${me._id}`)}
                    style={{
                      backgroundColor: "rgb(39, 39, 39)",
                      margin: 10,
                      borderRadius: 5,
                      height: 50,
                      justifyContent: "center",
                    }}
                    titleStyle={{ color: "rgb(240, 191, 76)" }}
                    title="Messenger"
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon="chat"
                        color="rgb(240, 191, 76)"
                      />
                    )}
                  /> */
}

{
  /* {me?.role === "seller" && (
                <>
                  <List.Item
                    onPress={() => router.push(`/chatList/${me._id}`)}
                    style={{
                      backgroundColor: "rgb(39, 39, 39)",
                      margin: 10,
                      borderRadius: 5,
                      height: 50,
                      justifyContent: "center",
                    }}
                    titleStyle={{ color: "rgb(240, 191, 76)" }}
                    title="Chat with customers"
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon="message"
                        color="rgb(240, 191, 76)"
                      />
                    )}
                  />
                </>
              )} */
}
