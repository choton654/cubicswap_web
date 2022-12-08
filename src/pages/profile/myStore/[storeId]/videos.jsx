import * as ImagePicker from "expo-image-picker";
import jwtDecode from "jwt-decode";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { useMutation } from "react-query";
import { client, ssrClient } from "../../../../client";
import Layout from "../../../../components/Layout";
import { UPDATE_STORE_VIDEO } from "../../../../graphql/mutation";
import { GET_MY_STORE_VIDEOS } from "../../../../graphql/query";

const addStoreVideos = async (variables) => {
  const { updateStoreVideo } = await client.request(
    UPDATE_STORE_VIDEO,
    variables
  );
  return updateStoreVideo;
};

const UploadStoreVideos = ({ data: { getMyStoreDetails }, owner, storeId }) => {
  console.log(getMyStoreDetails);

  const [file, setFile] = useState(getMyStoreDetails?.videos || null);

  const [loading, setLoading] = useState(false);

  const { mutate } = useMutation(addStoreVideos, {
    onSuccess: () => {
      setLoading(false);
      setFile(null);
    },
    onError: (e, newcartData, context) => {
      console.error(e);
    },
  });

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

  useEffect(() => {
    const src = URL.createObjectURL(new Blob([file], { type: "video/mp4" }));
  }, [file]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result);
      setFile(result.uri);
    }
  };

  const handleSubmit = async () => {
    if (file === null) {
      return;
    }

    let newVideo;

    let data = {
      file,
      upload_preset: "ecommerce",
      api_key: process.env.CLOUDNARY_API_KEY,
    };
    setLoading(true);
    fetch(`https://api.cloudinary.com/v1_1/choton/upload`, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        const imageData = data;
        console.log(imageData.secure_url);
        newVideo = imageData.secure_url;

        mutate({
          variables: {
            owner,
            storeId,
            video: newVideo,
          },
        });
      });
  };

  return (
    <Layout title="Add store videos">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Upload your store videos</Text>
      </View>

      <View style={styles.f}>
        <ScrollView centerContent contentContainerStyle={styles.a}>
          {file && <video controls src={file} />}
          <TouchableOpacity style={styles.c}>
            <Text
              style={{ color: "rgb(240, 191, 76)", fontSize: 15 }}
              onPress={pickImage}
            >
              Pick a video
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
        icon="video"
        disabled={loading}
        loading={loading}
        style={styles.d}
      >
        Upload
      </Button>
    </Layout>
  );
};

export default UploadStoreVideos;

const styles = StyleSheet.create({
  a: {
    flex: 1,
    backgroundColor: "rgba(39, 39, 39,.2)",
  },
  f: {
    borderColor: "rgb(39, 39, 39)",
    borderStyle: "dashed",
    borderWidth: 2,
    margin: 5,
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
  if (!token || decode.role === "user") {
    return {
      notFound: true,
    };
  }

  const data = await ssrClient(token).request(GET_MY_STORE_VIDEOS, {
    owner: decode.id,
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
