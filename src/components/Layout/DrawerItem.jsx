import router from "next/router";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Badge, List } from "react-native-paper";
import { accentColor, primaryColor, textColor } from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";

const DrawerItem = ({ active, onPress, title, icon, right }) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        a: {
          backgroundColor: accentColor,
          margin: 8,
          borderRadius: 5,
          height: 40,
          justifyContent: "center",
        },
        b: {
          color: active ? primaryColor : textColor,
          fontSize: 20,
          fontWeight: 700,
        },
        badge: {
          fontSize: 12,
          fontWeight: 700,
        },
      }),
    [active]
  );

  const { show, md, lg } = ScreenState();
  return (
    <View>
      <List.Item
        onPress={onPress}
        style={styles.a}
        titleStyle={styles.b}
        title={title}
        left={(props) => (
          <View>
            {right && !lg ? (
              <View>
                <List.Icon
                  {...props}
                  icon={icon}
                  color={active ? primaryColor : textColor}
                />
                <Badge
                  selectionColor={primaryColor}
                  style={[
                    { position: "absolute", top: 8, right: 8 },
                    styles.badge,
                  ]}
                >
                  {right?.data || 0}
                </Badge>
              </View>
            ) : (
              <View>
                <List.Icon
                  {...props}
                  icon={icon}
                  color={active ? primaryColor : textColor}
                />
              </View>
            )}
          </View>
        )}
        right={() => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {right && lg && (
              <Badge selectionColor={primaryColor} style={styles.badge}>
                {right?.data || 0}
              </Badge>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default DrawerItem;
