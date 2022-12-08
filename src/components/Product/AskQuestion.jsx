import { Badge, Box, Button, HStack, Pressable, Text, TextArea, VStack } from "native-base";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { client } from "../../client";
import { accentColor, primaryColor } from "../../Constant/color";
import { UserState } from "../../context/state/userState";
import { ADD_QUERY } from "../../graphql/mutation";
import { GET_QUERIES } from "../../graphql/query";

const addQuery = async variables => {
  const { addQuery } = await client.request(ADD_QUERY, variables);
  return addQuery;
};

function AskQuestion({ setIsVisible, product, store }) {
  const [message, setmessage] = useState("");

  const queryClient = useQueryClient();

  const router = useRouter();

  const {
    state: {
      isAuthenticated,
      user: {
        _id,
        myStore: { _id: storeId },
        role,
      },
    },
  } = UserState();

  const { mutate, isLoading } = useMutation(addQuery);

  const { data, isLoading: qloading } = useQuery(
    ["getQueries", product?._id],
    async () => {
      const { getProductQuery } = await client.request(GET_QUERIES, {
        filter: {
          productId: product?._id,
        },
        sort: "UPDATEDAT_DESC",
      });

      return getProductQuery;
    },
    { retry: false }
  );

  const handelAddQuery = () => {
    if (!isAuthenticated) {
      setIsVisible(true);
      return;
    }
    if (message.trim() === "") {
      return;
    }

    mutate(
      {
        record: { content: message, productId: product._id, storeId: store._id, userId: _id },
      },
      {
        onSuccess: d => {
          console.log(d);
          setmessage("");
          queryClient.refetchQueries(["getQueries", product?._id]);
        },
      }
    );
  };

  return (
    <VStack mx={"25px"} mb={"20px"} space={4}>
      {role !== "seller" && (
        <VStack my={"20px"} space={2}>
          <Text fontSize={"20px"} fontWeight={"700"} mb={"10px"}>
            Have a question?
          </Text>
          <TextArea
            h={20}
            placeholder='Please enter a question'
            _focus={{ borderColor: primaryColor }}
            w={{
              base: "100%",
              md: "70%",
            }}
            value={message}
            onChangeText={text => setmessage(text)}
          />
          <Box my={"5px"}>
            <Text fontWeight={"bold"} color={"#ccc"}>
              Your question might be answered by sellers or manufacturers.
            </Text>
          </Box>
          <Button
            bg={primaryColor}
            w={"1/6"}
            _focus={{ bg: primaryColor }}
            onPress={handelAddQuery}
            isLoading={isLoading}
            isDisabled={isLoading}>
            Send
          </Button>
        </VStack>
      )}

      {data?.items?.length > 0 && (
        <VStack space={2}>
          <Text fontSize={"20px"} fontWeight={"700"} mb={"10px"}>
            Customer questions & answers
          </Text>

          {data?.items?.map((c, i) => (
            <VStack key={i}>
              <HStack>
                <Text fontWeight={"600"} fontSize={"15px"}>
                  Q:{" "}
                </Text>
                <Text fontWeight={"600"} fontSize={"15px"}>
                  {c?.content}
                </Text>
              </HStack>
              <Box ml={"20px"}>
                <Text fontWeight={"500"} fontSize={"12px"} color={"#ccc"}>
                  By {c?.userId?.name} on {new Date(c?.createdAt).toDateString()}
                </Text>
              </Box>

              {c?.replies?.length > 0 && (
                <VStack space={2} mt={"2"}>
                  {c?.replies?.map((ry, i) => (
                    <VStack key={i} ml={"4"}>
                      <Text fontWeight={"500"} fontSize={"14px"}>
                        A: {ry?.content}
                      </Text>
                      <Text fontWeight={"500"} fontSize={"12px"} color={"#ccc"}>
                        By {store?.storeName} on {new Date(ry?.updatedAt).toDateString()}
                      </Text>
                    </VStack>
                  ))}
                </VStack>
              )}
            </VStack>
          ))}

          {store._id === storeId && (
            <Pressable
              w={"1/6"}
              onPress={() => router.push(`/profile/myStore/${storeId}/queries?prodId=${product?._id}`)}>
              <Badge
                bg={primaryColor}
                color={accentColor}
                flexDirection={"row"}
                my={"2"}
                alignItems={"center"}
                justifyContent={"center"}>
                Reply
              </Badge>
            </Pressable>
          )}
        </VStack>
      )}
    </VStack>
  );
}

export default AskQuestion;
