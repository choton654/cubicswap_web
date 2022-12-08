import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { accentColor, textColor } from "../../Constant/color";

const ProductDesc = ({ product }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [expanded1, setExpanded1] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  const handlePress1 = () => setExpanded1(!expanded1);

  return (
    <View style={{ gridGap: 15, marginTop: 5 }}>
      <List.Accordion
        title='About this item'
        descriptionStyle={{ paddingLeft: 10 }}
        expanded={true}
        // expanded={expanded}
        // onPress={handlePress}
        descriptionNumberOfLines={5}
        style={styles.b}
        titleStyle={styles.c}
        // right={props => <List.Icon {...props} icon={"minus"}
        //   color={accentColor} />}
      >
        <ScrollView contentContainerStyle={styles.a}>
          <Text>{product.description}</Text>
        </ScrollView>
      </List.Accordion>
      <List.Accordion
        title='Product details'
        descriptionStyle={{ paddingLeft: 10 }}
        expanded={true}
        // expanded={expanded1}
        // onPress={handlePress1}
        descriptionNumberOfLines={5}
        style={styles.b}
        titleStyle={styles.c}
        // right={props => <List.Icon {...props} icon={!expanded1 ? "plus" : "minus"}
        // right={props => (
        //   <List.Icon
        //     {...props}
        //     icon={"minus"}
        //     color={accentColor}
        //   />
        // )}
      >
        <ScrollView contentContainerStyle={styles.a}>
          {product.details && product.details.length > 0 ? (
            <View style={{ gridGap: 5 }}>
              {product.details.map((d, i) => (
                <View key={i} style={{ flexDirection: "row", gridGap: 10 }}>
                  <Text style={{ flex: 1, fontSize: 15, fontWeight: "500" }}>{d.fieldName} :</Text>
                  <Text style={{ flex: 1 }}>
                    {d.fieldValue.map((v, idx) => (
                      <Text key={idx}>{v}</Text>
                    ))}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus quis fugit repellat
              praesentium saepe harum? Repellat cum voluptatibus unde vero iste dicta, sint, officiis labore
              asperiores ad debitis consequuntur dolores sequi aliquid possimus omnis a quod quisquam expedita esse
              veritatis et! Facere iure corporis vel soluta fugit adipisci voluptatem ducimus quo iste vero
              perferendis laborum totam incidunt distinctio eos rerum, reiciendis atque. Molestiae consequuntur
              cupiditate incidunt ipsam! Vel tempore unde sint error iste, temporibus maiores commodi iusto.
              Doloribus voluptatum non officiis? Voluptate cumque animi sint blanditiis minima, quisquam
              temporibus, velit mollitia molestiae consectetur aperiam totam eveniet, illo iusto nemo. Molestiae
              iure dolores totam libero inventore deserunt perspiciatis asperiores quibusdam, repellendus enim
              rerum saepe consectetur illum ratione? Impedit ratione facere atque optio dolore mollitia ullam
              laboriosam veniam maiores! Vero, quia molestias illo ducimus sunt necessitatibus, minus natus vitae
              minima praesentium, harum expedita! Illo deserunt asperiores excepturi architecto dolor! Non aut,
              sequi ut repudiandae error expedita doloribus harum, voluptas ad quod necessitatibus a nobis unde
              officia, omnis quaerat et accusamus explicabo? Saepe deleniti, quaerat hic nesciunt iste repellat est
              eius veritatis, rem aspernatur tempora, quos aliquam provident architecto possimus praesentium magnam
              placeat nostrum fugiat eveniet ea nemo sed consequuntur? Similique eum eveniet modi commodi, nulla
              soluta perferendis voluptates reprehenderit eius molestiae quasi dolorum, tempora dignissimos
              provident? In aliquam aperiam tenetur? Tenetur distinctio expedita error necessitatibus temporibus.
              Voluptas temporibus dicta, sint ex fugit cum. Ratione hic laboriosam exercitationem aperiam.
              Voluptatibus, ea esse? Nostrum consequatur expedita repellendus earum amet suscipit, provident
              voluptatem necessitatibus atque ex, recusandae magni enim obcaecati illum incidunt veritatis sed! Eum
              in doloribus a rem maiores sed rerum perferendis dicta facere officia autem aliquam nam eaque
            </Text>
          )}
        </ScrollView>
      </List.Accordion>
    </View>
  );
};

export default ProductDesc;

const styles = StyleSheet.create({
  a: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    // maxHeight: 200,
  },
  b: {
    padding: 10,
    backgroundColor: textColor,
    maxHeight: 40,
    justifyContent: "center",
    alignItems: "stretch",
  },
  c: { fontWeight: "700", fontSize: 15, color: accentColor },
});
