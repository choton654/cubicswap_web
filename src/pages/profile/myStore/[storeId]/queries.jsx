import { Avatar, Box, HStack, ScrollView, Spinner, Text, VStack } from "native-base";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { client } from "../../../../client";
import Layout from "../../../../components/Layout";
import SingleQuery from "../../../../components/Query";
import { accentColor } from "../../../../Constant/color";
import { GET_STORE_QUERIES } from "../../../../graphql/query";

function StoreQueries() {
  const router = useRouter();

  const { data, isLoading } = useQuery(
    ["getStoreQueries", [router.query.storeId, router.query.prodId]],
    async () => {
      const { getProductQuery } = await client.request(GET_STORE_QUERIES, {
        filter: {
          storeId: router.query.storeId,
          productId: router.query.prodId,
        },
        sort: "UPDATEDAT_DESC",
      });

      return getProductQuery;
    },
    { retry: false, refetchOnWindowFocus: false, retryOnMount: false, refetchOnReconnect: false }
  );

  console.log(data);

  return (
    <Layout title={"Queries"}>
      {isLoading && <Spinner size='sm' color={accentColor} />}
      {data?.items?.length > 0 && (
        <ScrollView>
          <VStack pl='4' pr='5' py='2'>
            <HStack alignItems={"center"} space={2}>
              <Avatar
                size='48px'
                source={{
                  uri: data?.items[0]?.productId?.images[0],
                }}
              />
              <Text fontSize={"16px"} fontWeight={"600"} ml={"4"}>
                {data?.items[0]?.productId?.name}
              </Text>
            </HStack>

            <VStack space={2} mt={"4"}>
              <Text fontSize={"18px"} fontWeight={"700"} mb={"10px"}>
                Customer questions & answers
              </Text>
              <VStack space={3}>
                {data?.items?.map((c, i) => (
                  <SingleQuery key={i} c={c} storeId={router.query.storeId} prodId={router.query.prodId} />
                ))}
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>
      )}
    </Layout>
  );
}

export default StoreQueries;
