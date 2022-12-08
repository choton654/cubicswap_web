import router from "next/router";
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { List } from "react-native-paper";
import { ssrClient } from "../../../client";
import Layout from "../../../components/Layout";
import Footer from "../../../components/Layout/Footer";
import { accentColor } from "../../../Constant/color";
import { GET_CATEGORIES } from "../../../graphql/query";

const AllCategories = ({ getCategories }) => {
  console.log(getCategories);

  return (
    <Layout title='All Collections'>
      <ScrollView>
        {getCategories.map((l, i) => (
          <View key={i}>
            {l.parentCatId === null && (
              <ListItem onPress={() => router.push(`/categories/allCategories/${l._id}`)}>
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: "500" }}>{l.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            )}
          </View>
        ))}
        {/* <Footer /> */}
      </ScrollView>
    </Layout>
  );
};

export default AllCategories;

const styles = StyleSheet.create({});

export async function getServerSideProps(ctx) {
  try {
    const { getCategories } = await ssrClient("").request(GET_CATEGORIES);
    return {
      props: { getCategories },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

// {
//   getCategories.map((l, i) => (
//     <View key={i}>
//       {l.parentCatId === null && (
//         <List.Accordion title={l.name}>
//           {getCategories.map((c, idx) => (
//             <View key={idx}>
//               {c?.parentCatId?._id === l?._id.toString() && (
//                 <>
//                   {c.hasProduct ? (
//                     <ListItem
//                       onPress={() => router.push(`/categories/${c._id}`)}
//                     >
//                       <ListItem.Content>
//                         <ListItem.Title>{c.name}</ListItem.Title>
//                       </ListItem.Content>
//                     </ListItem>
//                   ) : (
//                     <List.Accordion
//                       title={c.name}
//                       style={{
//                         backgroundColor: accentColor,
//                       }}
//                     >
//                       {getCategories.map((c1, id) => (
//                         <View key={id}>
//                           {c1?.parentCatId?._id === c?._id.toString() && (
//                             <ListItem
//                               onPress={() =>
//                                 router.push(`/categories/${c1._id}`)
//                               }
//                             >
//                               <ListItem.Content>
//                                 <ListItem.Title>{c1.name}</ListItem.Title>
//                               </ListItem.Content>
//                             </ListItem>
//                           )}
//                         </View>
//                       ))}
//                     </List.Accordion>
//                   )}
//                 </>
//               )}
//             </View>
//           ))}
//         </List.Accordion>
//       )}
//     </View>
//   ));
// }
