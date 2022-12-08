import { Formik } from "formik";
import jwtDecode from "jwt-decode";
import { Actionsheet, Badge, Box, CheckIcon, Flex, Select } from "native-base";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon, ListItem, Overlay } from "react-native-elements";
import { Button, Chip, TextInput } from "react-native-paper";
import { useMutation } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { client, ssrClient } from "../../../../client";
import Layout from "../../../../components/Layout";
import { accentColor, deleteColor, primaryColor, textColor } from "../../../../Constant/color";
import { ScreenState } from "../../../../context/state/screenState";
import { UPDATE_STORE_DETAILS } from "../../../../graphql/mutation";
import { GET_MY_STORE_DETAILS } from "../../../../graphql/query";

const updateStore = async variables => {
  const { updeteStore } = await client.request(UPDATE_STORE_DETAILS, variables);
  return updeteStore;
};

export default function UpdateStore({ storeId, data: { getMyStoreDetails, getCategories } }) {
  // const {
  //   state: {
  //     user: { _id },
  //   },
  // } = UserState();

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const { screenWidth } = ScreenState();

  const [showDetails, setShowDetails] = useState(false);
  const [productDetails, setProductDetails] = useState(
    getMyStoreDetails?.details
      ? getMyStoreDetails?.details.map(p => ({
          id: uuidv4(),
          fieldName: p.fieldName,
          fieldValue: p.fieldValue,
        }))
      : []
  );

  const onToggleDetails = () => setShowDetails(!showDetails);

  const { mutate, isLoading, isError } = useMutation(updateStore, {
    onSuccess: d => console.log(d),
    onError: e => console.error(e),
  });

  return (
    <Layout title='Update store'>
      <ScrollView contentContainerStyle={styles.b}>
        <View style={styles.c}>
          <Text style={styles.d}>{getMyStoreDetails?.storeName}</Text>
        </View>
        <Formik
          initialValues={{
            storeName: getMyStoreDetails ? getMyStoreDetails.storeName : "",
            aboutStore: getMyStoreDetails ? getMyStoreDetails.aboutStore : "",
            phone: getMyStoreDetails ? getMyStoreDetails.phone : "",
            pincode: getMyStoreDetails ? getMyStoreDetails.address.pincode : "",
            selectedCategories: getMyStoreDetails.categories.length > 0 ? [...getMyStoreDetails.categories] : [],
            // selectedCategories: [],
            city: getMyStoreDetails ? getMyStoreDetails.address.city : "",
            state: getMyStoreDetails ? getMyStoreDetails.address.state : "",
            district: getMyStoreDetails ? getMyStoreDetails.address.district : "",
            roadName: getMyStoreDetails ? getMyStoreDetails.address.roadName : "",
            landmark: getMyStoreDetails ? getMyStoreDetails.address.landmark : "",
            fieldName: "",
            fieldValue: "",
          }}
          onSubmit={values => {
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
                categories: values.selectedCategories.map(c => c._id.toString()),
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
                    ? productDetails.map(r => ({
                        fieldName: r.fieldName,
                        fieldValue: r.fieldValue,
                      }))
                    : [],
              },
            });
          }}>
          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, initialValues, errors, touched }) => (
            <View style={{}}>
              <TextInput
                label='Store Name *'
                onChangeText={handleChange("storeName")}
                onBlur={handleBlur("storeName")}
                value={values.storeName}
              />
              <TextInput
                label='About your store *'
                multiline
                numberOfLines={5}
                onChangeText={handleChange("aboutStore")}
                onBlur={handleBlur("aboutStore")}
                value={values.aboutStore}
              />

              <TextInput
                label='Phone'
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
              />
              <TextInput
                label='Pin-code *'
                onChangeText={handleChange("pincode")}
                onBlur={handleBlur("pincode")}
                value={values.pincode}
              />

              <TextInput
                label='City *'
                onChangeText={handleChange("city")}
                onBlur={handleBlur("city")}
                value={values.city}
              />
              <TextInput
                label='State *'
                onChangeText={handleChange("state")}
                onBlur={handleBlur("state")}
                value={values.state}
              />
              <TextInput
                label='district *'
                onChangeText={handleChange("district")}
                onBlur={handleBlur("district")}
                value={values.district}
              />
              <TextInput
                label='RoadName *'
                onChangeText={handleChange("roadName")}
                onBlur={handleBlur("roadName")}
                value={values.roadName}
              />
              <TextInput
                label='Landmark *'
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
                  }}>
                  <Text style={{ color: textColor, textAlign: "center" }}>All Store Categories</Text>
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {values.selectedCategories.map((cat, i) => (
                    <Chip
                      textStyle={{ color: accentColor }}
                      key={i}
                      icon={() => (
                        <Icon
                          size={15}
                          name='delete'
                          color={deleteColor}
                          type='material'
                          onPress={() => {
                            setFieldValue(
                              "selectedCategories",
                              values.selectedCategories.filter(c => c._id.toString() !== cat._id.toString())
                            );
                          }}
                        />
                      )}>
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
                    {getCategories.length > 0 &&
                      getCategories.map((cat, i) => (
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

                <Button
                  onPress={openMenu}
                  contentStyle={{
                    backgroundColor: accentColor,
                    borderColor: "#aaa",
                    borderWidth: 2,
                  }}>
                  Select categories
                </Button>

                <Actionsheet
                  isOpen={visible}
                  onClose={() => setVisible(false)}
                  maxW={screenWidth}
                  w={screenWidth}
                  mx={"auto"}
                  hideDragIndicator>
                  <Actionsheet.Content w={"full"} borderTopRadius='0'>
                    <TouchableOpacity style={{ padding: 10 }} onPress={closeMenu}>
                      <Icon size={30} type='material' name='cancel' />
                    </TouchableOpacity>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 10,
                      }}>
                      <Text style={{ fontSize: 15, fontWeight: "500" }}>Add Collections to Store</Text>
                    </View>
                    <ScrollView style={{ width: "100%" }} contentContainerStyle={{ width: "100%" }}>
                      {getCategories.length > 0 &&
                        getCategories.map((cat, i) => (
                          <ListItem
                            key={i}
                            bottomDivider
                            onPress={() => {
                              if (values.selectedCategories.some(c => c._id.toString() === cat._id.toString())) {
                                setFieldValue("selectedCategories", [...values.selectedCategories]);
                              } else {
                                setFieldValue("selectedCategories", [...values.selectedCategories, cat]);
                              }
                              closeMenu();
                            }}>
                            <ListItem.Content>
                              <ListItem.Title
                                style={{
                                  color: accentColor,
                                  fontWeight: "500",
                                }}>
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

                <Button
                  onPress={onToggleDetails}
                  contentStyle={{
                    backgroundColor: accentColor,
                    borderColor: "#aaa",
                    borderWidth: 2,
                  }}>
                  <Text
                    style={{
                      color: primaryColor,
                      fontWeight: "500",
                    }}>
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
                    }}>
                    {productDetails.length > 0 && (
                      <View
                        style={{
                          // flexDirection: "row",
                          justifyContent: "space-between",
                        }}>
                        <Text
                          style={{
                            textAlign: "center",
                            fontWeight: "500",
                            fontSize: 15,
                            marginVertical: 10,
                          }}>
                          All Details
                        </Text>
                        {productDetails.map((p, i) => (
                          <View key={i} style={{ gridGap: 5, justifyContent: "center" }}>
                            <Icon
                              type='material'
                              name='delete'
                              size={15}
                              color={deleteColor}
                              onPress={() => {
                                setProductDetails(
                                  productDetails.filter(np => np.id.toString() !== p.id.toString())
                                );
                              }}
                            />
                            <TextInput
                              dense
                              label='Enter field name'
                              value={p.fieldName}
                              onChangeText={e => {
                                if (productDetails.some(np => np.id.toString() === p.id.toString())) {
                                  setProductDetails(
                                    productDetails.map(np =>
                                      np.id.toString() === p.id.toString() ? { ...p, fieldName: e } : np
                                    )
                                  );
                                }
                              }}
                            />
                            <TextInput
                              dense
                              label='Enter field values'
                              multiline
                              // numberOfLines={5}
                              value={p.fieldValue}
                              onChangeText={e => {
                                if (productDetails.some(np => np.id.toString() === p.id.toString())) {
                                  setProductDetails(
                                    productDetails.map(np =>
                                      np.id.toString() === p.id.toString() ? { ...p, fieldValue: e } : np
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
                        label='Enter field name'
                        value={values.fieldName}
                        onChangeText={e => {
                          setFieldValue("fieldName", e);
                        }}
                        // onBlur={formik.handleBlur("fieldName")}
                      />
                      <TextInput
                        dense
                        label='Enter field values'
                        multiline
                        numberOfLines={5}
                        value={values.fieldValue}
                        onChangeText={e => {
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
                        }}>
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
                labelStyle={{ color: "rgb(240, 191, 76)", fontWeight: "bold" }}
                style={styles.btn}>
                Submit
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
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

export async function getServerSideProps(ctx) {
  const { storeId } = ctx.params;

  const { token } = parseCookies(ctx);
  if (!token) {
    return {
      notFound: true,
    };
  }

  const decode = jwtDecode(token);
  if (!token || decode.role === "user") {
    return {
      notFound: true,
    };
  }

  const data = await ssrClient(token).request(GET_MY_STORE_DETAILS, {
    // owner: decode.id,
    storeId,
    getCategoriesFilter: { hasProduct: true },
  });

  return {
    props: {
      storeId,
      data: data || null,
    },
  };
}

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
