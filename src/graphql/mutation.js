import { gql } from "graphql-tag";

export const CREATE_CHATROOM = gql`
  mutation createChatRoom($sellerId: String!) {
    createChatRoom(sellerId: $sellerId) {
      _id
      name
    }
  }
`;

export const REMOVE_NOTIFICATION = gql`
  mutation removeNotify($notifyId: MongoID!, $recipient: MongoID!) {
    notificationRemoveOne(filter: { _id: $notifyId, recipient: $recipient }) {
      record {
        recipient {
          name
        }
        order {
          _id
        }
      }
    }
  }
`;

export const CREATE_MSG = gql`
  mutation createMessage($content: String!, $chatRoom: String!) {
    createMessage(content: $content, chatRoom: $chatRoom)
  }
`;

export const TYPE_MSG_MUTATION = gql`
  mutation ($chatRoomId: String!, $typerId: String!, $istype: Boolean!) {
    typeMsg(chatRoomId: $chatRoomId, typerId: $typerId, istype: $istype)
  }
`;

export const CREATE_STORE = gql`
  mutation addStore(
    $owner: MongoID!
    $storeName: String!
    $aboutStore: String!
    $city: String!
    $state: String!
    $landmark: String!
    $pincode: String!
    $roadName: String!
    $district: String!
    $phone: String!
  ) {
    addStore(
      owner: $owner
      storeName: $storeName
      aboutStore: $aboutStore
      phone: $phone
      city: $city
      state: $state
      landmark: $landmark
      pincode: $pincode
      roadName: $roadName
      district: $district
    ) {
      _id
      # storeName
      # aboutStore
      # phone
      # address {
      #   _id
      #   pincode
      #   city
      #   landmark
      #   roadName
      #   district
      #   state
      # }
      # geocodeAddress {
      #   formattedAddress
      #   coordinates
      #   type
      # }
      # owner {
      #   name
      # }
    }
  }
`;

export const UPDATE_STORE_IMAGES = gql`
  mutation updateStoreImage($storeId: MongoID!, $owner: MongoID!, $images: [String!]!) {
    updateStoreImage(storeId: $storeId, owner: $owner, images: $images)
  }
`;

export const UPDATE_STORE_VIDEO = gql`
  mutation updateStoreVideo($storeId: MongoID!, $owner: MongoID!, $video: String!) {
    updateStoreVideo(storeId: $storeId, owner: $owner, video: $video)
  }
`;

export const UPDATE_STORE_DETAILS = gql`
  mutation Mutation($updeteStoreRecord: UpdateOneStoreInput!, $updeteStoreFilter: FilterUpdateOneStoreInput!) {
    updeteStore(record: $updeteStoreRecord, filter: $updeteStoreFilter) {
      recordId
    }
  }
`;

export const DELETE_STORE_IMAGE = gql`
  mutation deleteStoreImage($storeId: MongoID!, $owner: MongoID!, $image: String!) {
    deleteStoreImage(storeId: $storeId, owner: $owner, image: $image)
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation($updateUserRecord: UpdateOneUserInput!, $updateUserFilter: FilterUpdateOneUserInput!) {
    updateUser(record: $updateUserRecord, filter: $updateUserFilter) {
      recordId
    }
  }
`;

// export const UPDATE_ONE_PRODUCT = gql`
//   mutation updateOneProduct(
//     $_id: MongoID!
//     $user: MongoID!
//     $storeId: MongoID!
//     $name: String!
//     $brand: String!
//     $description: String!
//     $category: EnumProductCategory!
//     $price: Float!
//     $unit: String!
//     $inStock: Float!
//     $minOrder: Float!
//     $rangePerUnit: [UpdateOneProductRangePerUnitInput]!
//   ) {
//     updateOneProduct(
//       filter: { _id: $_id, user: $user, storeId: $storeId }
//       record: {
//         minOrder: $minOrder
//         unit: $unit
//         name: $name
//         brand: $brand
//         description: $description
//         category: $category
//         inStock: $inStock
//         price: $price
//         rangePerUnit: $rangePerUnit
//       }
//     ) {
//       recordId
//     }
//   }
// `;

export const UPDATE_ONE_PRODUCT = gql`
  mutation Mutation(
    $updateOneProductRecord: UpdateOneProductInput!
    $updateOneProductFilter: FilterUpdateOneProductInput!
  ) {
    updateOneProduct(record: $updateOneProductRecord, filter: $updateOneProductFilter) {
      recordId
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation addToCart($quantity: Float!, $productId: String!) {
    addToCart(quantity: $quantity, productId: $productId) {
      _id
    }
  }
`;

export const ADD_TO_CHECKOUT = gql`
  mutation addToCheckout($quantity: Float, $productId: String) {
    addToCheckout(quantity: $quantity, productId: $productId) {
      _id
    }
  }
`;

export const ADD_TO_WISHLIST = gql`
  mutation Mutation($addToWishlistQuantity: Float!, $addToWishlistProductId: String!) {
    addToWishlist(quantity: $addToWishlistQuantity, productId: $addToWishlistProductId) {
      _id
    }
  }
`;

export const ADD_WISHLIST_TO_CART = gql`
  mutation addWishlistToCart($addWishlistToCartWishListItems: [CheckoutItemInput]) {
    addWishlistToCart(wishListItems: $addWishlistToCartWishListItems)
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($productId: String!) {
    removeFromCart(productId: $productId) {
      _id
    }
  }
`;

export const REMOVE_FROM_WISHLIST = gql`
  mutation Mutation($removeFromWishlistProductIds: [MongoID!]!) {
    removeFromWishlist(productIds: $removeFromWishlistProductIds)
  }
`;

export const CREATE_ORDER = gql`
  mutation createOrder(
    $totalPrice: String!
    $shippingAddress: UserShippingAddressInput!
    $checkoutItems: [CheckoutItemInput!]!
    $prodOwnerIds: [String]!
    $storeIds: [String]!
  ) {
    createOrder(
      totalPrice: $totalPrice
      shippingAddress: $shippingAddress
      checkoutItems: $checkoutItems
      storeIds: $storeIds
      prodOwnerIds: $prodOwnerIds
    ) {
      _id
    }
  }
`;

export const CREATE_ONE_PRODUCT = gql`
  mutation Mutation($createOneProductRecord: CreateOneProductInput!) {
    createOneProduct(record: $createOneProductRecord) {
      recordId
    }
  }
`;

export const UPDATE_PRODUCT_VIEWS = gql`
  mutation UpdateProductViews($productId: String!, $viewId: Float!) {
    updateProductViews(productId: $productId, viewId: $viewId) {
      _id
    }
  }
`;

export const ADD_QUERY = gql`
  mutation AddQuery($record: CreateOneQueriesInput!) {
    addQuery(record: $record) {
      recordId
    }
  }
`;

export const REPLY_QUERY = gql`
  mutation ReplyQuery($record: UpdateOneQueriesInput!, $replyQueryFilter: FilterUpdateOneQueriesInput!) {
    replyQuery(record: $record, filter: $replyQueryFilter) {
      recordId
    }
  }
`;

// walmart merge cart mutation and query

export const AdV2 = gql`
  query AdV2(
    $platform: Platform!
    $pageId: String!
    $pageType: PageType!
    $tenant: String!
    $moduleType: ModuleType!
    $pageContext: PageContextIn
    $locationContext: LocationContextIn
    $moduleConfigs: JSON
    $adsContext: AdsContextIn
    $adRequestComposite: AdRequestCompositeIn
  ) {
    adV2(
      platform: $platform
      pageId: $pageId
      pageType: $pageType
      tenant: $tenant
      moduleType: $moduleType
      locationContext: $locationContext
      pageContext: $pageContext
      moduleConfigs: $moduleConfigs
      adsContext: $adsContext
      adRequestComposite: $adRequestComposite
    ) {
      status
      adContent {
        type
        data {
          __typename
          ...AdDataDisplayAdFragment
          __typename
          ...AdDataSponsoredProductsFragment
        }
      }
    }
  }
  fragment AdDataDisplayAdFragment on AdData {
    ... on DisplayAd {
      json
      status
    }
  }
  fragment AdDataSponsoredProductsFragment on AdData {
    ... on SponsoredProducts {
      adUuid
      adExpInfo
      moduleInfo
      products {
        ...ProductFragment
      }
    }
  }
  fragment ProductFragment on Product {
    usItemId
    offerId
    badges {
      flags {
        key
        text
      }
      labels {
        key
        text
      }
      tags {
        key
        text
      }
    }
    priceInfo {
      priceDisplayCodes {
        rollback
        reducedPrice
        eligibleForAssociateDiscount
        clearance
        strikethrough
        submapType
        priceDisplayCondition
        unitOfMeasure
        pricePerUnitUom
      }
      currentPrice {
        price
        priceString
      }
      wasPrice {
        price
        priceString
      }
      priceRange {
        minPrice
        maxPrice
        priceString
      }
      unitPrice {
        price
        priceString
      }
    }
    showOptions
    sponsoredProduct {
      spQs
      clickBeacon
      spTags
    }
    canonicalUrl
    numberOfReviews
    averageRating
    availabilityStatus
    imageInfo {
      thumbnailUrl
      allImages {
        id
        url
      }
    }
    name
    fulfillmentBadge
    classType
    type
    p13nData {
      predictedQuantity
      flags {
        PREVIOUSLY_PURCHASED {
          text
        }
        CUSTOMERS_PICK {
          text
        }
      }
      labels {
        PREVIOUSLY_PURCHASED {
          text
        }
        CUSTOMERS_PICK {
          text
        }
      }
    }
  }
`;

export const MergeAndGetCart = gql`
  mutation MergeAndGetCart(
    $input: MergeAndGetCartInput!
    $detailed: Boolean!
    $includePartialFulfillmentSwitching: Boolean! = false
    $enableAEBadge: Boolean! = false
    $includeQueueing: Boolean! = false
    $includeExpressSla: Boolean! = false
  ) {
    mergeAndGetCart(input: $input) {
      id
      checkoutable
      customer {
        id
        isGuest
      }
      addressMode
      lineItems {
        id
        quantity
        quantityString
        quantityLabel
        createdDateTime
        discounts @include(if: $detailed) {
          key
          displayValue
          displayLabel
          value
          terms
          subType
        }
        displayAddOnServices
        selectedAddOnServices {
          offerId
          quantity
          groupType
          error {
            code
            upstreamErrorCode
            errorMsg
          }
        }
        isPreOrder @include(if: $detailed)
        bundleComponents {
          offerId
          quantity
        }
        selectedVariants @include(if: $detailed) {
          name
          value
        }
        registryId
        registryInfo {
          registryId
          registryType
        }
        fulfillmentPreference
        priceInfo {
          priceDisplayCodes {
            showItemPrice
            priceDisplayCondition
            finalCostByWeight
          }
          itemPrice {
            ...merge_lineItemPriceInfoFragment
          }
          wasPrice {
            ...merge_lineItemPriceInfoFragment
          }
          unitPrice {
            ...merge_lineItemPriceInfoFragment
          }
          linePrice {
            ...merge_lineItemPriceInfoFragment
          }
        }
        product {
          itemType
          offerId
          isAlcohol @include(if: $detailed)
          name @include(if: $detailed)
          sellerType @include(if: $detailed)
          usItemId
          addOnServices @include(if: $detailed) {
            serviceType
            serviceTitle
            serviceSubTitle
            groups {
              groupType
              groupTitle
              assetUrl
              shortDescription
              services {
                displayName
                selectedDisplayName
                offerId
                currentPrice {
                  priceString
                  price
                }
                serviceMetaData
              }
            }
          }
          imageInfo @include(if: $detailed) {
            thumbnailUrl
          }
          sellerId @include(if: $detailed)
          sellerName @include(if: $detailed)
          hasSellerBadge @include(if: $detailed)
          orderLimit @include(if: $detailed)
          orderMinLimit @include(if: $detailed)
          weightUnit @include(if: $detailed)
          weightIncrement @include(if: $detailed)
          salesUnit
          salesUnitType
          fulfillmentType @include(if: $detailed)
          fulfillmentSpeed @include(if: $detailed)
          fulfillmentTitle @include(if: $detailed)
          classType @include(if: $detailed)
          rhPath @include(if: $detailed)
          availabilityStatus @include(if: $detailed)
          brand @include(if: $detailed)
          category @include(if: $detailed) {
            categoryPath
          }
          departmentName @include(if: $detailed)
          configuration @include(if: $detailed)
          snapEligible @include(if: $detailed)
          preOrder @include(if: $detailed) {
            isPreOrder
          }
          badges @include(if: $enableAEBadge) {
            ...BadgesFragment
          }
        }
        wirelessPlan @include(if: $detailed) {
          planId
          mobileNumber
          postPaidPlan {
            ...merge_postpaidPlanDetailsFragment
          }
        }
        fulfillmentSourcingDetails @include(if: $detailed) {
          currentSelection
          requestedSelection
          fulfillmentBadge
        }
        expiresAt @include(if: $includeQueueing)
        showExpirationTimer @include(if: $includeQueueing)
      }
      fulfillment {
        intent
        accessPoint {
          ...merge_accessPointFragment
        }
        reservation {
          ...merge_reservationFragment
        }
        storeId
        displayStoreSnackBarMessage
        homepageBookslotDetails {
          title
          subTitle
          expiryText
          expiryTime
          slotExpiryText
        }
        deliveryAddress {
          addressLineOne
          addressLineTwo
          city
          state
          postalCode
          firstName
          lastName
          id
        }
        fulfillmentItemGroups @include(if: $detailed) {
          ... on FCGroup {
            __typename
            defaultMode
            collapsedItemIds
            startDate
            endDate
            checkoutable
            checkoutableErrors {
              code
              shouldDisableCheckout
              itemIds
              upstreamErrors {
                offerId
                upstreamErrorCode
              }
            }
            priceDetails {
              subTotal {
                ...merge_priceTotalFields
              }
            }
            fulfillmentSwitchInfo {
              fulfillmentType
              benefit {
                type
                price
                itemCount
                date
                isWalmartPlusProgram @include(if: $detailed)
              }
              partialItemIds @include(if: $includePartialFulfillmentSwitching)
            }
            shippingOptions {
              __typename
              itemIds
              availableShippingOptions {
                __typename
                id
                shippingMethod
                deliveryDate
                price {
                  __typename
                  displayValue
                  value
                }
                label {
                  prefix
                  suffix
                }
                isSelected
                isDefault
                slaTier
              }
            }
            hasMadeShippingChanges
            slaGroups {
              __typename
              label
              sellerGroups {
                __typename
                id
                name
                isProSeller
                type
                catalogSellerId
                shipOptionGroup {
                  __typename
                  deliveryPrice {
                    __typename
                    displayValue
                    value
                  }
                  itemIds
                  shipMethod @include(if: $detailed)
                }
              }
              warningLabel
            }
          }
          ... on SCGroup {
            __typename
            defaultMode
            collapsedItemIds
            checkoutable
            checkoutableErrors {
              code
              shouldDisableCheckout
              itemIds
              upstreamErrors {
                offerId
                upstreamErrorCode
              }
            }
            priceDetails {
              subTotal {
                ...merge_priceTotalFields
              }
            }
            fulfillmentSwitchInfo {
              fulfillmentType
              benefit {
                type
                price
                itemCount
                date
                isWalmartPlusProgram @include(if: $detailed)
              }
              partialItemIds @include(if: $includePartialFulfillmentSwitching)
            }
            itemGroups {
              __typename
              label
              itemIds
            }
            accessPoint {
              ...merge_accessPointFragment
            }
            reservation {
              ...merge_reservationFragment
            }
          }
          ... on DigitalDeliveryGroup {
            __typename
            defaultMode
            collapsedItemIds
            checkoutable
            checkoutableErrors {
              code
              shouldDisableCheckout
              itemIds
              upstreamErrors {
                offerId
                upstreamErrorCode
              }
            }
            priceDetails {
              subTotal {
                ...merge_priceTotalFields
              }
            }
            itemGroups {
              __typename
              label
              itemIds
            }
          }
          ... on Unscheduled {
            __typename
            defaultMode
            collapsedItemIds
            checkoutable
            checkoutableErrors {
              code
              shouldDisableCheckout
              itemIds
              upstreamErrors {
                offerId
                upstreamErrorCode
              }
            }
            priceDetails {
              subTotal {
                ...merge_priceTotalFields
              }
            }
            itemGroups {
              __typename
              label
              itemIds
            }
            accessPoint {
              ...merge_accessPointFragment
            }
            reservation {
              ...merge_reservationFragment
            }
            fulfillmentSwitchInfo {
              fulfillmentType
              benefit {
                type
                price
                itemCount
                date
                isWalmartPlusProgram @include(if: $detailed)
              }
              partialItemIds @include(if: $includePartialFulfillmentSwitching)
            }
            isSpecialEvent @include(if: $enableAEBadge)
          }
          ... on AutoCareCenter {
            __typename
            defaultMode
            collapsedItemIds
            startDate
            endDate
            accBasketType
            checkoutable
            checkoutableErrors {
              code
              shouldDisableCheckout
              itemIds
              upstreamErrors {
                offerId
                upstreamErrorCode
              }
            }
            priceDetails {
              subTotal {
                ...merge_priceTotalFields
              }
            }
            itemGroups {
              __typename
              label
              itemIds
            }
            accessPoint {
              ...merge_accessPointFragment
            }
            reservation {
              ...merge_reservationFragment
            }
            fulfillmentSwitchInfo {
              fulfillmentType
              benefit {
                type
                price
                itemCount
                date
                isWalmartPlusProgram @include(if: $detailed)
              }
              partialItemIds @include(if: $includePartialFulfillmentSwitching)
            }
          }
        }
        suggestedSlotAvailability @include(if: $detailed) {
          isPickupAvailable
          isDeliveryAvailable
          nextPickupSlot {
            startTime
            endTime
            slaInMins
          }
          nextDeliverySlot {
            startTime
            endTime
            slaInMins
          }
          nextUnscheduledPickupSlot {
            startTime
            endTime
            slaInMins
          }
          nextSlot {
            __typename
            ... on RegularSlot {
              fulfillmentOption
              fulfillmentType
              startTime
            }
            ... on DynamicExpressSlot {
              fulfillmentOption
              fulfillmentType
              startTime
              slaInMins
            }
            ... on UnscheduledSlot {
              fulfillmentOption
              fulfillmentType
              startTime
              unscheduledHoldInDays
            }
            ... on InHomeSlot {
              fulfillmentOption
              fulfillmentType
              startTime
            }
          }
        }
      }
      priceDetails {
        subTotal {
          value
          displayValue
          label @include(if: $detailed)
          key @include(if: $detailed)
          strikeOutDisplayValue @include(if: $detailed)
          strikeOutValue @include(if: $detailed)
        }
        fees @include(if: $detailed) {
          ...merge_priceTotalFields
        }
        taxTotal @include(if: $detailed) {
          ...merge_priceTotalFields
        }
        grandTotal @include(if: $detailed) {
          ...merge_priceTotalFields
        }
        belowMinimumFee @include(if: $detailed) {
          ...merge_priceTotalFields
        }
        minimumThreshold @include(if: $detailed) {
          value
          displayValue
        }
        ebtSnapMaxEligible @include(if: $detailed) {
          displayValue
          value
        }
      }
      affirm @include(if: $detailed) {
        isMixedPromotionCart
        message {
          description
          termsUrl
          imageUrl
          monthlyPayment
          termLength
          isZeroAPR
        }
        nonAffirmGroup {
          ...nonAffirmGroupFields
        }
        affirmGroups {
          ... on AffirmItemGroup {
            __typename
            message {
              description
              termsUrl
              imageUrl
              monthlyPayment
              termLength
              isZeroAPR
            }
            flags {
              type
              displayLabel
            }
            name
            label
            itemCount
            itemIds
            defaultMode
          }
        }
      }
      migrationLineItems @include(if: $detailed) {
        quantity
        quantityLabel
        quantityString
        accessibilityQuantityLabel
        offerId
        usItemId
        productName
        thumbnailUrl
        addOnService
        priceInfo {
          linePrice {
            value
            displayValue
          }
        }
        selectedVariants {
          name
          value
        }
      }
      checkoutableErrors {
        code
        shouldDisableCheckout
        itemIds
      }
      checkoutableWarnings @include(if: $detailed) {
        code
        itemIds
      }
      operationalErrors {
        offerId
        itemId
        requestedQuantity
        adjustedQuantity
        code
        upstreamErrorCode
      }
      cartCustomerContext {
        ...cartCustomerContextFragment
      }
    }
  }
  fragment merge_lineItemPriceInfoFragment on Price {
    displayValue
    value
  }
  fragment merge_postpaidPlanDetailsFragment on PostPaidPlan {
    espOrderSummaryId
    espOrderId
    espOrderLineId
    warpOrderId
    warpSessionId
    devicePayment {
      ...merge_postpaidPlanPriceFragment
    }
    devicePlan {
      price {
        ...merge_postpaidPlanPriceFragment
      }
      frequency
      duration
      annualPercentageRate
    }
    deviceDataPlan {
      ...merge_deviceDataPlanFragment
    }
  }
  fragment merge_deviceDataPlanFragment on DeviceDataPlan {
    carrierName
    planType
    expiryTime
    activationFee {
      ...merge_postpaidPlanPriceFragment
    }
    planDetails {
      price {
        ...merge_postpaidPlanPriceFragment
      }
      frequency
      name
    }
    agreements {
      ...merge_agreementFragment
    }
  }
  fragment merge_postpaidPlanPriceFragment on PriceDetailRow {
    key
    label
    displayValue
    value
    strikeOutDisplayValue
    strikeOutValue
    info {
      title
      message
    }
  }
  fragment merge_agreementFragment on CarrierAgreement {
    name
    type
    format
    value
    docTitle
    label
  }
  fragment merge_priceTotalFields on PriceDetailRow {
    label
    displayValue
    value
    key
    strikeOutDisplayValue
    strikeOutValue
  }
  fragment merge_accessPointFragment on AccessPoint {
    id
    assortmentStoreId
    name
    nodeAccessType
    fulfillmentType
    fulfillmentOption
    displayName
    timeZone
    address {
      addressLineOne
      addressLineTwo
      city
      postalCode
      state
      phone
    }
  }
  fragment merge_reservationFragment on Reservation {
    expiryTime
    isUnscheduled
    expired
    showSlotExpiredError
    reservedSlot {
      __typename
      ... on RegularSlot {
        id
        price {
          total {
            displayValue
          }
          expressFee {
            displayValue
          }
          baseFee {
            displayValue
          }
          memberBaseFee {
            displayValue
          }
        }
        accessPointId
        fulfillmentOption
        startTime
        fulfillmentType
        slotMetadata
        endTime
        available
        supportedTimeZone
        isAlcoholRestricted
      }
      ... on DynamicExpressSlot {
        id
        price {
          total {
            displayValue
          }
          expressFee {
            displayValue
          }
          baseFee {
            displayValue
          }
          memberBaseFee {
            displayValue
          }
        }
        accessPointId
        fulfillmentOption
        startTime
        fulfillmentType
        slotMetadata
        available
        sla @include(if: $includeExpressSla) {
          value
          displayValue
        }
        slaInMins
        maxItemAllowed
        supportedTimeZone
        isAlcoholRestricted
      }
      ... on UnscheduledSlot {
        price {
          total {
            displayValue
          }
          expressFee {
            displayValue
          }
          baseFee {
            displayValue
          }
          memberBaseFee {
            displayValue
          }
        }
        accessPointId
        fulfillmentOption
        startTime
        fulfillmentType
        slotMetadata
        unscheduledHoldInDays
        supportedTimeZone
      }
      ... on InHomeSlot {
        id
        price {
          total {
            displayValue
          }
          expressFee {
            displayValue
          }
          baseFee {
            displayValue
          }
          memberBaseFee {
            displayValue
          }
        }
        accessPointId
        fulfillmentOption
        startTime
        fulfillmentType
        slotMetadata
        endTime
        available
        supportedTimeZone
        isAlcoholRestricted
      }
    }
  }
  fragment nonAffirmGroupFields on NonAffirmGroup {
    label
    itemCount
    itemIds
    collapsedItemIds
  }
  fragment cartCustomerContextFragment on CartCustomerContext {
    isMembershipOptedIn
    isEligibleForFreeTrial
    membershipData {
      isActiveMember
      isPaidMember
    }
    paymentData {
      hasCreditCard
      hasCapOne
      hasDSCard
      hasEBT
      isCapOneLinked
      showCapOneBanner
    }
  }
  fragment BadgesFragment on UnifiedBadge {
    flags {
      __typename
      ... on BaseBadge {
        id
        text
        key
        query
      }
      ... on PreviouslyPurchasedBadge {
        id
        text
        key
        lastBoughtOn
        numBought
        criteria {
          name
          value
        }
      }
    }
    labels {
      __typename
      ... on BaseBadge {
        id
        text
        key
      }
      ... on PreviouslyPurchasedBadge {
        id
        text
        key
        lastBoughtOn
        numBought
      }
    }
    tags {
      __typename
      ... on BaseBadge {
        id
        text
        key
      }
    }
  }
`;
