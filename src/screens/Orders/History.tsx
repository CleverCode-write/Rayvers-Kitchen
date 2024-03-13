import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BASE_URL, SCREEN_WIDTH, colors } from "../../components/DEFAULTS";
import { OrderItem } from "../../components";
import {
  GradientProps,
  SkeletonContainer,
} from "react-native-dynamic-skeletons";
import { generateRandomNumber } from "../../utils/idGenerator";
import { LinearGradient } from "react-native-svg";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { OrderOngoingPayload } from "../../../type";

enum STATUS {
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  PENDING = "pending",
}

const Gradient = (props: GradientProps) => <LinearGradient {...props} />;

const History = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<Array<OrderOngoingPayload> | null>(
    null
  );
  const [unfilteredOrders, setUnfilteredOrders] =
    useState<Array<OrderOngoingPayload> | null>(null);


  useEffect(() => {
    const executeHistoryFetch = async () => {
      await fetchHistory();
    };
    executeHistoryFetch();
  }, []);

  useEffect(() => {
    if (unfilteredOrders) {
      const filteredOrders = unfilteredOrders.filter(
        (order) =>
          order.status === STATUS.COMPLETED || order.status === STATUS.CANCELLED
      );
      setHistory(filteredOrders);
    }
  }, [unfilteredOrders]);

  const token = useSelector((state: RootState) => state.data.token);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}api/orderitems/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        setLoading(false);

        const result = await response.json();
        // console.log("result: from ongoing orders", result);
        setUnfilteredOrders(result);
      } else {
        setLoading(false);
        setUnfilteredOrders(null);

        const res = await response.json();
        console.log(res);
      }
    } catch (error: any) {
      console.log(`Error from sendOrders: ${error.message}`);
      setUnfilteredOrders(null);
    }
  };

  const reFetch = async () => {
    await fetchHistory();
  };

  return (
    <ScrollView
      style={{ width: SCREEN_WIDTH }}
      contentContainerStyle={{ alignItems: "center" }}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={reFetch}
          tintColor={colors.primaryBg}
          enabled={true}
          style={{}}
        />
      }
    >
      {loading &&
        new Array(4).fill(0).map((_) => (
          <SkeletonContainer
            animationType="leftRight"
            Gradient={Gradient}
            isLoading={loading}
            duration={2000}
            style={{}}
            key={generateRandomNumber(4)}
          >
            <View
              style={{
                height: 145,
                width: SCREEN_WIDTH - 48,
                marginBottom: 24,
                borderRadius: 8,
                marginHorizontal: 13,
              }}
            />
          </SkeletonContainer>
        ))}
      {!loading &&
        history?.map((item, index) => (
          <View style={{ marginTop: index !== 0 ? 24 : 0 }} key={index}>
            <OrderItem
              type={"history"}
              data={item}
            />
          </View>
        ))}

      {!loading && (history?.length === 0 || history === null) && (
        <View
          style={{
            borderRadius: 12,
            borderWidth: 2,
            borderStyle: "dashed",
            padding: 12,
            paddingVertical: 24,
            width: SCREEN_WIDTH - 48,
          }}
        >
          <Text
            style={{
              fontFamily: "Regular-Sen",
              fontSize: 18,
              color: colors.primaryTxt,
              textAlign: "center",
            }}
          >
            You have no history
          </Text>
        </View>
      )}

      <View style={{ height: 100, width: SCREEN_WIDTH - 13 }} />
    </ScrollView>
  );
};

export default History;

const styles = StyleSheet.create({});
