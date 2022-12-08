import jwt_decode from "jwt-decode";
// import { ScrollView, Text, View } from "native-base";
import { parseCookies } from "nookies";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { ActivityIndicator } from "react-native-web";
import { useInfiniteQuery } from "react-query";
import { client, ssrClient } from "../../../../client";
import Layout from "../../../../components/Layout";
import Footer from "../../../../components/Layout/Footer";
import LoadMore from "../../../../components/Layout/LoadMore";
import OrderDetails from "../../../../components/Order/OrderDetails";
import ShippingDetails from "../../../../components/Order/ShippingDetails";
import { accentColor } from "../../../../Constant/color";
import { UserState } from "../../../../context/state/userState";
import { GET_ORDER_ITEMS_BY_STORE } from "../../../../graphql/query";

function OrderRecived({ storeId, storeOrderData, pageInfo, count }) {
  console.log(storeOrderData, pageInfo, count);

  const {
    state: { user: me, isAuthenticated },
  } = UserState();

  const getStoreOrders = async pageParam => {
    console.log(pageParam);
    const { getOrderItemsByStore } = await client.request(GET_ORDER_ITEMS_BY_STORE, {
      storeId,
      page: pageParam === null ? 1 : pageParam,
      perPage: 10,
      sort: "CREATEDAT_DESC",
    });

    return {
      storeOrders: getOrderItemsByStore.items,
      page: getOrderItemsByStore.pageInfo.currentPage,
      hasNextPage: getOrderItemsByStore.pageInfo.hasNextPage,
      hasPreviousPage: getOrderItemsByStore.pageInfo.hasPreviousPage,
      count: getOrderItemsByStore.count,
    };
  };

  const { isLoading, isSuccess, error, data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery("storeOrders", ({ pageParam = 1 }) => getStoreOrders(pageParam), {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
      },
      getPreviousPageParam: (firstPage, allPages) => {
        return firstPage.hasPreviousPage;
      },
      initialData: storeOrderData,
      enabled: isAuthenticated,
      retry: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
    });

  const loadMore = () => {
    if (hasNextPage) {
      setTimeout(() => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
          fetchNextPage();
        }
      }, 2000);
    }
  };

  console.log(hasNextPage);

  return (
    <Layout title='Recived orders'>
      <View style={{ marginBottom: 10 }} />
      {isSuccess && data.pages?.length > 0 && (
        <>
          <ScrollView scrollEventThrottle={10000} onScroll={loadMore}>
            {data?.pages?.map((os, i) => (
              <React.Fragment key={i}>
                {os?.storeOrders?.length > 0 ? (
                  os?.storeOrders?.map((o, i) => {
                    const {
                      orderId: { shippingAddress, user, _id },
                    } = o;
                    return (
                      <Card
                        key={i}
                        style={{
                          padding: 2,
                          margin: 4,
                          backgroundColor: "#ccc",
                        }}>
                        <Card.Content>
                          <OrderDetails orderItem={o} orderId={_id} />
                        </Card.Content>
                        <Card.Content>
                          <ShippingDetails
                            // me={me}
                            order={o}
                            shippingAddress={shippingAddress}
                            user={user}
                          />
                        </Card.Content>
                      </Card>
                    );
                  })
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Text>You have not recived any order yet</Text>
                  </View>
                )}
              </React.Fragment>
            ))}
            {hasNextPage && (
              <>
                <LoadMore
                  hasNextPage={hasNextPage}
                  fetchNextPage={fetchNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                />
              </>
            )}
            {isFetching && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20,
                }}>
                <ActivityIndicator size='small' color={accentColor} />
              </View>
            )}
            <View>
              <Footer />
            </View>
          </ScrollView>
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const {
    params: { storeId },
  } = ctx;
  const { token } = parseCookies(ctx);

  if (!token) {
    return {
      notFound: true,
    };
  }
  const decode = jwt_decode(token);
  console.log(decode);
  if (decode.role === "user") {
    return {
      notFound: true,
    };
  }

  try {
    const { getOrderItemsByStore } = await ssrClient(token).request(GET_ORDER_ITEMS_BY_STORE, {
      storeId,
      page: 1,
      perPage: 10,
      sort: "CREATEDAT_DESC",
    });

    return {
      props: {
        storeOrderData: {
          pages: [
            {
              storeOrders: getOrderItemsByStore.items,
              page: getOrderItemsByStore.pageInfo.currentPage,
              hasNextPage: getOrderItemsByStore.pageInfo.hasNextPage,
              hasPreviousPage: getOrderItemsByStore.pageInfo.hasPreviousPage,
              count: getOrderItemsByStore.count,
            },
          ],
          pageParams: [null],
        },
        storeId,
        token,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
      // props: { error: JSON.stringify(error) },
    };
  }
}

export default OrderRecived;

// const {
//   isLoading,
//   error,
//   data: receivedOrders,
// } = useQuery(["receivedOrder"], GetRecivedOrders, {
//   //  initialData: cart,
//   enabled: isAuthenticated,
//   refetchOnWindowFocus: false,
//   // retryOnMount: false,
//   refetchOnReconnect: false,
//   retry: false,
// });

// if (isLoading) return <CustomLoader />;

// if (error)
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>An Error Occurred</Text>
//     </View>
//   );
