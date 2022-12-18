import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import { gql } from "graphql-request";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomSheet, Icon, Image, ListItem } from "react-native-elements";
import { Button, HelperText, Snackbar, TextInput } from "react-native-paper";
import { useMutation, useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { client, ssrClient } from "../../../../../client";
import Layout from "../../../../../components/Layout";
import CustomLoader from "../../../../../components/Layout/CustomLoader";
import {
  accentColor,
  deleteColor,
  lightText,
  primaryColor,
  textColor,
} from "../../../../../Constant/color";
import { ScreenState } from "../../../../../context/state/screenState";
import { UserState } from "../../../../../context/state/userState";
import {
  CREATE_ONE_PRODUCT,
  UPDATE_ONE_PRODUCT,
} from "../../../../../graphql/mutation";
import { GET_MY_PRODUCT_DETAILS } from "../../../../../graphql/query";

const updateProduct = async (variables) => {
  const { updateOneProduct } = await client.request(
    UPDATE_ONE_PRODUCT,
    variables
  );
  return updateOneProduct;
};

const addProduct = async (variables) => {
  const { createOneProduct } = await client.request(
    CREATE_ONE_PRODUCT,
    variables
  );
  return createOneProduct;
};

function AddProduct() {
  const router = useRouter();
  const { storeId, productId } = router.query;
  console.log("---router---", router);
  const {
    state: {
      user: { _id },
    },
  } = UserState();

  const { show, md, lgSidebar, smSidebar, screenWidth } = ScreenState();

  const { data, isLoading, isError, isSuccess } = useQuery(
    "addStore",
    async () => {
      const data = await client.request(
        gql`
          query Query($filter: FilterFindOneStoreInput!) {
            getMyStore(filter: $filter) {
              categories {
                name
                _id
              }
            }
          }
        `,
        {
          filter: {
            _id: storeId,
          },
        }
      );
      console.log("---storedata---", data);

      return data;
    },
    {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onSuccess: (d) => {
        console.log(d);
        setStoreCategories(d.getMyStore);
      },
      onerror: (e) => {
        console.error(e);
      },
    }
  );
  const { isLoading: pLoading } = useQuery(
    "prodDetails",
    async () => {
      const data = await client.request(GET_MY_PRODUCT_DETAILS, {
        user: _id,
        productId,
      });
      console.log("---storedata---", data);

      return data;
    },
    {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: !!productId,
      onSuccess: (d) => {
        setProduct(d.getMyProductDetails);
        setRangePerUnit(d.getMyProductDetails.rangePerUnit);
        setProductDetails(d.getMyProductDetails.details);
        setImages(
          d.getMyProductDetails.images.map((im) => ({ uri: im, id: uuidv4() }))
        );
        const newproduct = d.getMyProductDetails;
        console.log("---newproduct----", newproduct);
        formik.setValues({
          name: newproduct?.name ? newproduct.name : "",
          brand: newproduct?.brand ? newproduct.brand : "",
          category:
            newproduct?.categories.length > 0 ? newproduct.categories[0] : {},
          categories: storeCategories ? storeCategories : [],
          description: newproduct?.description ? newproduct.description : "",
          price: newproduct?.price ? newproduct.price : 1,
          unit: newproduct?.unit ? newproduct.unit : "Piece",
          inStock: newproduct?.inStock ? newproduct.inStock : 1,
          minOrder: newproduct?.minOrder ? newproduct.minOrder : 1,
          pricePerUnit: newproduct?.price ? newproduct.price : 1,
          qty: newproduct?.minOrder ? newproduct.minOrder : 1,
          fieldName: "",
          fieldValue: "",
        });
      },
      onerror: (e) => {
        console.error(e);
      },
    }
  );

  const [storeCategories, setStoreCategories] = useState(null);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const [loading, setloading] = useState(false);

  const [visible, setVisible] = useState(false);

  const [snackVisible, setsnackVisible] = useState(false);

  const [showSellingCapacity, setShowSellingCapacity] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const onToggleDetails = () => setShowDetails(!showDetails);
  const onToggleSellingCapacity = () =>
    setShowSellingCapacity(!showSellingCapacity);

  const onToggleSnackBar = () => setsnackVisible(!snackVisible);

  const onDismissSnackBar = () => setsnackVisible(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const [images, setImages] = useState(
    // product?.images ? product.images.map((i) => ({ id: uuidv4(), uri: i })) :
    []
  );

  // const addProductMutation = useMutation(AddProductMutation);
  const addProductMutation = useMutation(addProduct);

  const {
    mutate: updateProductMutate,
    isLoading: updateMsgLoading,
    isError: updateMsgError,
  } = useMutation(updateProduct, {
    onSuccess: () => setloading(false),
    onError: (e) => console.error(e),
  });

  const formik = useFormik({
    initialValues: {
      name: product?.name ? product.name : "",
      brand: product?.brand ? product.brand : "",
      category: product?.categories.length > 0 ? product.categories[0] : {},
      categories: storeCategories ? storeCategories : [],
      description: product?.description ? product.description : "",
      price: product?.price ? product.price : 1,
      unit: product?.unit ? product.unit : "Piece",
      inStock: product?.inStock ? product.inStock : 1,
      minOrder: product?.minOrder ? product.minOrder : 1,
      pricePerUnit: product?.price ? product.price : 1,
      qty: product?.minOrder ? product.minOrder : 1,
      fieldName: "",
      fieldValue: "",
    },

    onSubmit: async (values, { resetForm }) => {
      const {
        name,
        brand,
        category,
        description,
        inStock,
        price,
        minOrder,
        unit,
        pricePerUnit,
        qty,
      } = values;
      console.log(values);

      if (rangePerUnit.length > 4) {
        setError("Maximum selling capacity 4");
        return;
      }

      if (
        name.trim() === "" ||
        brand.trim() === "" ||
        Object.keys(category).length === 0 ||
        description.trim() === "" ||
        price.toString().trim() === ""
      ) {
        setError("* fields are required");
        return;
      }

      if (
        rangePerUnit.find((e, i) => parseFloat(e.qty) < parseFloat(minOrder)) ||
        rangePerUnit.find(
          (e, i) => parseFloat(e.pricePerUnit) > parseFloat(price)
        )
      ) {
        setError("invalid selling capacity");
        return;
      }

      setloading(true);

      if (!product || !productId) {
        // add product
        console.log("add product");

        if (images.length === 0) {
          setError("please add an image");
          return;
        }
        if (images.length > 10) {
          setError("max image upload is 10");
          return;
        }

        const newImages = await Promise.all(
          images.map((file) => {
            let newpic;

            let data = {
              file: file.uri,
              upload_preset: "ecommerce",
              api_key: process.env.CLOUDNARY_API_KEY,
            };

            return fetch(
              `https://api.cloudinary.com/v1_1/choton/image/upload`,
              {
                body: JSON.stringify(data),
                headers: {
                  "content-type": "application/json",
                },
                method: "POST",
              }
            )
              .then((res) => res.json())
              .then((data) => {
                const imageData = data;
                // newpic = `https://res.cloudinary.com/choton/image/upload/$imgwidth_500/$imgheight_500/$border_10/e_trim/if_w_gte_h,w_$imgwidth_sub_$border_mul_2/if_else,h_$imgheight_sub_$border_mul_2/bo_10px_solid_rgb:ffffff00/c_pad,w_$imgwidth,h_$imgheight,b_rgb:ffffff/q_auto,f_auto/${
                //   imageData.secure_url.split("/")[6]
                //   }/${imageData.secure_url.split("/")[7].split(".")[0]}.webp`;

                newpic = `https://res.cloudinary.com/choton/image/upload/$imgwidth_1600/$imgheight_900/$border_10/e_trim/if_w_gte_h,w_$imgwidth_sub_$border_mul_2/if_else,h_$imgheight_sub_$border_mul_2/bo_10px_solid_rgb:ffffff00/c_limit,w_$imgwidth,h_$imgheight,b_rgb:ffffff/q_100,f_auto/${
                  imageData.secure_url.split("/")[6]
                }/${imageData.secure_url.split("/")[7].split(".")[0]}.webp`;

                // newpic = `https://res.cloudinary.com/choton/image/upload/w_1600,h_900,c_limit/${
                //   imageData.secure_url.split("/")[6]
                // }/${imageData.secure_url.split("/")[7].split(".")[0]}.webp`;

                //  newpic = `https://res.cloudinary.com/choton/image/upload/q_30/${
                //   imageData.secure_url.split("/")[6]
                // }/${imageData.secure_url.split("/")[7].split(".")[0]}.webp`;
                return newpic;
              });
          })
        );

        addProductMutation.mutate(
          {
            createOneProductRecord: {
              name,
              brand,
              user: _id,
              unit,
              // category: category._id,
              categories: [category._id],
              description,
              inStock,
              price,
              images: newImages,
              storeId,
              minOrder,
              rangePerUnit: rangePerUnit.map((r) => ({
                pricePerUnit: r.pricePerUnit,
                qty: r.qty,
              })),
              details:
                productDetails.length > 0
                  ? productDetails.map((r) => ({
                      fieldName: r.fieldName,
                      fieldValue: r.fieldValue,
                    }))
                  : [],
            },
          },
          {
            onError: (e) => console.error(e),
            onSuccess: (d) => {
              console.log(d);
              setImages([]);
              resetForm();
              onToggleSnackBar();
              setProductDetails([]);
              setRangePerUnit([
                {
                  id: uuidv4(),
                  pricePerUnit: 1,
                  qty: 1,
                },
              ]);
              setloading(false);
            },
            onSettled: () => setloading(false),
          }
        );
      } else {
        // update product
        console.log("update product");
        const filterImgs = images.filter((nimg) => nimg.width && nimg.height);
        console.log("---filterImgs---", filterImgs);
        if (filterImgs.length > 0) {
          const newFilterImgs = await Promise.all(
            filterImgs.map((file) => {
              let newpic;

              let data = {
                file: file.uri,
                upload_preset: "ecommerce",
                api_key: process.env.CLOUDNARY_API_KEY,
              };

              return fetch(
                `https://api.cloudinary.com/v1_1/choton/image/upload`,
                {
                  body: JSON.stringify(data),
                  headers: {
                    "content-type": "application/json",
                  },
                  method: "POST",
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  const imageData = data;

                  newpic = `https://res.cloudinary.com/choton/image/upload/$imgwidth_1600/$imgheight_900/$border_10/e_trim/if_w_gte_h,w_$imgwidth_sub_$border_mul_2/if_else,h_$imgheight_sub_$border_mul_2/bo_10px_solid_rgb:ffffff00/c_limit,w_$imgwidth,h_$imgheight,b_rgb:ffffff/q_100,f_auto/${
                    imageData.secure_url.split("/")[6]
                  }/${imageData.secure_url.split("/")[7].split(".")[0]}.webp`;

                  return newpic;
                });
            })
          );
          console.log("---newFilterImgs---", newFilterImgs);
          updateProductMutate(
            {
              updateOneProductFilter: {
                _id: productId,
                // user: _id,
                storeId: storeId,
              },
              updateOneProductRecord: {
                unit,
                inStock,
                minOrder,
                name,
                brand,
                description,
                images: [
                  ...images.filter((nimg) => !nimg.width).map((i) => i.uri),
                  ...newFilterImgs,
                ],
                // category: category._id,
                categories: [category._id],
                inStock,
                price,
                details:
                  productDetails.length > 0
                    ? productDetails.map((r) => ({
                        fieldName: r.fieldName,
                        fieldValue: r.fieldValue,
                      }))
                    : [],
                rangePerUnit: rangePerUnit.map((r) => ({
                  pricePerUnit: r.pricePerUnit,
                  qty: r.qty,
                })),
              },
            },
            {
              onError: (e) => console.error(e),
            }
          );
        } else {
          updateProductMutate(
            {
              updateOneProductFilter: {
                _id: productId,
                // user: _id,
                storeId: storeId,
              },
              updateOneProductRecord: {
                unit,
                inStock,
                minOrder,
                name,
                brand,
                description,
                images: [...images.map((i) => i.uri)],
                // category: category._id,
                categories: [category._id],
                inStock,
                price,
                details:
                  productDetails.length > 0
                    ? productDetails.map((r) => ({
                        fieldName: r.fieldName,
                        fieldValue: r.fieldValue,
                      }))
                    : [],
                rangePerUnit: rangePerUnit.map((r) => ({
                  pricePerUnit: r.pricePerUnit,
                  qty: r.qty,
                })),
              },
            },
            {
              onError: (e) => console.error(e),
            }
          );
        }

        // .then((d) => console.log(d))
        // .catch((e) => console.error(e))
        // .finally(() => setloading(false));
      }
    },
  });

  const [rangePerUnit, setRangePerUnit] = useState(
    product
      ? product?.rangePerUnit.map((r) => ({
          id: uuidv4(),
          pricePerUnit: r.pricePerUnit,
          qty: r.qty,
        }))
      : [
          {
            id: uuidv4(),
            pricePerUnit: formik.values.pricePerUnit,
            qty: formik.values.qty,
          },
        ]
  );

  const [productDetails, setProductDetails] = useState(
    product
      ? product?.details.map((p) => ({
          id: uuidv4(),
          fieldName: p.fieldName,
          fieldValue: p.fieldValue,
        }))
      : []
  );

  console.log("---rangePerUnit---", rangePerUnit);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const id = uuidv4();
      setImages([...images, { ...result, id }]);
    }
  };

  if (isLoading || pLoading) {
    return <CustomLoader />;
  }

  return (
    <Layout title={product ? "Update Product" : "Add Product"}>
      {addProductMutation.isError && (
        <View style={styles.a}>
          <Text style={styles.b}>Something went wrong try again later!</Text>
        </View>
      )}
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: "1rem" }}>
            {product ? `Update product details` : `Add your product details`}
          </Text>
        </View>

        {
          <View style={{ paddingTop: 5 }}>
            <Text style={{ textAlign: "center", fontSize: ".8rem" }}>
              Upload Image
            </Text>
            {images.length > 0 && (
              <TouchableOpacity onPress={() => setImages([])}>
                <Text style={{ textAlign: "center" }}>
                  <Icon name="close" type="material" />
                </Text>
              </TouchableOpacity>
            )}
            <View
              style={{
                borderColor: accentColor,
                borderStyle: "dashed",
                borderWidth: 2,
                margin: 5,
              }}
            >
              <ScrollView
                centerContent
                contentContainerStyle={{
                  flex: 1,
                }}
              >
                {images.length > 0 && (
                  <FlatList
                    contentContainerStyle={{ width: "100%" }}
                    key={(item, idx) => idx.toString()}
                    data={images}
                    centerContent
                    keyExtractor={(item, idx) => idx.toString()}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginVertical: 5,
                          backgroundColor: "#fff",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            setImages(
                              images.filter((img) => img.id !== item.id)
                            )
                          }
                        >
                          <Text style={{ textAlign: "center" }}>
                            <Icon name="close" type="material" />
                          </Text>
                        </TouchableOpacity>
                        <Image
                          transition
                          alt="pic"
                          source={{ uri: item.uri }}
                          style={{
                            width: 200,
                            height: 200,
                            resizeMode: "contain",
                          }}
                        />
                      </View>
                    )}
                  />
                )}
                <TouchableOpacity
                  style={{
                    backgroundColor: accentColor,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    marginVertical: 8,
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{ color: primaryColor, fontSize: 15 }}
                    onPress={pickImage}
                  >
                    Pick an image from camera roll
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        }

        {error.length > 0 && (
          <HelperText
            type="error"
            visible={error.length > 0}
            style={{
              backgroundColor: accentColor,
              textAlign: "center",
              paddingVertical: 5,
            }}
          >
            {error}
          </HelperText>
        )}
        <View>
          <View>
            <Button
              onPress={openMenu}
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
                {Object.keys(formik.values.category).length !== 0
                  ? formik.values.category.name
                  : "Select Category *"}
              </Text>
            </Button>
            <BottomSheet
              isVisible={visible}
              containerStyle={{
                maxWidth: screenWidth,
                width: screenWidth,
                marginHorizontal: "auto",
                overflow: "scroll",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={closeMenu}
                  style={{
                    backgroundColor: "#aaa",
                    width: "100%",
                  }}
                >
                  <Text style={{ textAlign: "center" }}>
                    <Icon name="close" type="material" />
                  </Text>
                </TouchableOpacity>
              </View>
              {storeCategories &&
                storeCategories.categories.length > 0 &&
                storeCategories.categories.map((cat, i) => (
                  <ListItem
                    key={i}
                    containerStyle={{
                      backgroundColor: "#aaa",
                      borderColor: accentColor,
                    }}
                    onPress={() => {
                      formik.setFieldValue("category", cat);
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
                    </ListItem.Content>
                  </ListItem>
                ))}
            </BottomSheet>
            <TextInput
              dense
              label="Name *"
              onChangeText={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              value={formik.values.name}
            />
            <TextInput
              dense
              label="Brand *"
              onChangeText={formik.handleChange("brand")}
              onBlur={formik.handleBlur("brand")}
              value={formik.values.brand}
            />

            <TextInput
              dense
              label="Unit of your product *"
              onChangeText={formik.handleChange("unit")}
              onBlur={formik.handleBlur("unit")}
              value={formik.values.unit}
            />
            <TextInput
              label="Price *"
              left={<TextInput.Affix text="₹ " />}
              onBlur={formik.handleBlur("price")}
              value={formik.values.price}
              keyboardType="numeric"
              onChangeText={(e) => {
                if (isNaN(parseFloat(Number(e)))) {
                  return;
                }

                formik.setFieldValue("price", Number(e));
                formik.setFieldValue("pricePerUnit", Number(e));
                setRangePerUnit([
                  { ...rangePerUnit[0], pricePerUnit: Number(e) },
                  ...rangePerUnit.slice(1),
                ]);
              }}
            />

            <TextInput
              dense
              label="InStock *"
              onChangeText={(e) => {
                if (isNaN(parseFloat(Number(e)))) {
                  return;
                }
                formik.setFieldValue("inStock", Number(e));
              }}
              onBlur={formik.handleBlur("inStock")}
              value={formik.values.inStock}
              keyboardType="numeric"
            />

            <TextInput
              dense
              label="Minimum Order *"
              onChangeText={(e) => {
                if (isNaN(parseFloat(Number(e)))) {
                  return;
                }
                formik.setFieldValue("minOrder", Number(e));
                formik.setFieldValue("qty", Number(e));
                setRangePerUnit([
                  { ...rangePerUnit[0], qty: Number(e) },
                  ...rangePerUnit.slice(1),
                ]);
              }}
              onBlur={formik.handleBlur("minOrder")}
              value={formik.values.minOrder}
              keyboardType="numeric"
            />

            <TextInput
              dense
              label="Description *"
              multiline
              numberOfLines={5}
              onChangeText={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
              value={formik.values.description}
            />

            <Button
              onPress={onToggleSellingCapacity}
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
                Add Selling Capacity
              </Text>
            </Button>

            {showSellingCapacity && (
              <View
                style={{
                  justifyContent: "center",
                  borderRadius: 5,
                  borderColor: accentColor,
                  borderWidth: 2,
                  padding: 10,
                  backgroundColor: textColor,
                }}
              >
                {rangePerUnit.length > 0 &&
                  rangePerUnit.map((r, i) => (
                    <View
                      key={i}
                      style={{
                        flexDirection: "row",
                        marginBottom: 6,
                        padding: 4,
                        backgroundColor: accentColor,
                        borderRadius: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          flex: 4,
                          justifyContent: "space-around",
                        }}
                      >
                        <Text style={{ color: textColor, marginRight: 5 }}>
                          PricePerUnit :{" "}
                          <Text
                            style={{ fontWeight: "700", color: primaryColor }}
                          >
                            ₹ {r.pricePerUnit} ;
                          </Text>
                        </Text>
                        <Text style={{ color: textColor }}>
                          Qty : {">="}
                          <Text
                            style={{ fontWeight: "700", color: primaryColor }}
                          >
                            {" "}
                            {r.qty}
                          </Text>
                        </Text>
                      </View>
                      {i !== 0 && (
                        <TouchableOpacity>
                          <ListItem.Chevron
                            onPress={() =>
                              setRangePerUnit(
                                rangePerUnit.filter(
                                  (notr, i) => notr.id !== r.id
                                )
                              )
                            }
                            name="delete"
                            type="material"
                            size={15}
                            color={deleteColor}
                            style={{ marginTop: 2, marginRight: 5 }}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                <View style={{ flexDirection: "column" }}>
                  <TextInput
                    dense
                    label="Price per unit *"
                    onChangeText={(e) => {
                      if (isNaN(parseFloat(Number(e)))) {
                        return;
                      }
                      formik.setFieldValue("pricePerUnit", Number(e));
                    }}
                    onBlur={formik.handleBlur("pricePerUnit")}
                    value={formik.values.pricePerUnit}
                    left={<TextInput.Affix text="₹ " />}
                    keyboardType="numeric"
                  />
                  <TextInput
                    dense
                    label="Selling range *"
                    keyboardType="numeric"
                    onChangeText={(e) => {
                      if (isNaN(parseFloat(Number(e)))) {
                        return;
                      }
                      formik.setFieldValue("qty", Number(e));
                    }}
                    onBlur={formik.handleBlur("qty")}
                    value={formik.values.qty}
                  />
                  <Button
                    style={{ backgroundColor: accentColor }}
                    onPress={() => {
                      if (
                        rangePerUnit.find(
                          (v) =>
                            v.pricePerUnit === formik.values.pricePerUnit ||
                            v.qty === formik.values.qty
                        )
                      )
                        return;
                      if (
                        formik.values.pricePerUnit < 0 ||
                        formik.values.qty < 0
                      )
                        return;
                      if (
                        parseFloat(formik.values.pricePerUnit) >
                          parseFloat(
                            rangePerUnit[rangePerUnit.length - 1].pricePerUnit
                          ) ||
                        parseFloat(formik.values.qty) <
                          parseFloat(rangePerUnit[rangePerUnit.length - 1].qty)
                      ) {
                        console.log(
                          parseFloat(
                            rangePerUnit[rangePerUnit.length - 1].pricePerUnit
                          ),
                          parseFloat(formik.values.pricePerUnit),
                          parseFloat(formik.values.qty),
                          parseFloat(rangePerUnit[rangePerUnit.length - 1].qty)
                        );
                        console.log("runn");
                        return;
                      }

                      setRangePerUnit([
                        ...rangePerUnit,
                        {
                          id: uuidv4(),
                          pricePerUnit: formik.values.pricePerUnit,
                          qty: formik.values.qty,
                        },
                      ]);

                      // formik.setFieldValue("pricePerUnit", 0);
                      // formik.setFieldValue("qty", 1);
                    }}
                  >
                    Set Selling Capacity
                  </Button>
                </View>
              </View>
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
                Add Product Details
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
                          name="cancel"
                          size={15}
                          onPress={() =>
                            setProductDetails(
                              productDetails.filter(
                                (np) => np.id.toString() !== p.id.toString()
                              )
                            )
                          }
                        />
                        <TextInput
                          dense
                          label="Enter field name"
                          value={p.fieldName}
                          onChangeText={(e) => {
                            if (
                              productDetails.some(
                                (np) => np.id.toString() === p.id.toString()
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
                                (np) => np.id.toString() === p.id.toString()
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
                    value={formik.values.fieldName}
                    onChangeText={(e) => {
                      formik.setFieldValue("fieldName", e);
                    }}
                    onBlur={formik.handleBlur("fieldName")}
                  />
                  <TextInput
                    dense
                    label="Enter field values"
                    multiline
                    numberOfLines={5}
                    value={formik.values.fieldValue}
                    onChangeText={(e) => {
                      formik.setFieldValue("fieldValue", e);
                    }}
                    onBlur={formik.handleBlur("fieldValue")}
                  />
                  <Button
                    style={{ backgroundColor: accentColor }}
                    onPress={() => {
                      setProductDetails([
                        ...productDetails,
                        {
                          id: uuidv4(),
                          fieldName: formik.values.fieldName,
                          fieldValue: formik.values.fieldValue,
                        },
                      ]);

                      formik.setFieldValue("fieldValue", "");
                      formik.setFieldValue("fieldName", "");
                    }}
                  >
                    Add details
                  </Button>
                </View>
              </View>
            )}

            <Button
              mode="contained"
              onPress={formik.handleSubmit}
              contentStyle={{ width: "100%" }}
              labelStyle={{
                color: lightText,
                fontWeight: "bold",
              }}
              icon="plus"
              disabled={
                loading || addProductMutation.isLoading || updateMsgLoading
              }
              loading={
                loading || addProductMutation.isLoading || updateMsgLoading
              }
              style={{
                fles: 1,
                height: "45px",
                backgroundColor: accentColor,
                justifyContent: "center",
                // borderRadius: 0,
                // borderColor: primaryColor,
                // borderWidth: 2,
              }}
            >
              {product ? "Update" : "Add"}
            </Button>
          </View>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackVisible}
        onDismiss={onDismissSnackBar}
        wrapperStyle={{
          // width: "100%",
          // backgroundColor: "#aaa",
          bottom: 66,
          // left: 0,
          // right: 0,
        }}
        style={{ backgroundColor: "#aaa", boxShadow: "none" }}
      >
        <Text style={{ color: accentColor, fontWeight: "600" }}>
          We have successfully added your product, please check your store.
        </Text>
      </Snackbar>
    </Layout>
  );
}

const styles = StyleSheet.create({
  a: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: accentColor,
    zIndex: 100,
    minHeight: 30,
  },
  b: { color: primaryColor, fontWeight: "600" },
});

export default AddProduct;

// export async function getServerSideProps(ctx) {
//   const { storeId } = ctx.params;
//   const { productId } = ctx.query;
//   const { token } = parseCookies(ctx);
//   console.log("---ctx---", token);

//   if (!token) {
//     return {
//       notFound: true,
//     };
//   }
//   const decode = jwt_decode(token);

//   if (decode.role === "user") {
//     return {
//       notFound: true,
//     };
//   }

//   const { getMyStore: storeCategories } = await ssrClient(token).request(
//     gql`
//       query Query($filter: FilterFindOneStoreInput!) {
//         getMyStore(filter: $filter) {
//           categories {
//             name
//             _id
//           }
//         }
//       }
//     `,
//     {
//       filter: {
//         _id: storeId,
//         // owner: decode.id,
//       },
//     }
//   );

//   if (productId && token) {
//     const data = await ssrClient(token).request(GET_MY_PRODUCT_DETAILS, {
//       user: decode.id,
//       productId,
//     });

//     return {
//       props: {
//         token,
//         storeId,
//         productId,
//         data: data,
//         storeCategories,
//       },
//     };
//   }
//   return {
//     props: {
//       token,
//       storeId,
//       productId: null,
//       data: { getMyProductDetails: null },
//       storeCategories,
//     },
//   };
// }

// useEffect(() => {
//   (async () => {
//     if (Platform.OS !== "web") {
//       const { status } =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== "granted") {
//         alert("Sorry, we need camera roll permissions to make this work!");
//       }
//     }
//   })();
// }, []);

// const pickImage = async () => {
//   let result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.All,
//     allowsEditing: true,
//     aspect: [4, 3],
//     quality: 1,
//     base64: true,
//   });

//   if (!result.cancelled) {
//     setImages([...images, result.uri]);
//   }
// };

// let data = {
//   file: image,
//   upload_preset: "treazer",
//   api_key: process.env.CLOUDNARY_API_KEY,
// };

// fetch(`https://api.cloudinary.com/v1_1/toton007/image/upload`, {
//   body: JSON.stringify(data),
//   headers: {
//     "content-type": "application/json",
//   },
//   method: "POST",
// })
//   .then((res) => res.json())
//   .then((data) => {
//     const pic = `https://res.cloudinary.com/toton007/image/upload/ar_4:3,c_fill/c_scale,q_30,w_auto,dpr_auto/${
//       data.secure_url.split("/")[6]
//     }/${data.secure_url.split("/")[7].split(".")[0]}.webp`;
//     console.log(pic);
//     mutation.mutate(
//       {
//         name,
//         brand,
//         image: pic,
//         category,
//         description,
//         inStock,
//         price,
//       },
//       {
//         onSuccess: () => {
//           setImages(null);
//           resetForm();
//           onToggleSnackBar();
//         },
//       }
//     );
//   })
//   .catch((e) => {
//     console.error(e);
//     setError("oops something went wrong!!");
//   })
//   .finally(() => {
//     setloading(false);
//   });
