import { View, Text } from "react-native";
import React from "react";
import { TypingTextAnimation } from "@components";
import LottieView from "lottie-react-native";
import { animation } from "@/assets/animation";

export default function PokerCard({
  data,
  style,
  showCards,
}: {
  data: { username: string; card: string | undefined };
  style: any;
  showCards: boolean;
}) {
  return (
    <View
      className={`w-14 h-20 bg-secondary m-1 flex items-start justify-start border border-b-4 border-r-4 border-black rounded-lg shadow-lg`}
      style={style}
    >
      <View
        className={` p-1 flex-row items-baseline justify-center rounded-tl-lg bg-primary`}
      >
        <Text className="text-secondary text-xs">
          {data.username.slice(0, 1).toLocaleUpperCase()}
        </Text>
        <Text className="text-secondary text-[10px]">
          {data.username.slice(1, 2).toLocaleLowerCase()}
        </Text>
      </View>
      <View className="flex-1  w-full items-center justify-center -mt-2">
        {!showCards ? (
          data.card === null ? (
            <TypingTextAnimation
              textStyle="text-primary font-extrabold text-xl"
              text="...."
            />
          ) : (
            <View>
              <LottieView
                autoPlay={true}
                loop={false}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 45,
                }}
                source={animation.animationDone}
              />
            </View>
          )
        ) : (
          <Text className="text-primary text-sm font-black">{data.card}</Text>
        )}
      </View>
    </View>
  );
}
