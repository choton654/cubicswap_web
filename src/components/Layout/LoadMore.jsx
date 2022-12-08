import { Button, Text } from "native-base";
import React from "react";
import { accentColor, primaryColor } from "../../Constant/color";

function LoadMore({ isFetchingNextPage, fetchNextPage, hasNextPage }) {
  return (
    <Button
      size={"sm"}
      my={"2"}
      mx={"auto"}
      w={"30%"}
      // isLoading={isFetchingNextPage}
      isDisabled={isFetchingNextPage}
      colorScheme='secondary.800'
      bg={accentColor}
      // _hover={{ bg: accentColor }}
      // _pressed={{ bg: accentColor }}
      onPress={() => fetchNextPage()}>
      <Text color={primaryColor} fontWeight={500}>
        {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "Nothing more to load"}
      </Text>
    </Button>
  );
}

export default LoadMore;
