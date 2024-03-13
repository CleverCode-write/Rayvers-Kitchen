import {
  Image,
  ImageSourcePropType,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { memo } from "react";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  colors,
} from "../../../components/DEFAULTS";
import { icons } from "../../../../assets/icons";
import { ingredients } from "../../../DATA";
import { FloatingCartAction, ImageSlider } from "../../../components";
import { Dish } from "../../../../type";
import { useDispatch } from "react-redux";
import { setCarouselImages } from "../../../Redux/Splice/AppSplice";

interface FoodDetailsProps {
  route: {
    params: {
      data: Dish;
    };
  };
}

const FoodDetails: React.FC<FoodDetailsProps> = ({ route }) => {
  const { data } = route.params;


  const dispatch = useDispatch();

  dispatch(setCarouselImages(data.images));

  return (
    <SafeAreaView
      style={{
        marginTop: Platform.OS === "android" ? 25 : 0,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundColor: colors.white,
        flex: 1,
      }}
    >
      {/* Main Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageSlider item={data} />

        <View style={{ marginHorizontal: 24 }}>
          <Text
            style={{
              fontFamily: "Bold-Sen",
              fontSize: 20,
              color: "#181C2E",
              marginTop: 24,
            }}
          >
            {data?.name}
          </Text>
          <View style={{ marginTop: 10 }}>
            <Image source={{}} style={{}} resizeMode="contain" />
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Regular-Sen",
                color: "#181C2E",
              }}
            >
              {data?.restaurant_details.name}
            </Text>
          </View>

          {/* Info Section */}
          <View
            style={{
              marginTop: 20,
              marginBottom: 20,
              width: "80%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={icons.star}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: "Regular-Sen",
                  fontSize: 16,
                  marginLeft: 10,
                  color: "#181C2E",
                }}
              >
                {data?.ratings}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={icons.delivery}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: "Regular-Sen",
                  fontSize: 16,
                  marginLeft: 10,
                  color: "#181C2E",
                }}
              >
                Free
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={icons.clock}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: "Regular-Sen",
                  fontSize: 16,
                  marginLeft: 10,
                  color: "#181C2E",
                }}
              >
                30 min
              </Text>
            </View>
          </View>

          <Text
            style={{
              lineHeight: 24,
              color: colors.grayText,
              fontSize: 14,
              fontFamily: "Regular-Sen",
              marginBottom: 20,
            }}
          >
            {data?.description}
          </Text>

          <Text
            style={{
              color: colors.primaryTxt,
              fontSize: 14,
              fontFamily: "Regular-Sen",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Ingredients
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {data._ingredients?.map((item) => (
              <View key={item} style={{ margin: 10, alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: "#FFEBE4",
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item === "Salt" ? (
                    <Image
                      source={icons.salt}
                      style={{ width: 24, height: 24 }}
                      resizeMode="contain"
                    />
                  ) : item === "Chicken" ? (
                    <Image
                      source={icons.chicken}
                      style={{ width: 24, height: 24 }}
                      resizeMode="contain"
                    />
                  ) : item === "Pepper" ? (
                    <Image
                      source={icons.pepper}
                      style={{ width: 24, height: 24 }}
                      resizeMode="contain"
                    />
                  ) : item === "Onion" ? (
                    <Image
                      source={icons.onion}
                      style={{ width: 24, height: 24 }}
                      resizeMode="contain"
                    />
                  ) : item === "Garlic" ? (
                    <Image
                      source={icons.garlic}
                      style={{ width: 24, height: 24 }}
                      resizeMode="contain"
                    />
                  ) : item === "Ginger" ? (
                    <Image
                      source={icons.ginger}
                      style={{ width: 24, height: 24 }}
                      resizeMode="contain"
                    />
                  ) : item === "Broccoli" ? (
                    <Image
                      source={icons.broccoli}
                      style={{ width: 24, height: 24 }}
                      resizeMode="contain"
                    />
                  ) : item === "Orange" ? (
                    <Image
                      source={icons.orange}
                      style={{ width: 24, height: 24 }}
                      resizeMode="contain"
                    />
                  ) : item === "Walnut" ? (
                    <Image
                      source={icons.walnut}
                      style={{ width: 24, height: 24 }}
                      resizeMode="contain"
                    />
                  ) : null}
                </View>
                <Text
                  style={{
                    fontFamily: "SemiBold-Sen",
                    fontSize: 12,
                    color: "#747783",
                    marginTop: 5,
                  }}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: Platform.OS === "android" ? 35 : 50 }} />
      </ScrollView>
      <FloatingCartAction item={data} />
    </SafeAreaView>
  );
};

export default memo(FoodDetails);

const styles = StyleSheet.create({});
