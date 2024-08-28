import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TypingTextAnimation } from "@components";
import LottieView from "lottie-react-native";
import TopicDetailsContainer from "./TopicDetailsContainer";
import { animation } from "@/assets/animation";
type TopicCardProps = {
  topic: string;
  isSelected?: boolean;
  selectedTopic: () => void;
  removeTopic: () => void;
  showTopicDetails?: boolean;
};

export default function TopicCard({
  topic,
  isSelected = true,
  selectedTopic,
  removeTopic,
  showTopicDetails = false,
}: TopicCardProps) {
  return (
    <TouchableOpacity
      className="flex items-end justify-end mx-4 m-1 relative"
      onPress={selectedTopic}
      onLongPress={removeTopic}
    >
      <View className="w-full bg-primary p-2 flex flex-row items-center justify-start">
        <View
          className={`bg-secondary mr-2  ${
            showTopicDetails ? "rotate-180" : "rotate-0"
          }`}
        >
          <LottieView
            autoPlay={true}
            loop
            style={{
              width: 30,
              height: 30,
            }}
            source={animation.animationChevron}
          />
        </View>

        <Text className="text-secondary text-sm font-normal">{topic.name}</Text>
      </View>
      {showTopicDetails && <TopicDetailsContainer topic={topic} />}
      {isSelected && (
        <View className="bg-secondary  p-1 border-2 border-primary flex flex-row items-center justify-center -mt-2">
          <TypingTextAnimation
            text={
              topic?.results?.average ? "Selected and finished" : "Selected"
            }
            loop={false}
            duration={1000}
            textStyle="text-primary font-bold text-xs"
          />
        </View>
      )}
    </TouchableOpacity>
  );
}
