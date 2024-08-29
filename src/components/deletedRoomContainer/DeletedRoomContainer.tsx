import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useI18n } from "@hooks";
import { animation } from "@/assets/animation";

export function DeletedRoomContainer() {
  const i18n = useI18n();
  return (
    <View className="flex-1 flex items-center justify-center bg-primary">
      <View>
        <LottieView
          autoPlay
          loop
          style={{
            width: 200,
            height: 200,
          }}
          source={animation.animationDeleted}
        />
      </View>
      <Text className="text-secondary">{i18n.t("room_was_removed")}</Text>
    </View>
  );
}
