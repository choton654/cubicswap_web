import { gql } from "graphql-tag";

export const CREATE_MSG_SUB = gql`
  subscription ($chatRoomId: String!) {
    createMsgSub(chatRoomId: $chatRoomId) {
      _id
      createdAt
      content
      chatRoom {
        _id
      }
      user {
        name
        _id
      }
    }
  }
`;

// export const CREATE_CHATROOM_SUB = gql`
//   subscription ($userRole: String!) {
//     createChatRoomSub(userRole: $userRole) {
//       _id
//       name
//       lastmessage {
//         content
//         createdAt
//       }
//       chatRoomUsers {
//         user {
//           _id
//           name
//         }
//       }
//     }
//   }
// `;

export const NOTIFY_SUB = gql`
  subscription {
    notificationSub(recipient: "60672548abb30c0dc0f0cf30") {
      _id
    }
  }
`;

export const TYPE_MSG_SUB = gql`
  subscription ($chatRoomId: String!, $typerId: String!) {
    typeMsgSub(chatRoomId: $chatRoomId, typerId: $typerId)
  }
`;
