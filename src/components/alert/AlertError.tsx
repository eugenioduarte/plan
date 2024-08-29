import { View, Image, Modal, Text, Pressable } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useI18n } from "@hooks";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  text?: string;
  descriptionText?: string;
  counterToClose: number;
};

export function AlertError({
  visible,
  setVisible,
  text = "",
  descriptionText = "",
  counterToClose,
}: Props) {
  const i18n = useI18n();
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <BlurView intensity={20} className="flex-1">
        <Pressable
          className="flex flex-1  items-center justify-end "
          onPress={() => setVisible && setVisible(false)}
        >
          <View
            className="flex items-center justify-center bg-primary w-full relative"
            style={{ height: 250 }}
          >
            <View className="bg-primary p-4 rounded-full absolute -top-5">
              <Image
                source={require("@/assets/images/warning-icon.png")}
                className="w-8 h-8 "
                style={{ tintColor: "white" }}
              />
            </View>
            <View className="flex flex-1 w-full pt-10 items-center justify-start px-2">
              <Text className="text-white font-bold text-xl mt-2 text-center">
                {text}
              </Text>
              <Text className="text-white font-bold text-sm mt-2 text-center">
                {descriptionText}
              </Text>

              <Text className="text-white font-bold text-sm mt-5">{`${i18n.t(
                "close_in"
              )}: ${counterToClose}`}</Text>
            </View>
          </View>
        </Pressable>
      </BlurView>
    </Modal>
  );
}
