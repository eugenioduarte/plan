import { View, Text } from "react-native";
import React from "react";
import { useI18n } from "@hooks";

const StaticsCard = ({
  value,
  isAverage,
}: {
  value: any;
  isAverage: boolean;
}) => {
  const i18n = useI18n();
  return (
    <View className="flex-col items-center justify-center">
      <Text className="text-primary text-sm p-2 ">
        {isAverage ? i18n.t("average") : i18n.t("median")}
      </Text>
      <View className="bg-primary w-full flex items-center justify-center">
        <Text className="bg-primary text-secondary p-2 m-2 font-bold">
          {value}
        </Text>
      </View>
    </View>
  );
};

export default function AverageCard({
  average,
  median,
}: {
  average: number;
  median: number;
}) {
  return (
    <View className="bg-secondary border-primary border-2 flex flex-row items-center justify-center mt-5">
      <StaticsCard value={average} isAverage={true} />
      <View className="h-full bg-primary w-0.5" />
      <StaticsCard value={median} isAverage={false} />
    </View>
  );
}
