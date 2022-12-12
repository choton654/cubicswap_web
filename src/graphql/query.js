import { gql } from "graphql-tag";
import { client } from "../client";

export const AUTH_USER = gql`
  query authUser($isSeller: Boolean!, $_id: MongoID!, $phone: String!) {
    authUser(filter: { _id: $_id, phone: $phone }) {
      _id
      name
      email
      role
      phone
      shippingAddress @skip(if: $isSeller) {
        city
        pinCode
        state
        houseNo
        roadName
        landmark
      }
      myNotifications {
        _id
      }
      myCart @skip(if: $isSeller) {
        products {
          product {
            _id
          }
        }
      }
      myWishlist @skip(if: $isSeller) {
        products {
          product {
            _id
          }
        }
      }
      myStore @include(if: $isSeller) {
        _id
      }
    }
  }
`;

export const NOTIFICATION_COUNT = gql`
  query getNotificationsCount($recipient: MongoID!) {
    getNotificationsCount(filter: { recipient: $recipient })
  }
`;

export const GET_NOTIFICATIONS = gql`
  query getNotifications(
    $recipient: MongoID!
    $isSeller: Boolean!
    $isUser: Boolean!
  ) {
    getNotifications(filter: { recipient: $recipient }, sort: _ID_DESC) {
      _id
      recipient {
        name
      }
      order {
        _id
        createdAt
        user {
          name
        }
        orderItems @include(if: $isUser) {
          product {
            _id
            name
            images
          }
        }
        recivedOrders(userId: $recipient) @include(if: $isSeller) {
          product {
            _id
            name
            images
          }
        }
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query getMessages($chatRoomId: String!, $offset: Int!) {
    getMessages(chatRoomId: $chatRoomId, offset: $offset) {
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

export const GET_CHATROOM = gql`
  query getChatRoom($chatRoomName: String!) {
    getChatRoom(chatRoomName: $chatRoomName) {
      _id
      chatRoomUsers {
        user {
          _id
          name
        }
      }
    }
  }
`;

export const MY_CHATLIST = gql`
  query getMyUsers($chatroomUserId: String!) {
    getMyUsers(chatroomUserId: $chatroomUserId) {
      _id
      name
      lastmessage {
        content
        createdAt
      }
      chatRoomUsers {
        user {
          _id
          name
        }
      }
    }
  }
`;

export const GET_MY_STORE = gql`
  query getMyStore($filter: FilterFindOneStoreInput!) {
    getMyStore(filter: $filter) {
      _id
      storeName
      aboutStore
      geocodeAddress {
        formattedAddress
      }
    }
  }
`;

export const GET_MY_STORE_DETAILS = gql`
  query getMyStore(
    $storeId: MongoID!
    $getCategoriesFilter: FilterFindManyCategoryInput
  ) {
    getMyStoreDetails(filter: { _id: $storeId }) {
      _id
      storeName
      aboutStore
      phone
      categories {
        _id
        name
      }
      details {
        fieldName
        fieldValue
      }
      address {
        city
        pincode
        landmark
        roadName
        state
        district
      }
    }
    getCategories(filter: $getCategoriesFilter) {
      name
      _id
      hasProduct
    }
  }
`;

export const GET_MY_STORE_IMAGES = gql`
  query getMyStore($storeId: MongoID!) {
    getMyStoreDetails(filter: { _id: $storeId }) {
      _id
      images
    }
  }
`;

export const GET_MY_STORE_VIDEOS = gql`
  query getMyStore($storeId: MongoID!, $owner: MongoID!) {
    getMyStoreDetails(filter: { _id: $storeId, owner: $owner }) {
      _id
      videos
    }
  }
`;

export const GET_STORE_POINTS = gql`
  query getAllStores {
    getAllStores {
      _id
      storeName
      images
      address {
        state
      }
      geocodeAddress {
        coordinates
      }
    }
  }
`;

export const GET_PRODUCT_BY_CATEGORY = gql`
  query getProductsByOptions(
    $getProductsByOptionsFilter: FilterFindManyProductInput
  ) {
    getProductsByOptions(filter: $getProductsByOptionsFilter, perPage: 8) {
      count
      items {
        _id
        name
        images
        price
      }
    }
  }
`;

export const GET_MY_PRODUCT_DETAILS = gql`
  query getMyProduct($productId: MongoID!, $user: MongoID!) {
    getMyProductDetails(productId: $productId, user: $user) {
      _id
      name
      description
      brand
      inStock
      categories {
        name
        _id
      }
      price
      unit
      details {
        fieldName
        fieldValue
      }
      # images
      minOrder
      rangePerUnit {
        pricePerUnit
        qty
      }
      # colors
      # sizes
    }
  }
`;

export const GET_MY_ORDERS = gql`
  query getMyOrders($user: MongoID!, $page: Int!, $perPage: Int!) {
    getMyOrders(
      page: $page
      perPage: $perPage
      sort: _ID_DESC
      filter: { user: $user }
    ) {
      count
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      items {
        _id
        createdAt
        orderItems {
          createdAt
          product {
            _id
            name
            images
          }
        }
      }
    }
  }
`;

export const GET_SINGLE_ORDER = gql`
  query getOneOrder($user: MongoID!, $orderId: MongoID!) {
    getOneOrder(filter: { user: $user, _id: $orderId }) {
      createdAt
      _id
      user {
        name
        phone
        email
      }
      shippingAddress {
        city
        pinCode
        state
        houseNo
        roadName
        landmark
      }
      orderItems {
        rangePreUnitIdx
        quantity
        createdAt
        orderStatus
        product {
          _id
          name
          images
          brand
          price
          # category
          rangePerUnit {
            pricePerUnit
            qty
          }
        }
      }
    }
  }
`;

export const GET_ORDER_ITEMS_BY_STORE = gql`
  query getOrderItemsByStore(
    $storeId: MongoID!
    $page: Int!
    $perPage: Int!
    $sort: SortFindManyOrderItemInput
  ) {
    getOrderItemsByStore(
      page: $page
      perPage: $perPage
      filter: { storeId: $storeId }
      sort: $sort
    ) {
      count
      pageInfo {
        itemCount
        hasNextPage
        hasPreviousPage
        currentPage
        perPage
      }
      items {
        _id
        createdAt
        quantity
        rangePreUnitIdx
        orderStatus
        storeId {
          _id
          storeName
        }
        orderId {
          shippingAddress {
            city
            pinCode
            state
            houseNo
            roadName
            landmark
          }
          _id
          user {
            name
            phone
            email
          }
        }
        product {
          name
          # category
          images
          price
          rangePerUnit {
            pricePerUnit
            qty
          }
        }
      }
    }
  }
`;

export const GET_MY_CART = gql`
  query getMyCart($user: MongoID!) {
    getMyCart(filter: { user: $user }) {
      products {
        quantity
        rangePreUnitIdx
        product {
          _id
          name
          brand
          images
          minOrder
          minOrder
          rangePerUnit {
            pricePerUnit
            qty
          }
          price
          unit
        }
      }
    }
  }
`;

export const GET_MY_WISHLIST = gql`
  query Query($getMyWishlistFilter: FilterFindOneWishlistInput!) {
    getMyWishlist(filter: $getMyWishlistFilter) {
      products {
        product {
          _id
          name
          images
          minOrder
          price
          rangePerUnit {
            pricePerUnit
            qty
          }
          unit
        }
        quantity
        rangePreUnitIdx
      }
    }
  }
`;

export const GET_PRODUCTS_BY_STORE = gql`
  query getProductsByOptions(
    $getProductsByStoreFilter: FilterFindManyProductInput!
    # $getStoreByIdId: MongoID!
    $getProductsByStorePage: Int
    $getProductsByStorePerPage: Int
    $getProductsByStoreSort: SortFindManyProductInput
  ) {
    getProductsByOptions(
      filter: $getProductsByStoreFilter
      page: $getProductsByStorePage
      perPage: $getProductsByStorePerPage
      sort: $getProductsByStoreSort
    ) {
      items {
        _id
        brand
        name
        images
        price
        minOrder
        # category
        description
        unit
        rangePerUnit {
          qty
          pricePerUnit
        }
      }
      count
      count
      pageInfo {
        pageCount
        perPage
        hasNextPage
        hasPreviousPage
        itemCount
        currentPage
      }
    }
    # getStoreById(_id: $getStoreByIdId) {
    #   storeName
    #   _id
    #   categories {
    #     name
    #     _id
    #   }
    # }
  }
`;
export const GET_MY_CHECKOUT = gql`
  query getMyCheckout($user: MongoID!) {
    getMyCheckout(filter: { user: $user }) {
      user {
        name
        shippingAddress {
          __typename
        }
      }
      products {
        quantity
        rangePreUnitIdx
        product {
          _id
          name
          user {
            _id
          }
          storeId {
            _id
          }
          brand
          images
          minOrder
          minOrder
          rangePerUnit {
            pricePerUnit
            qty
          }
          price
          unit
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Query {
    getCategories {
      name
      _id
      hasProduct
      parentCatId {
        _id
      }
    }
  }
`;

export const CHECK_FOR_PHONE = gql`
  query Query($checkForPhoneFilter: FilterFindOneUserInput!) {
    checkForPhone(filter: $checkForPhoneFilter) {
      phone
    }
  }
`;

export const GET_ALL_ORDERS = gql`
  query Query($sort: SortFindManyOrderInput) {
    getAllOrders(sort: $sort) {
      count
      items {
        _id
        createdAt
        totalPrice
        orderItems {
          _id
          orderStatus
          product {
            name
          }
          quantity
        }
      }
    }
  }
`;

export const GET_QUERIES = gql`
  query Query(
    $filter: FilterFindManyQueriesInput!
    $sort: SortFindManyQueriesInput
  ) {
    getProductQuery(filter: $filter, sort: $sort) {
      count
      items {
        content
        createdAt
        userId {
          name
        }
        replies {
          content
          updatedAt
        }
      }
    }
  }
`;

export const GET_STORE_QUERIES = gql`
  query getStoreQueries(
    $sort: SortFindManyQueriesInput
    $filter: FilterFindManyQueriesInput
  ) {
    getProductQuery(sort: $sort, filter: $filter) {
      count
      items {
        _id
        content
        userId {
          name
        }
        createdAt
        productId {
          name
          images
          _id
        }
        replies {
          content
          _id
        }
      }
    }
  }
`;

// export const GET_ORDERS_BY_STORE = gql`;
//   query getOrdersByStore($user: MongoID!, $storeId: MongoID!) {
//     getOrdersByStore(user: $user, storeId: $storeId) {
//       _id
//       createdAt
//       rangePreUnitIdx
//       quantity
//       storeId {
//         _id
//         storeName
//       }
//       orderId {
//         shippingAddress {
//           city
//           pinCode
//           state
//           houseNo
//           roadName
//           landmark
//         }
//         orderId
//         _id
//         user {
//           name
//           phone
//           email
//         }
//       }
//       product {
//         _id
//         name
//         images
//         brand
//         price
//         category
//         rangePerUnit {
//           pricePerUnit
//           qty
//         }
//       }
//     }
//   }
// `;

export const MY_PRODUCTS = gql`
  query Query($filter: FilterFindManyProductInput, $page: Int, $perPage: Int) {
    getProductsByOptions(filter: $filter, page: $page, perPage: $perPage) {
      items {
        queries {
          content
        }
        images
        _id
        name
      }
      count
      pageInfo {
        hasNextPage
        hasPreviousPage
        itemCount
        pageCount
        pageCount
        perPage
        currentPage
      }
    }
  }
`;

export const getProductsByOptionsQuery = async (
  pageParam,
  parent1,
  parent2
) => {
  let getProductsByOptionsFilter;
  if (parent2.length === 0) {
    getProductsByOptionsFilter = {
      _operators: {
        categories: { in: parent1.map(p => p._id) },
      },
    };
  } else {
    getProductsByOptionsFilter = {
      _operators: {
        categories: { in: parent2.map(p => p._id) },
      },
    };
  }

  const { getProductsByOptions } = await client.request(
    gql`
      query Query(
        $getProductsByOptionsFilter: FilterFindManyProductInput
        $getProductsByOptionsPerPage: Int
        $getProductsByOptionsPage: Int
      ) {
        getProductsByOptions(
          filter: $getProductsByOptionsFilter
          perPage: $getProductsByOptionsPerPage
          page: $getProductsByOptionsPage
        ) {
          count
          items {
            name
            _id
            minOrder
            images
            brand
            price
          }
          pageInfo {
            hasPreviousPage
            hasNextPage
            itemCount
            pageCount
            perPage
            currentPage
          }
        }
      }
    `,
    {
      getProductsByOptionsFilter,
      getProductsByOptionsPage: pageParam,
      getProductsByOptionsPerPage: 12,
      // getProductsByStoreSort: sort,
    }
  );

  return {
    products: getProductsByOptions.items,
    currentPage: getProductsByOptions.pageInfo.currentPage,
    pageCount: getProductsByOptions.pageInfo.pageCount,
    perPage: getProductsByOptions.pageInfo.perPage,
    hasNextPage: getProductsByOptions.pageInfo.hasNextPage,
    hasPreviousPage: getProductsByOptions.pageInfo.hasPreviousPage,
    count: getProductsByOptions.count,
  };
};
