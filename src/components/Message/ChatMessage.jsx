import moment from "moment";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { accentColor, primaryColor } from "../../Constant/color";

const ChatMessage = ({ message, myId }) => {
  const isMyMessage = () => {
    return message.user._id === myId;
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? primaryColor : accentColor,
            marginLeft: isMyMessage() ? 50 : 0,
            marginRight: isMyMessage() ? 0 : 50,
          },
        ]}
      >
        {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
        {isMyMessage() && (
          <Text
            style={{
              color: accentColor,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            {message.user.name}
          </Text>
        )}

        <Text style={{ color: isMyMessage() ? accentColor : primaryColor }}>
          {message.content}
        </Text>
        <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageBox: {
    borderRadius: 5,
    padding: 10,
  },
  name: {
    color: primaryColor,
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {},
  time: {
    alignSelf: "flex-end",
    color: "grey",
  },
});
