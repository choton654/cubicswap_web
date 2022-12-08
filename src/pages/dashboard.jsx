import { Box, Fab, Flex, ScrollView, Spacer, Text, useDisclose } from "native-base";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { client } from "../client";
import { OrderChart } from "../components/Dashboard/OrderChart";
import Layout from "../components/Layout";
import { accentColor, lightAccentColor, lightPrimaryColor, primaryColor } from "../Constant/color";
import { ScreenState } from "../context/state/screenState";
import { UserState } from "../context/state/userState";
import { GET_ALL_ORDERS } from "../graphql/query";
import { Actionsheet } from "native-base";
function Dashboard() {
  const {
    state: { user, token, isAuthenticated },
  } = UserState();

  const { isOpen, onOpen, onClose } = useDisclose();

  const [timestamp, setTimestamp] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  const { isLoading, isError, data } = useQuery(
    "getAllOrders",
    async () => {
      const { getAllOrders } = await client.request(GET_ALL_ORDERS, { sort: "CREATEDAT_DESC" });

      return getAllOrders;
    },
    {
      enabled: !!token && isAuthenticated,
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onSuccess: d => {
        setTimestamp(d?.items?.map(item => ({ time: item?.createdAt, _id: item?._id })));
      },
    }
  );

  console.log(data);

  const { show, screenHeight } = ScreenState();

  return (
    <Layout title={"Dashboard"}>
      <Flex
        position={"relative"}
        direction={!show ? "column" : "row"}
        maxH={show ? screenHeight - 56 : screenHeight - 112}>
        {show ? (
          <Box flexBasis={"20%"} bg={primaryColor}>
            sidebar
          </Box>
        ) : (
          <Fab
            position='absolute'
            bottom={"70px"}
            backgroundColor={primaryColor}
            size='sm'
            onPress={onOpen}
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill={accentColor}>
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
              </svg>
            }
          />
        )}
        <Box flexBasis={show ? "80%" : "100%"} bg={"#fff"}>
          <ScrollView>
            <Box p={"2"}>
              {!isLoading && (
                <OrderChart
                  data={{
                    labels: timestamp?.map(item => new Date(item?.time).toDateString()),
                    datasets: [
                      {
                        label: "Orders",
                        data: timestamp?.map(i => data?.items?.find(ni => ni._id === i._id)?.totalPrice),
                        borderColor: accentColor,
                        backgroundColor: lightAccentColor,
                      },
                    ],
                  }}
                />
              )}

              <Flex mt={"5"}>
                <Flex direction='row' my={"2"}>
                  <Box flex={5} fontWeight={700} textAlign={"center"}>
                    Order Items
                  </Box>
                  <Box flex={1} fontWeight={700} ml={"30px"}>
                    Qty
                  </Box>
                </Flex>
                {data?.items?.map((order, idx) =>
                  order?.orderItems?.map((oItem, i) => (
                    <Flex direction='row' key={i} rounded={"lg"} my={"2"} justifyContent={"space-between"}>
                      <Box flex={5}>{oItem?.product?.name}</Box>
                      <Box flex={1} ml={"30px"}>
                        {oItem?.quantity}
                      </Box>
                    </Flex>
                  ))
                )}
              </Flex>
            </Box>
          </ScrollView>
        </Box>
      </Flex>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content bg={accentColor}>
          <Actionsheet.Item>
            <Text color={primaryColor}>Dashboard</Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Layout>
  );
}

export default Dashboard;
