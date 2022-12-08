import { Badge, Flex, Link, ScrollView } from "native-base";
import { useRouter } from "next/router";
import React from "react";
import { accentColor, primaryColor } from "../../Constant/color";

function CategoryList({ prodCategories, main }) {
  const router = useRouter();
  return (
    <Flex py={3} direction='row' alignItems='center' bg={accentColor} justifyContent={"center"}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: accentColor, justifyContent: "center", alignItems: "center" }}>
        {[
          { href: "/categories/allCategories", name: "All" },
          ...prodCategories.map(c => ({
            href: main ? `/categories/allCategories/${c._id}` : `/categories/${c._id}`,
            name: c.name,
          })),
        ].map((item, i) => (
          <Link key={i} mx={2} isUnderlined onPress={() => router.push(`${item.href}`)}>
            <Badge backgroundColor={primaryColor} color={accentColor}>
              {item.name}
            </Badge>
          </Link>
        ))}
      </ScrollView>
    </Flex>
  );
}

export default CategoryList;

// const links = [
//   {
//     name: "All",
//     href: "/categories",
//   },
//   {
//     name: "Plastic",
//     href: "/categories/Plastic",
//   },
//   {
//     name: "Steel",
//     href: "/categories/Steel",
//   },
//   {
//     name: "Fashion",
//     href: "/categories/Fashion",
//   },
//   {
//     name: "Shoes",
//     href: "/categories/Shoes",
//   },
// ];

// <View
//   style={{
//     justifyContent: "flex-start",
//     minHeight: "50px",
//     width: "100%",
//     backgroundColor: "rgba(39, 39, 39, 0.8)",
//     marginBottom: "10px",
//     boxSizing: "border-box",
//     boxShadow: "3px 0 8px 1px rgb(0 0 0 / 40%)",
//   }}
// >
//   <FlatList
//     contentContainerStyle={{ flex: 1 }}
//     horizontal
//     data={[
//       { href: "/categories/allCategories", name: "All" },
//       ...prodCategories.map((c) => ({
//         href: main
//           ? `/categories/allCategories/${c._id}`
//           : `/categories/${c._id}`,
//         name: c.name,
//       })),
//     ].slice(0, 5)}
//     centerContent
//     keyExtractor={(item, idx) => idx.toString()}
//     renderItem={({ item }) => (
//       <TouchableOpacity
//         onPress={() => router.push(`${item.href}`)}
//         style={{
//           paddingHorizontal: 10,
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100%",
//           flexGrow: 1,
//         }}
//       >
//         <Text style={{ fontWeight: "700", color: "rgb(240, 191, 76)" }}>
//           {item.name}
//         </Text>
//       </TouchableOpacity>
//     )}
//   />
// </View>;
