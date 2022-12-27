import jwtDecode from "jwt-decode";
import { Box } from "native-base";
import { parseCookies } from "nookies";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { Portal } from "react-native-paper";
// import { RefreshControl } from "react-native-web-refresh-control";
import { useInfiniteQuery } from "react-query";
import { client, ssrClient } from "../client";
import EmptyCart from "../components/Cart/EmptyCart";
import Layout from "../components/Layout";
import CustomLoader from "../components/Layout/CustomLoader";
import Footer from "../components/Layout/Footer";
import LoadMore from "../components/Layout/LoadMore";
import OrderItem from "../components/Order/OrderItem";
import { accentColor } from "../Constant/color";
import { UserState } from "../context/state/userState";
import { GET_MY_ORDERS } from "../graphql/query";

function OrderSummery({ orderData }) {
  const {
    state: { user: me, isAuthenticated },
  } = UserState();

  // const [refreshing, setRefreshing] = useState(false);

  const getOrders = async (pageParam) => {
    console.log(pageParam);
    const { getMyOrders } = await client.request(GET_MY_ORDERS, {
      user: me._id,
      page: pageParam ? pageParam : 1,
      perPage: 12,
    });

    return {
      orders: getMyOrders.items,
      page: getMyOrders.pageInfo.currentPage,
      hasNextPage: getMyOrders.pageInfo.hasNextPage,
      hasPreviousPage: getMyOrders.pageInfo.hasPreviousPage,
      count: getMyOrders.count,
    };
  };

  const {
    isLoading,
    isSuccess,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    "myOrders",
    ({ pageParam = 1 }) => getOrders(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
      },
      getPreviousPageParam: (firstPage, allPages) => {
        return firstPage.hasPreviousPage;
      },
      // initialData: orderData,
      enabled: isAuthenticated,
      retry: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
    }
  );

  if (isLoading) return <CustomLoader />;

  if (error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>An Error Occurred</Text>
      </View>
    );

  return (
    <Layout title="My Orders">
      {isAuthenticated ? (
        <Box>
          {data.pages?.length > 0 && (
            <ScrollView contentContainerStyle={{ opacity: isFetching && 0.2 }}>
              {data?.pages.map((p, i) => (
                <React.Fragment key={i}>
                  {p?.orders?.length > 0 ? (
                    p?.orders?.map((o, i) =>
                      o.orderItems.map((item, i) => (
                        <OrderItem key={i} orderItem={item} order={o} />
                      ))
                    )
                  ) : (
                    <EmptyCart order />
                  )}
                </React.Fragment>
              ))}
            </ScrollView>
          )}
          {/* {isFetching && (
            <Portal>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20,
                }}>
                <ActivityIndicator size='small' color={accentColor} />
              </View>
            </Portal>
          )} */}

          {hasNextPage ? (
            <View>
              <LoadMore
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
              {/* <Footer /> */}
            </View>
          ) : (
            <View>{/* <Footer /> */}</View>
          )}
        </Box>
      ) : (
        <ScrollView>
          <EmptyCart isLogin />
        </ScrollView>
      )}
    </Layout>
  );
}
export default OrderSummery;

// export async function getServerSideProps(ctx) {
//   const { token } = parseCookies(ctx);
//   // if (!token) {
//   //   return {
//   //     notFound: true,
//   //   };
//   // }

//   if (!token) {
//     return {
//       props: { token: null },
//     };
//   }
//   const decode = jwtDecode(token);

//   if (decode.role !== "user") {
//     return {
//       notFound: true,
//     };
//   }

//   try {
//     const { getMyOrders } = await ssrClient(token).request(GET_MY_ORDERS, {
//       user: decode.id,
//       page: 1,
//       perPage: 12,
//     });

//     return {
//       props: {
//         orderData: {
//           pages: [
//             {
//               orders: getMyOrders.items,
//               page: getMyOrders.pageInfo.currentPage,
//               // pages: getMyOrders.pageInfo.currentPage,
//               hasNextPage: getMyOrders.pageInfo.hasNextPage,
//               hasPreviousPage: getMyOrders.pageInfo.hasPreviousPage,
//               count: getMyOrders.count,
//             },
//           ],
//           pageParams: [null],
//         },
//         // orderData: getMyOrders,
//         token,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       notFound: true,
//     };
//   }
// }

// refreshControl={
//   <RefreshControl
//     refreshing={refreshing}
//     removeClippedSubviews
//     hitSlop={{ top: 50 }}
//     onRefresh={() => {
//       router.reload();
//       setRefreshing(false);
//     }}
//   />
// }

// const {
//   data: { orders, page, pages },
// } = await axios.get(
//   `${process.env.BASE_URL}/api/orders/myorders?pageNumber=${1}`,
//   {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }
// );

// {
//   orders.map((o, i) =>
//     o.orderItems?.map((p, i) => (
//       <OrderItem key={i} orderItem={p} order={o} />
//     ))
//   );
// }
//  <VirtualizedList
//    getItemCount={10}
//    getItem={(data, idx) => ({
//      orderItems: data.orderItems,
//      _id: data._id,
//    })}
//    data={orders}
//    renderItem={({ item: o, index }) => (
//      <VirtualizedList
//        getItemCount={10}
//        getItem={(data, idx) => ({
//          ...data,
//        })}
//        key={index}
//        data={o.orderItems}
//        renderItem={({ item: p, index }) => (
//          <OrderItem key={index} orderItem={p} order={o} />
//        )}
//      />
//    )}
//  />;

// const EmptyCart = dynamic(() =>
//   import("../components/Cart/EmptyCart").then((p) => p.default)
// );
// const OrderItem = dynamic(() =>
//   import("../components/Order/OrderItem").then((p) => p.default)
// );
// const CustomLoader = dynamic(() =>
//   import("../components/Layout/CustomLoader").then((p) => p.default)
// );
// const Layout = dynamic(
//   () => import("../components/Layout").then((p) => p.default),
//   {
//     ssr: false,
//     loading: () => (
//       <>
//         <CustomLoader />
//       </>
//     ),
//   }
// );
