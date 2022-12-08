import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { Icon, SearchBar } from "react-native-elements";
import { useQuery } from "react-query";
import { SearchForProducts } from "../../api";
import Searchlist from "./Searchlist";
import { ScreenState } from "../../context/state/screenState";

function Search({ setIsVisible, search }) {
  const { show, md, smScreen, lg, lgSidebar, screenHeight, smSidebar } =
    ScreenState();

  const [keyword, setKeyword] = useState("");
  const { isLoading, error, data } = useQuery(
    ["productsData", keyword],
    () => SearchForProducts(keyword),
    {
      enabled: keyword !== "",
      retry: false,
    }
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{
          height: show
            ? 56
            : data
            ? data.length > 0
              ? screenHeight
              : screenHeight
            : screenHeight,
          backgroundColor: show ? "rgba(33, 33, 33,.5)" : "rgba(33, 33, 33,.8)",
          zIndex: 100,
        }}
      >
        <SearchBar
          containerStyle={{
            height: 56,
            backgroundColor: "rgb(33, 33, 33)",
            justifyContent: "center",
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          placeholder="Search for products"
          inputStyle={{ color: "rgb(240, 191, 76)" }}
          onChangeText={setKeyword}
          value={keyword}
          searchIcon={() => (
            <>
              {show ? (
                <Icon name="search" type="material" color="rgb(240, 191, 76)" />
              ) : (
                <>
                  {keyword.length > 0 ? (
                    <Icon
                      name="search"
                      type="material"
                      color="rgb(240, 191, 76)"
                    />
                  ) : (
                    <Icon
                      name="arrow-back"
                      type="material"
                      color="rgb(240, 191, 76)"
                      onPress={() => setIsVisible(false)}
                    />
                  )}
                </>
              )}
            </>
          )}
          clearIcon={() => (
            <Icon
              name="cancel"
              type="material"
              color="rgb(240, 191, 76)"
              onPress={() => setKeyword("")}
            />
          )}
        />

        {data && show ? (
          <View>
            {keyword === "" ? null : data?.length > 0 ? (
              <Searchlist
                show={show}
                data={data}
                setKeyword={setKeyword}
                setIsVisible={setIsVisible}
                search={search}
              />
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  backgroundColor: "#fff",
                  padding: 10,
                }}
              >
                <Text style={{ color: "rgb(39,39,39)" }}>
                  No products found
                </Text>
              </View>
            )}
          </View>
        ) : (
          <ScrollView>
            {keyword === "" ? null : data?.length > 0 ? (
              <Searchlist
                show={show}
                data={data}
                setKeyword={setKeyword}
                setIsVisible={setIsVisible}
                search={search}
              />
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  backgroundColor: "#fff",
                  padding: 10,
                }}
              >
                <Text style={{ color: "rgb(39,39,39)" }}>
                  No products found
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </>
  );
}

export default Search;

// {
//   error && (
//     <View
//       style={{
//         height: "90vh",
//         // flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "rgba(33, 33, 33,.8)",
//       }}
//     >
//       <Text style={{ color: "rgb(240, 191, 76)" }}>An Error Occurred</Text>
//     </View>
//   );
// }

// {isLoading ? (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "rgba(33, 33, 33,.5)",
//       }}
//     >
//       <ActivityIndicator size="large" color="rgb(240, 191, 76)" />
//     </View>
//   ) : (

//   )}

//  <View style={{ flexDirection: "row", marginVertical: 5 }}>
//    {["Fashion", "Plastic", "Steel", "Shoes"].map((c, i) => (
//      <TouchableOpacity
//        key={i}
//        onPress={async () => {
//          router.push(`/categories/${c}`);
//        }}
//        style={{
//          marginHorizontal: 5,
//          paddingHorizontal: 8,
//          paddingVertical: 2,
//          borderRadius: 5,
//          borderColor: "rgb(240, 191, 76)",
//          borderWidth: 1,
//        }}
//      >
//        <Text style={{ color: "rgb(240, 191, 76)" }}>{c}</Text>
//      </TouchableOpacity>
//    ))}
//  </View>;
// <View
//   style={{
//     alignItems: "center",
//     backgroundColor: "rgba(33, 33, 33,.8)",
//   }}
// >
//   <Text
//     style={{
//       color: "rgb(240, 191, 76)",
//       fontWeight: "500",
//       fontSize: "1.2rem",
//     }}
//   >
//     Discover More
//   </Text>
// </View>;

//  {
//    show && (
//      <Overlay
//        isVisible={visible}
//        onBackdropPress={toggleOverlay}
//        style={{
//          position: "absolute",
//          width: "100%",
//          top: 56,
//          zIndex: 100,
//          left: lg ? lgSidebar : md ? smSidebar : show && smSidebar,
//        }}
//      >
//        {keyword === "" ? null : data?.length > 0 ? (
//          <ScrollView>
//            <FlatList
//              key={(item, idx) => idx.toString()}
//              contentContainerStyle={{
//                paddingTop: 10,
//                backgroundColor: "#fff",
//                // position: "absolute",
//                // top: 56,
//                // zIndex: 100,
//              }}
//              numColumns={2}
//              data={data}
//              centerContent
//              keyExtractor={(item, idx) => idx.toString()}
//              renderItem={({ item }) => (
//                // <ProductDetails p={item} setIsVisible={setIsVisible} search />
//                <Text>{item.name}</Text>
//              )}
//            />
//          </ScrollView>
//        ) : (
//          <View
//            style={{
//              height: screenHeight,
//              justifyContent: "center",
//              alignItems: "center",
//              flex: 1,
//            }}
//          >
//            <Text style={{ color: "rgb(240, 191, 76)" }}>No products found</Text>
//          </View>
//        )}
//      </Overlay>
//    );
//  }
