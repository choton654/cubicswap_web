import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useQuery } from "react-query";
import { client, ssrClient } from "../client";
import Layout from "../components/Layout";
import OrderDetails from "../components/Order/OrderDetails";
import RestOrderItems from "../components/Order/RestOrderItems";
import ShippingDetails from "../components/Order/ShippingDetails";
import { UserState } from "../context/state/userState";
import { GET_SINGLE_ORDER } from "../graphql/query";

function SingleOrder({}) {
  const router = useRouter();

  const {
    state: { user: me, isAuthenticated },
  } = UserState();

  const getSingleOrder = async () => {
    const { getOneOrder } = await client.request(GET_SINGLE_ORDER, {
      user: me._id,
      orderId: router?.query?.orderId,
    });
    const orderItem = getOneOrder?.orderItems?.find(
      (o, i) =>
        o.product?._id.toString() === router?.query?.productId.toString()
    );
    const restOrderItems = getOneOrder?.orderItems?.filter(
      (o, i) =>
        o.product?._id.toString() !== router?.query?.productId.toString()
    );

    return {
      order: getOneOrder,
      // orderId,
      // productId,
      orderItem,
      restOrderItems,
    };
  };

  const { isLoading, error, data } = useQuery(
    ["getSingleOrder", router?.query?.orderId],
    () => getSingleOrder(),
    {
      enabled: isAuthenticated,
      retry: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <Layout title="Order Details">
      <View
        w="100%"
        mb="8px"
        backgroundColor="#fff"
        ViewShadow={"0 2px 2px -1px rgb(0 0 0 / 20%)"}
      ></View>
      {data && (
        <ScrollView>
          {Object.keys(data?.orderItem).length > 0 && (
            <OrderDetails
              orderItem={data?.orderItem}
              orderId={router?.query?.orderId}
              showStatus
            />
          )}
          <ShippingDetails
            // me={me}
            order={data?.orderItem}
            shippingAddress={data?.order.shippingAddress}
            user={data?.order.user}
          />
          {data?.restOrderItems?.length > 0 && (
            <View>
              <View
                style={{
                  backgroundColor: "rgba(39,39,39,.2)",
                  borderBottomWidth: 1,
                  borderBottomColor: "#aaa",
                  paddingHorizontal: 16,
                  paddingVertical: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily:
                      'Roboto Medium,Roboto-Medium,Droid Sans,HelveticaNeue-Medium,Helvetica Neue Medium,"sans-serif-medium"',
                  }}
                >
                  Other Items In this Order
                </Text>
              </View>
              {data?.restOrderItems?.map((o, i) => (
                <RestOrderItems
                  orderId={router?.query?.orderId}
                  orderItem={o}
                  key={i}
                />
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </Layout>
  );
}

export default SingleOrder;

// export async function getServerSideProps(ctx) {
//   const {
//     query: { orderId, productId },
//   } = ctx;
//   const { token } = parseCookies(ctx);

//   if (!token) {
//     return {
//       notFound: true,
//     };
//   }
//   if (!orderId || !productId) {
//     return {
//       notFound: true,
//     };
//   }
//   const decode = jwtDecode(token);

//   if (decode.role === "seller") {
//     return {
//       notFound: true,
//     };
//   }

//   try {
//     const { getOneOrder } = await ssrClient(token).request(GET_SINGLE_ORDER, {
//       user: decode.id,
//       orderId,
//     });

//     const orderItem = getOneOrder?.orderItems?.find(
//       (o, i) => o.product?._id.toString() === productId.toString()
//     );
//     const restOrderItems = getOneOrder?.orderItems?.filter(
//       (o, i) => o.product?._id.toString() !== productId.toString()
//     );

//     return {
//       props: {
//         order: getOneOrder,
//         orderId,
//         productId,
//         orderItem,
//         restOrderItems,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       notFound: true,
//       // props: { error: JSON.stringify(error) },
//     };
//   }
// }

// const {
//   data: { order },
// } = await axios.post(
//   `${process.env.BASE_URL}/api/orders/singelorder`,
//   { orderId, productId },
//   {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }
// );
// const orderItem = order?.find(
//   (o, i) => o.products[0]?._id.toString() === productId.toString()
// );
// const restOrderItems = order?.filter(
//   (o, i) => o.products[0]?._id.toString() !== productId.toString()
// );

// const RestOrderItems = dynamic(() =>
//   import("../components/Order/RestOrderItems").then((p) => p.default)
// );
// const OrderDetails = dynamic(
//   () => import("../components/Order/OrderDetails").then((p) => p.default),
//   {
//     ssr: false,
//     loading: () => (
//       <View
//         style={{
//           minHeight: 247,
//           minWidth: "100%",
//           justifyContent: "center",
//           alignItems: "center",
//           flex: 1,
//         }}
//       >
//         <ActivityIndicator />
//       </View>
//     ),
//   }
// );
// const ShippingDetails = dynamic(() =>
//   import("../components/Order/ShippingDetails").then((p) => p.default)
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

// const [restOrderItems, setRestOrderItems] = useState([]);
// const [orderItem, setOrderItem] = useState({});

// const {
//   isLoading,
//   error,
//   data: order,
// } = useQuery(
//   ["singleOrder", router?.query?.orderId],
//   () => GetOneOrder(router?.query?.orderId),
//   {
//     initialData: serverOrder,
//     enabled: false,
//     // enabled:
//     //   !!token && !!router?.query?.orderId && !!router?.query?.productId,
//     retry: false,
//     refetchOnWindowFocus: false,
//     retryOnMount: false,
//     refetchOnReconnect: false,
//     onSuccess: (data) => {},
//     onError: (err) => {
//       console.error(err);
//       alert("an error occurred");
//     },
//   }
// );

// useEffect(() => {
//   if (router?.query?.productId && order) {
//     setOrderItem(
//       order?.find(
//         (o, i) =>
//           o.products[0]?._id.toString() ===
//           router?.query?.productId.toString()
//       )
//     );
//     setRestOrderItems(
//       order?.filter(
//         (o, i) =>
//           o.products[0]?._id.toString() !==
//           router?.query?.productId.toString()
//       )
//     );
//   }
// }, [router?.query?.productId, order]);

// if (isLoading) return <CustomLoader />;

// if (error)
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>An Error Occurred</Text>
//     </View>
//   );
