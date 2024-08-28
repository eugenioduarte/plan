import { View, Text, Pressable } from "react-native";
import React from "react";
import { TypingTextAnimation } from "@components";

export default function HeaderName({
  userName,
  setVisible,
}: {
  userName: string;
  setVisible: (visible: boolean) => void;
}) {
  return (
    <View className="w-full h-10 flex-row items-center justify-between px-2 bg-secondary">
      <View className="flex flex-row items-center justify-center">
        <Text className="font-normal text-primary/80 text-3xl ml-2">[</Text>
        <TypingTextAnimation
          text="PLAN"
          loop={false}
          textStyle="text-primary font-bold text-sm mt-1"
          duration={1000}
        />
        <Text className="font-normal text-primary/80 text-3xl ">]</Text>
      </View>

      <Pressable
        className="  bg-primary flex-row items-center justify-center "
        onPress={() => setVisible(true)}
      >
        <View className="h-8  bg-secondary flex items-start justify-center pr-2 pl-4 border-2 border-extraColor">
          <Text className="font-normal text-primary/80 text-xs mr-2">
            {userName.toLocaleUpperCase()}
          </Text>
        </View>
        <View className="w-8 h-8  bg-primary flex items-center justify-center ">
          <Text className="font-bold text-secondary text-sm">
            {userName.slice(0, 1).toLocaleUpperCase()}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
