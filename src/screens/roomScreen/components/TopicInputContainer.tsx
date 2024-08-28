import { View, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { TypingTextAnimation } from "@components";
import { useI18n } from "@hooks";
import { animation } from "@/assets/animation";

type TopicInputContainerProps = {
  setModalTopics: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TopicInputContainer({
  setModalTopics,
}: TopicInputContainerProps) {
  const lottieRef = useRef<LottieView | null>(null);
  const i18n = useI18n();

  useEffect(() => {
    handleAnimationClick();
  }, []);

  const handleAnimationClick = () => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  };

  const handleModalTopics = () => {
    handleAnimationClick();
    setTimeout(() => {
      setModalTopics(true);
    }, 500);
  };

  return (
    <View className=" flex flex-row items-center justify-end ">
      <View className="mr-2 ">
        <TypingTextAnimation
          text={i18n.t("click_to_create_topics")}
          loop={false}
          textStyle="text-secondary font-bold text-sm"
          reset={3000}
        />
      </View>

      <TouchableOpacity onPress={handleModalTopics}>
        <LottieView
          ref={lottieRef}
          autoPlay={false}
          style={{
            width: 40,
            height: 40,
            backgroundColor: "white",
            borderRadius: 40,
          }}
          loop={false}
          source={animation.animationPlus}
        />
      </TouchableOpacity>
    </View>
  );
}
