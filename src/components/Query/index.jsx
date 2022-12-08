import {
  Badge,
  Box,
  Button,
  HStack,
  Input,
  Pressable,
  ScrollView,
  Text,
  TextArea,
  useDisclose,
  VStack,
} from "native-base";
import React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { client } from "../../client";
import { accentColor, primaryColor } from "../../Constant/color";
import { REPLY_QUERY } from "../../graphql/mutation";

const replyQuery = async variables => {
  const { replyQuery } = await client.request(REPLY_QUERY, variables);
  return replyQuery;
};

function SingleQuery({ c, storeId, prodId }) {
  const [reply, setreply] = useState("");

  const { isOpen, onOpen, onClose, onToggle } = useDisclose();

  const { isLoading, mutate } = useMutation(replyQuery, { onSuccess: d => console.log(d) });

  const queryClient = useQueryClient();

  const handelSendReply = () => {
    mutate(
      {
        replyQueryFilter: {
          _id: c?._id,
          storeId: storeId,
        },
        record: {
          replies: [
            {
              content: reply,
              storeId: storeId,
            },
          ],
        },
      },
      {
        onSuccess: () => {
          onClose();
          setreply("");
          queryClient.refetchQueries(["getStoreQueries", [storeId, prodId]]);
        },
      }
    );
  };

  return (
    <VStack>
      <HStack justifyContent={"space-between"}>
        <Text fontWeight={"600"} fontSize={"15px"} flex={3}>
          Q: {c?.content}
        </Text>

        {isOpen ? (
          <Pressable bg={primaryColor} px={"1"} onPress={onClose} rounded={"md"}>
            <Text fontWeight={"700"} fontSize={"12px"} color={accentColor}>
              Close
            </Text>
          </Pressable>
        ) : (
          <Pressable bg={primaryColor} px={"1"} onPress={onOpen} rounded={"md"}>
            <Text fontWeight={"700"} fontSize={"12px"} color={accentColor}>
              Reply
            </Text>
          </Pressable>
        )}
      </HStack>
      <HStack ml={"20px"} space={4}>
        <Text fontWeight={"500"} fontSize={"12px"} color={"#ccc"}>
          By {c?.userId?.name}, on {new Date(c?.createdAt).toDateString()}
        </Text>
      </HStack>

      {c?.replies?.length > 0 && (
        <VStack space={2} mt={"2"}>
          {c?.replies?.map((ry, i) => (
            <Box key={i} ml={"4"}>
              <Text fontWeight={"500"} fontSize={"14px"}>
                A: {ry?.content}
              </Text>
            </Box>
          ))}
        </VStack>
      )}

      {isOpen && (
        <VStack mt={"2"} space={2}>
          <TextArea
            h={20}
            placeholder='Send your reply'
            _focus={{ borderColor: primaryColor }}
            w={{
              base: "100%",
              md: "70%",
            }}
            value={reply}
            onChangeText={t => setreply(t)}
          />
          <Button
            bg={primaryColor}
            w={"1/6"}
            _hover={{ bg: accentColor }}
            _focus={{ bg: primaryColor }}
            onPress={handelSendReply}
            isLoading={isLoading}
            isDisabled={isLoading}>
            Send
          </Button>
        </VStack>
      )}
    </VStack>
  );
}

export default SingleQuery;
