import { useEmblaCarousel } from "embla-carousel/react";
import router from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { animateScroll } from "react-scroll";
import Link from "next/link";
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { useQuery } from "react-query";
import { client } from "../../client";
import { accentColor, lightAccentColor, lightText, textColor } from "../../Constant/color";
import { ScreenState } from "../../context/state/screenState";
import { GET_PRODUCT_BY_CATEGORY } from "../../graphql/query";

const RelatedProduct = ({ scrollRef, categories, prodId }) => {
  const { show, screenWidth } = ScreenState();

  const { isLoading, data, isError } = useQuery(
    ["getProdByCat", prodId],
    async () => {
      const { getProductsByOptions } = await client.request(GET_PRODUCT_BY_CATEGORY, {
        getProductsByOptionsFilter: {
          categories,
          _operators: { _id: { ne: prodId } },
        },
      });

      return getProductsByOptions;
    },
    {
      enabled: !!prodId,
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const flatRef = useRef(null);

  const [mainViewportRef, embla] = useEmblaCarousel({
    slidesToScroll: show ? 4 : 2,
    skipSnaps: false,
    align: "start",
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <>
      {data && data.items.length > 0 && (
        <>
          <ScrollView contentContainerStyle={{ marginTop: 10, marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                marginHorizontal: 16,
                marginBottom: 10,
              }}>
              Products related to this item
            </Text>
            {isLoading ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size='small' color={accentColor} />
              </View>
            ) : (
              <View>
                {show ? (
                  <View
                    style={{
                      maxWidth: "100%",
                      // marginHorizontal: "auto",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      flex: 1,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        overflow: "hidden",
                        width: "100%",
                        position: "relative",
                      }}
                      ref={mainViewportRef}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                        }}>
                        {data &&
                          data.items.length > 0 &&
                          data.items.map((item, i) => (
                            <Link key={i} passHref href={`/product/${item._id}`} shallow>
                              <TouchableOpacity
                                accessibilityRole='link'
                                // onPress={
                                //   () => router.push(`/product/${item._id}`).then(() => animateScroll.scrollToTop())
                                //   // .then(() => Scroll.scrollToTop())
                                // }
                                style={{
                                  alignItems: "center",
                                  flexBasis: "25%",
                                  // maxWidth: 200,
                                  // marginHorizontal: 8,
                                  position: "relative",
                                }}>
                                <Image
                                  source={{ uri: item.images[0] }}
                                  resizeMode='contain'
                                  style={{
                                    width: 180,
                                    height: 180,
                                  }}
                                  transition
                                  alt='pic'
                                />
                                <View
                                  style={{
                                    justifyContent: "flex-start",
                                    // alignItems: "center",
                                  }}>
                                  <Text
                                    style={{
                                      fontWeight: "500",
                                      textTransform: "uppercase",
                                      color: "rgb(113, 113, 113)",
                                      fontSize: "13px",
                                    }}>
                                    {item.name}
                                  </Text>
                                  <Text style={{ fontWeight: "500" }}>₹ {item.price}</Text>
                                </View>
                              </TouchableOpacity>
                            </Link>
                          ))}
                      </View>
                      <View style={styles.b}>
                        <Icon
                          name='chevron-left'
                          type='material'
                          onPress={scrollPrev}
                          color={!prevBtnEnabled ? lightText : accentColor}
                          disabled={!prevBtnEnabled}
                          disabledStyle={{
                            backgroundColor: lightAccentColor,
                            borderRadius: "50%",
                            borderColor: lightText,
                            borderWidth: 2,
                          }}
                          style={[
                            styles.a,
                            {
                              display: !prevBtnEnabled ? "none" : "flex",
                            },
                          ]}
                        />
                        <Icon
                          name='chevron-right'
                          type='material'
                          onPress={scrollNext}
                          color={!nextBtnEnabled ? lightText : accentColor}
                          disabled={!nextBtnEnabled}
                          disabledStyle={{
                            backgroundColor: lightAccentColor,
                            borderRadius: "50%",
                            borderColor: lightText,
                            borderWidth: 2,
                          }}
                          style={[
                            styles.a,
                            {
                              display: !nextBtnEnabled ? "none" : "flex",
                            },
                          ]}
                        />
                      </View>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      width: "100%",
                      position: "relative",
                      paddingHorizontal: 16,
                    }}>
                    <FlatList
                      data={data?.items}
                      horizontal
                      ref={flatRef}
                      pagingEnabled
                      contentContainerStyle={{
                        marginHorizontal: 8,
                        maxHeight: 300,
                      }}
                      centerContent
                      showsHorizontalScrollIndicator={false}
                      key={(item, idx) => idx.toString()}
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item, i }) => (
                        <Link key={i} passHref href={`/product/${item._id}`} shallow>
                          <TouchableOpacity
                            // onPress={
                            //   () =>
                            //     // Scroll.animateScroll.scrollToTop()
                            //     router.push(`/product/${item._id}`).then(() => animateScroll.scrollToTop())
                            //   // .then(() => window.scrollTo(0, 0))
                            // }
                            // key={i}
                            style={{
                              alignItems: "center",
                              maxWidth: 200,
                              marginHorizontal: 8,
                            }}>
                            <Image
                              source={{ uri: item.images[0] }}
                              resizeMode='contain'
                              style={{
                                width: 180,
                                height: 180,
                              }}
                              transition
                              alt='pic'
                            />
                            <View
                              style={{
                                justifyContent: "flex-start",
                                // alignItems: "center",
                              }}>
                              <Text
                                style={{
                                  fontWeight: "500",
                                  textTransform: "uppercase",
                                  color: "rgb(113, 113, 113)",
                                  fontSize: "13px",
                                }}>
                                {item.name}
                              </Text>
                              <Text style={{ fontWeight: "500" }}>₹ {item.price}</Text>
                            </View>
                          </TouchableOpacity>
                        </Link>
                      )}
                    />
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </>
      )}
    </>
  );
};

export default RelatedProduct;

const styles = StyleSheet.create({
  a: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    opacity: 0.8,
    borderRadius: "50%",
    backgroundColor: textColor,
    borderColor: accentColor,
    borderWidth: 2,
    flexDirection: "row",
  },
  b: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: "50%",
    width: "100%",
  },
});
