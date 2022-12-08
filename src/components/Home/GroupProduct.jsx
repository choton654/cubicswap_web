import { Box, Button, FlatList, Text } from "native-base";
import { useRouter } from "next/router";
import React from "react";
import { accentColor, primaryColor } from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import ProductDetails from "./ProductDetails";

function GroupProduct({ products, name: title, _id }) {
  const router = useRouter();
  const { show } = ScreenState();

  return (
    <Box mb="4" alignItems="center">
      <Box
        justifyContent="space-between"
        alignItems="center"
        py={"2"}
        px={"5"}
        flexDirection="row"
        w="full"
        bg="rgba(39, 39, 39, 0.2)"
      >
        <Text
          fontSize="16px"
          fontWeight="bold"
          textTransform="uppercase"
          color="secondary.800"
        >
          {title}
        </Text>

        <Button
          colorScheme={accentColor}
          size="sm"
          _text={{ color: primaryColor }}
          _hover={{ bg: primaryColor, _text: { color: accentColor } }}
          _pressed={{ bg: primaryColor, _text: { color: accentColor } }}
          bg={"secondary.100"}
          fontWeight="500"
          onHoverIn={() => console.log("hello")}
          onPress={() => router.push(`/categories/allCategories/${_id}`)}
        >
          VIEW ALL
        </Button>
      </Box>
      <Box w="full" shadow="2" gridColumn={1}>
        {products.length > 0 ? (
          <FlatList
            columnWrapperStyle={{ backgroundColor: "#fff" }}
            key={(item, idx) => idx.toString()}
            contentContainerStyle={{ backgroundColor: "#fff" }}
            numColumns={show ? 4 : 2}
            data={products}
            centerContent
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => <ProductDetails p={item} />}
          />
        ) : (
          <Box
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            No Products found
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default GroupProduct;

{
  /* <TouchableOpacity
            onPress={() => router.push(`/categories/allCategories/${_id}`)}
            style={styles.box2}
          >
            <Text style={styles.bbox}>VIEW ALL</Text>
          </TouchableOpacity> */
}
