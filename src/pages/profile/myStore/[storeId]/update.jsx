import { Formik } from "formik";
import { Actionsheet, Box, Center, CheckIcon, Select } from "native-base";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { Button, Chip, TextInput } from "react-native-paper";
import { useMutation, useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { client } from "../../../../client";
import Layout from "../../../../components/Layout";
import CustomLoader from "../../../../components/Layout/CustomLoader";
import {
  accentColor,
  deleteColor,
  primaryColor,
  textColor,
} from "../../../../Constant/color";
import { ScreenState } from "../../../../context/state/screenState";
import { UPDATE_STORE_DETAILS } from "../../../../graphql/mutation";
import { GET_MY_STORE_DETAILS } from "../../../../graphql/query";

const updateStore = async (variables) => {
  const { updeteStore } = await client.request(UPDATE_STORE_DETAILS, variables);
  return updeteStore;
};

export default function UpdateStore() {
  // const {
  //   state: {
  //     user: { _id },
  //   },
  // } = UserState();

  const {
    query: { storeId },
  } = useRouter();

  const {
    data,
    isLoading: sLoading,
    isSuccess,
  } = useQuery(
    ["storeDetails", storeId],
    async () => {
      const data = await client.request(GET_MY_STORE_DETAILS, {
        storeId,
        getCategoriesFilter: { hasProduct: true },
      });
      console.log("---storedata---", data);

      return data;
    },
    {
      enabled: !!storeId,
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onSuccess: (d) => {
        console.log(d);
        // setGetCategories(d.data.getCategories);
        // setGetMyStoreDetails(d.data.getMyStoreDetails);
      },
      onerror: (e) => {
        console.error(e);
      },
    }
  );

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const { screenWidth } = ScreenState();

  const [getCategories, setGetCategories] = useState(null);
  // const [getMyStoreDetails, setGetMyStoreDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [productDetails, setProductDetails] = useState(
    data && data.getMyStoreDetails?.details
      ? data.getMyStoreDetails?.details.map((p) => ({
          id: uuidv4(),
          fieldName: p.fieldName,
          fieldValue: p.fieldValue,
        }))
      : []
  );

  const onToggleDetails = () => setShowDetails(!showDetails);

  const { mutate, isLoading, isError } = useMutation(updateStore, {
    onSuccess: (d) => console.log(d),
    onError: (e) => console.error(e),
  });

  if (sLoading) {
    return <CustomLoader />;
  }

  return (
    <Layout title="Update store">
      {data && (
        <ScrollView contentContainerStyle={styles.b}>
          <View style={styles.c}>
            <Text style={styles.d}>{data.getMyStoreDetails?.storeName}</Text>
          </View>
          <Formik
            initialValues={{
              storeName: data.getMyStoreDetails
                ? data.getMyStoreDetails.storeName
                : "",
              aboutStore: data.getMyStoreDetails
                ? data.getMyStoreDetails.aboutStore
                : "",
              phone: data.getMyStoreDetails ? data.getMyStoreDetails.phone : "",
              pincode: data.getMyStoreDetails
                ? data.getMyStoreDetails.address.pincode
                : "",
              selectedCategories:
                data.getMyStoreDetails.categories.length > 0
                  ? [...data.getMyStoreDetails.categories]
                  : [],
              // selectedCategories: [],
              city: data.getMyStoreDetails
                ? data.getMyStoreDetails.address.city
                : "",
              state: data.getMyStoreDetails
                ? data.getMyStoreDetails.address.state
                : "",
              district: data.getMyStoreDetails
                ? data.getMyStoreDetails.address.district
                : "",
              roadName: data.getMyStoreDetails
                ? data.getMyStoreDetails.address.roadName
                : "",
              landmark: data.getMyStoreDetails
                ? data.getMyStoreDetails.address.landmark
                : "",
              fieldName: "",
              fieldValue: "",
            }}
            onSubmit={(values) => {
              console.log(values);
              if (
                values.phone.trim() === "" ||
                values.pincode.trim() === "" ||
                values.city.trim() === "" ||
                values.state.trim() === "" ||
                values.district.trim() === "" ||
                values.roadName.trim() === "" ||
                values.landmark.trim() === "" ||
                values.storeName.trim() === "" ||
                values.aboutStore.trim() === "" ||
                values.selectedCategories.length <= 0
              ) {
                alert("* fields are required");
                return;
              }
              mutate({
                updeteStoreFilter: {
                  // owner: _id.toString(),
                  _id: storeId,
                },
                updeteStoreRecord: {
                  storeName: values.storeName,
                  aboutStore: values.aboutStore,
                  phone: values.phone,
                  categories: values.selectedCategories.map((c) =>
                    c._id.toString()
                  ),
                  address: {
                    city: values.city,
                    pincode: values.pincode,
                    landmark: values.landmark,
                    roadName: values.roadName,
                    state: values.state,
                    district: values.district,
                  },
                  details:
                    productDetails.length > 0
                      ? productDetails.map((r) => ({
                          fieldName: r.fieldName,
                          fieldValue: r.fieldValue,
                        }))
                      : [],
                },
              });
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              initialValues,
              errors,
              touched,
            }) => (
              <View style={{}}>
                <TextInput
                  label="Store Name *"
                  onChangeText={handleChange("storeName")}
                  onBlur={handleBlur("storeName")}
                  value={values.storeName}
                />
                <TextInput
                  label="About your store *"
                  multiline
                  numberOfLines={5}
                  onChangeText={handleChange("aboutStore")}
                  onBlur={handleBlur("aboutStore")}
                  value={values.aboutStore}
                />

                <TextInput
                  label="Phone"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
                <TextInput
                  label="Pin-code *"
                  onChangeText={handleChange("pincode")}
                  onBlur={handleBlur("pincode")}
                  value={values.pincode}
                />

                <TextInput
                  label="City *"
                  onChangeText={handleChange("city")}
                  onBlur={handleBlur("city")}
                  value={values.city}
                />
                <TextInput
                  label="State *"
                  onChangeText={handleChange("state")}
                  onBlur={handleBlur("state")}
                  value={values.state}
                />
                <TextInput
                  label="district *"
                  onChangeText={handleChange("district")}
                  onBlur={handleBlur("district")}
                  value={values.district}
                />
                <TextInput
                  label="RoadName *"
                  onChangeText={handleChange("roadName")}
                  onBlur={handleBlur("roadName")}
                  value={values.roadName}
                />
                <TextInput
                  label="Landmark *"
                  onChangeText={handleChange("landmark")}
                  onBlur={handleBlur("landmark")}
                  value={values.landmark}
                />

                <View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingVertical: 10,
                    }}
                  >
                    <Text style={{ color: textColor, textAlign: "center" }}>
                      All Store Categories
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {values.selectedCategories.map((cat, i) => (
                      <Chip
                        textStyle={{ color: accentColor }}
                        key={i}
                        icon={() => (
                          <Icon
                            size={15}
                            name="delete"
                            color={deleteColor}
                            type="material"
                            onPress={() => {
                              setFieldValue(
                                "selectedCategories",
                                values.selectedCategories.filter(
                                  (c) => c._id.toString() !== cat._id.toString()
                                )
                              );
                            }}
                          />
                        )}
                      >
                        {cat.name}
                      </Chip>
                    ))}
                  </View>

                  {/* <Box w='3/4' maxW='300'>
                  <Select
                    selectedValue={""}
                    minWidth='200'
                    accessibilityLabel='Choose Service'
                    placeholder='Choose Service'
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size='5' />,
                    }}
                    mt={1}
                    onValueChange={cat => {
                      if (values.selectedCategories.some(c => c._id.toString() === cat._id.toString())) {
                        setFieldValue("selectedCategories", [...values.selectedCategories]);
                      } else {
                        setFieldValue("selectedCategories", [...values.selectedCategories, cat]);
                      }
                      closeMenu();
                    }}>
                    {data.getCategories.length > 0 &&
                      data.getCategories.map((cat, i) => (
                        <Select.Item
                          key={i}
                          label={cat}
                          value={cat}
                          onPress={() => {
                            if (values.selectedCategories.some(c => c._id.toString() === cat._id.toString())) {
                              setFieldValue("selectedCategories", [...values.selectedCategories]);
                            } else {
                              setFieldValue("selectedCategories", [...values.selectedCategories, cat]);
                            }
                            closeMenu();
                          }}
                        />
                      ))}
                  </Select>
                </Box> */}

                  {/* <Center>
                    <Box maxW="full" w={"full"}>
                      <Select
                        // selectedValue={}
                        // minWidth="200"
                        accessibilityLabel="Choose Service"
                        placeholder="Choose Service"
                        _selectedItem={{
                          bg: "teal.600",
                          endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={(itemValue) =>
                          setFieldValue("selectedCategories", [
                            ...values.selectedCategories,
                            itemValue,
                          ])
                        }
                      >
                        {data &&
                          data.getCategories.length > 0 &&
                          data.getCategories.map((cat, i) => (
                            <Select.Item key={i} label={cat.name} value="ux" />
                          ))}
                      </Select>
                    </Box>
                  </Center> */}

                  <Button
                    onPress={openMenu}
                    contentStyle={{
                      backgroundColor: accentColor,
                      borderColor: "#aaa",
                      borderWidth: 2,
                    }}
                  >
                    Select categories
                  </Button>

                  {data && (
                    <Actionsheet
                      isOpen={data && visible}
                      onClose={() => setVisible(false)}
                      maxW={screenWidth}
                      w={screenWidth}
                      mx={"auto"}
                      hideDragIndicator
                    >
                      <Actionsheet.Content w={"full"} borderTopRadius="0">
                        <TouchableOpacity
                          style={{ padding: 10 }}
                          onPress={closeMenu}
                        >
                          <Icon size={30} type="material" name="cancel" />
                        </TouchableOpacity>
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: 10,
                          }}
                        >
                          <Text style={{ fontSize: 15, fontWeight: "500" }}>
                            Add Collections to Store
                          </Text>
                        </View>
                        <ScrollView
                          style={{ width: "100%" }}
                          contentContainerStyle={{ width: "100%" }}
                        >
                          {data.getCategories.length > 0 &&
                            data.getCategories.map((cat, i) => (
                              <ListItem
                                key={i}
                                bottomDivider
                                onPress={() => {
                                  if (
                                    values.selectedCategories.some(
                                      (c) =>
                                        c._id.toString() === cat._id.toString()
                                    )
                                  ) {
                                    setFieldValue("selectedCategories", [
                                      ...values.selectedCategories,
                                    ]);
                                  } else {
                                    setFieldValue("selectedCategories", [
                                      ...values.selectedCategories,
                                      cat,
                                    ]);
                                  }
                                  closeMenu();
                                }}
                              >
                                <ListItem.Content>
                                  <ListItem.Title
                                    style={{
                                      color: accentColor,
                                      fontWeight: "500",
                                    }}
                                  >
                                    {cat.name}
                                  </ListItem.Title>
                                  {/* <Flex justifyContent={"space-between"}>
                              </Flex> */}
                                  {/* <Badge bg={accentColor} color={primaryColor}>
                                  ADD
                                </Badge> */}
                                </ListItem.Content>
                              </ListItem>
                            ))}
                        </ScrollView>
                      </Actionsheet.Content>
                    </Actionsheet>
                  )}

                  <Button
                    onPress={onToggleDetails}
                    contentStyle={{
                      backgroundColor: accentColor,
                      borderColor: "#aaa",
                      borderWidth: 2,
                    }}
                  >
                    <Text
                      style={{
                        color: primaryColor,
                        fontWeight: "500",
                      }}
                    >
                      Add Store Details
                    </Text>
                  </Button>

                  {showDetails && (
                    <View
                      style={{
                        justifyContent: "center",
                        borderRadius: 5,
                        borderColor: accentColor,
                        borderWidth: 2,
                        padding: 10,
                        gridGap: 10,
                        backgroundColor: textColor,
                      }}
                    >
                      {productDetails.length > 0 && (
                        <View
                          style={{
                            // flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              fontWeight: "500",
                              fontSize: 15,
                              marginVertical: 10,
                            }}
                          >
                            All Details
                          </Text>
                          {productDetails.map((p, i) => (
                            <View
                              key={i}
                              style={{ gridGap: 5, justifyContent: "center" }}
                            >
                              <Icon
                                type="material"
                                name="delete"
                                size={15}
                                color={deleteColor}
                                onPress={() => {
                                  setProductDetails(
                                    productDetails.filter(
                                      (np) =>
                                        np.id.toString() !== p.id.toString()
                                    )
                                  );
                                }}
                              />
                              <TextInput
                                dense
                                label="Enter field name"
                                value={p.fieldName}
                                onChangeText={(e) => {
                                  if (
                                    productDetails.some(
                                      (np) =>
                                        np.id.toString() === p.id.toString()
                                    )
                                  ) {
                                    setProductDetails(
                                      productDetails.map((np) =>
                                        np.id.toString() === p.id.toString()
                                          ? { ...p, fieldName: e }
                                          : np
                                      )
                                    );
                                  }
                                }}
                              />
                              <TextInput
                                dense
                                label="Enter field values"
                                multiline
                                // numberOfLines={5}
                                value={p.fieldValue}
                                onChangeText={(e) => {
                                  if (
                                    productDetails.some(
                                      (np) =>
                                        np.id.toString() === p.id.toString()
                                    )
                                  ) {
                                    setProductDetails(
                                      productDetails.map((np) =>
                                        np.id.toString() === p.id.toString()
                                          ? { ...p, fieldValue: e }
                                          : np
                                      )
                                    );
                                  }
                                }}
                              />
                            </View>
                          ))}
                        </View>
                      )}

                      <View style={{ flexDirection: "column" }}>
                        <TextInput
                          dense
                          label="Enter field name"
                          value={values.fieldName}
                          onChangeText={(e) => {
                            setFieldValue("fieldName", e);
                          }}
                          // onBlur={formik.handleBlur("fieldName")}
                        />
                        <TextInput
                          dense
                          label="Enter field values"
                          multiline
                          numberOfLines={5}
                          value={values.fieldValue}
                          onChangeText={(e) => {
                            setFieldValue("fieldValue", e);
                          }}
                          // onBlur={formik.handleBlur("fieldValue")}
                        />
                        <Button
                          style={{ backgroundColor: accentColor }}
                          onPress={() => {
                            setProductDetails([
                              ...productDetails,
                              {
                                id: uuidv4(),
                                fieldName: values.fieldName,
                                fieldValue: values.fieldValue,
                              },
                            ]);

                            setFieldValue("fieldValue", "");
                            setFieldValue("fieldName", "");
                          }}
                        >
                          Add details
                        </Button>
                      </View>
                    </View>
                  )}
                </View>

                <Button
                  onPress={handleSubmit}
                  loading={isLoading}
                  disabled={isLoading}
                  contentStyle={{ width: "100%" }}
                  labelStyle={{
                    color: "rgb(240, 191, 76)",
                    fontWeight: "bold",
                  }}
                  style={styles.btn}
                >
                  Submit
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  a: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(39, 39, 39)",
    zIndex: 100,
    minHeight: 30,
  },
  b: {
    minHeight: "100vh",
    // flex: 1,
    // justifyContent: "center",
    backgroundColor: "rgba(39, 39, 39,.8)",
  },
  btn: {
    width: "100%",
    height: "45px",
    backgroundColor: "rgb(39, 39, 39)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    flex: 1,
  },
  c: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(39, 39, 39,.5)",
    paddingVertical: 10,
  },
  d: {
    color: "rgb(240, 191, 76)",
    marginLeft: 10,
    textAlign: "center",
  },
  e: {
    color: "rgb(240, 191, 76)",
    fontWeight: "600",
  },
  f: {
    flex: 1,
    justifyContent: "space-between",
  },
  g: {
    position: "absolute",
    bottom: 70,
  },
  h: { backgroundColor: "#B12704" },
});

// export async function getServerSideProps(ctx) {
//   const { storeId } = ctx.params;

//   const { token } = parseCookies(ctx);
//   if (!token) {
//     return {
//       notFound: true,
//     };
//   }

//   const decode = jwtDecode(token);
//   if (!token || decode.role === "user") {
//     return {
//       notFound: true,
//     };
//   }

//   const data = await ssrClient(token).request(GET_MY_STORE_DETAILS, {
//     // owner: decode.id,
//     storeId,
//     getCategoriesFilter: { hasProduct: true },
//   });

//   return {
//     props: {
//       storeId,
//       data: data || null,
//     },
//   };
// }

//  <View style={styles.f}>
//    <Snackbar
//      wrapperStyle={styles.g}
//      style={styles.h}
//      visible={false}
//      onDismiss={onDismissSnackBar}
//      action={{
//        label: "Close",
//        onPress: () => {
//          seterror("");
//        },
//      }}
//    >
//      <Text style={{ color: "#fff" }}>{error}</Text>
//    </Snackbar>
//  </View>;

//  {
//    errors.phone && touched.phone && (
//      <HelperText
//        type="error"
//        visible={errors}
//        style={{ backgroundColor: "#ccc" }}
//      >
//        {errors.phone}
//      </HelperText>
//    );
//  }
