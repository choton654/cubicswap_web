import * as ImagePicker from "expo-image-picker";
import jwtDecode from "jwt-decode";
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
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Image } from "react-native-elements/dist/image/Image";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";
import { useMutation, useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { queryClient } from "../../../../api";
import { client, ssrClient } from "../../../../client";
import Layout from "../../../../components/Layout";
import { ScreenState } from "../../../../context/state/screenState";
import {
  DELETE_STORE_IMAGE,
  UPDATE_STORE_IMAGES,
} from "../../../../graphql/mutation";
import { GET_MY_STORE_IMAGES } from "../../../../graphql/query";

const updateImage = async (variables) => {
  const { updateStoreImage } = await client.request(
    UPDATE_STORE_IMAGES,
    variables
  );
  return updateStoreImage;
};

const deleteImage = async (variables) => {
  const { deleteStoreImage } = await client.request(
    DELETE_STORE_IMAGE,
    variables
  );
  return deleteStoreImage;
};

const UploadStoreImages = ({ data: { getMyStoreDetails }, owner, storeId }) => {
  console.log(getMyStoreDetails);

  const { screenWidth, screenHeight, show, md, lgSidebar, smSidebar } =
    ScreenState();

  const [images, setImages] = useState([]);

  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [imgToBeDelete, setImgToBeDelete] = useState("");

  const { data, isLoading, isError, isSuccess } = useQuery(
    "myStoreImages",
    async () => {
      const { getMyStoreDetails } = await client.request(GET_MY_STORE_IMAGES, {
        owner,
        storeId,
      });

      return getMyStoreDetails;
    },
    {
      initialData: getMyStoreDetails,
      retry: false,
      // refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (d) => {
        console.log(d);
      },

      onerror: (e) => {
        console.error(e);
      },
    }
  );

  const updateImageMutation = useMutation(updateImage, {
    onSuccess: async (data) => {
      await queryClient.refetchQueries("myStoreImages");
      setLoading(false);
      setImages([]);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const deleteImageMutation = useMutation(deleteImage, {
    onSuccess: async (data) => {
      await queryClient.refetchQueries("myStoreImages");
      setLoading(false);
      setImages([]);
      setVisible(false);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const handleDelete = (image) => {
    deleteImageMutation.mutate({
      owner,
      storeId,
      image,
    });
  };

  const handleSubmit = async () => {
    console.log(images);
    if (images.length === 0) {
      return;
    }

    setLoading(true);
    const newImages = await Promise.all(
      images.map((file) => {
        let newpic;

        let data = {
          file: file.uri,
          upload_preset: "ecommerce",
          api_key: process.env.CLOUDNARY_API_KEY,
        };

        return fetch(`https://api.cloudinary.com/v1_1/choton/image/upload`, {
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
        })
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

    updateImageMutation.mutate({
      owner,
      storeId,
      images: newImages,
    });
  };

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

  return (
    <Layout title="Add store images">
      <View style={{ paddingTop: 5 }}>
        {data?.images?.length > 0 ? (
          <View style={{ justifyContent: "center" }}>
            <Text style={{ textAlign: "center", fontSize: ".8rem" }}>
              My Images
            </Text>

            <FlatList
              data={data?.images}
              keyExtractor={(_, idx) => idx.toString()}
              horizontal
              pagingEnabled
              scrollEventThrottle={10}
              renderItem={({ item, index }) => (
                <View style={styles.a}>
                  <Image
                    transition
                    source={{ uri: item }}
                    resizeMode="contain"
                    style={{
                      width: screenWidth,
                      height: screenHeight * 0.3,
                    }}
                    alt="pic"
                  />
                  <Text>
                    {index + 1}/{data?.images.length}
                  </Text>
                  <Icon
                    color={"#ff0f00"}
                    name="delete"
                    type="material"
                    size={20}
                    style={{
                      margin: 5,
                    }}
                    onPress={() => {
                      setImgToBeDelete(item);
                      setVisible(true);
                    }}
                  />
                </View>
              )}
            />
          </View>
        ) : (
          <View style={{ padding: 5, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", fontSize: ".8rem" }}>
              You have not upload any image for your store
            </Text>
          </View>
        )}

        <Text style={{ textAlign: "center", fontSize: ".8rem" }}>
          Upload images for store
        </Text>

        {images.length > 0 && (
          <TouchableOpacity onPress={() => setImages([])}>
            <Text style={{ textAlign: "center" }}>
              <Icon name="close" type="material" />
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.f}>
          <ScrollView
            centerContent
            contentContainerStyle={{
              flex: 1,
              backgroundColor: "rgba(39, 39, 39,.2)",
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
                        setImages(images.filter((img) => img.id !== item.id))
                      }
                    >
                      <Text style={{ textAlign: "center" }}>
                        <Icon name="close" type="material" />
                      </Text>
                    </TouchableOpacity>
                    <Image
                      source={{ uri: item.uri }}
                      style={styles.e}
                      transition
                      alt="pic"
                    />
                  </View>
                )}
              />
            )}
            <TouchableOpacity style={styles.c}>
              <Text
                style={{ color: "rgb(240, 191, 76)", fontSize: 15 }}
                onPress={pickImage}
              >
                Pick an image from camera roll
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <Button
          onPress={handleSubmit}
          contentStyle={{ width: "100%" }}
          labelStyle={{
            color: "rgb(240, 191, 76)",
            fontWeight: "bold",
          }}
          icon="camera"
          disabled={loading || isLoading}
          loading={loading || isLoading}
          style={styles.d}
        >
          Upload
        </Button>
      </View>

      <View>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={() => setVisible(false)}
            style={{
              backgroundColor: "rgb(39, 39, 39)",
              maxWidth: show ? 320 : 300,
              marginHorizontal: "auto",
            }}
          >
            <Dialog.Title>Remove Image</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Do tou want to delete this image permanently?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions
              style={{
                justifyContent: "space-around",
              }}
            >
              <Button
                onPress={() => setVisible(false)}
                color="rgb(240, 191, 76)"
              >
                Cancel
              </Button>
              <Button
                color="rgb(240, 191, 76)"
                onPress={() => {
                  if (imgToBeDelete !== "") {
                    handleDelete(imgToBeDelete);
                  }
                }}
              >
                Remove
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Layout>
  );
};

export default UploadStoreImages;

const styles = StyleSheet.create({
  a: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  box2: {
    // position: "relative",
    border: "1px solid rgba(39,39,39,.08)",
    backgroundColor: "#fff",
    overflow: "hidden",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },

  c: {
    backgroundColor: "rgb(39, 39, 39)",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginVertical: 8,
    padding: 10,
    borderRadius: 5,
  },
  d: {
    flex: 1,
    height: "45px",
    backgroundColor: "rgb(39, 39, 39)",
    justifyContent: "center",
    borderRadius: 0,
    borderColor: "rgb(240, 191, 76)",
    borderWidth: 2,
  },
  e: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  f: {
    borderColor: "rgb(39, 39, 39)",
    borderStyle: "dashed",
    borderWidth: 2,
    margin: 5,
  },
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
  console.log(decode);
  if (!token || decode.role !== "admin") {
    return {
      notFound: true,
    };
  }

  const data = await ssrClient(token).request(GET_MY_STORE_IMAGES, {
    // owner: decode.id,
    storeId,
  });

  return {
    props: {
      data: data || null,
      storeId,
      owner: decode.id,
    },
  };
}

// <FlatList
//   columnWrapperStyle={styles.a}
//   key={(item, idx) => idx.toString()}
//   contentContainerStyle={styles.fcon}
//   numColumns={Dimensions.get("window").width >= 700 ? 4 : 2}
//   data={myImages}
//   centerContent
//   keyExtractor={(item, idx) => idx.toString()}
//   renderItem={({ item }) => (
//     <View style={styles.box2}>
//       <Image source={{ uri: item }} resizeMode="contain" style={styles.img} />

//     </View>
//   )}
// />;
