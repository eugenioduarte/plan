import { animation } from "@/assets/animation";
import { TypingTextAnimation } from "@components";
import { AlertContext } from "@hooks";
import { useI18n } from "@hooks";
import LottieView from "lottie-react-native";
import React, { useContext, useRef, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
} from "react-native";

type TextInputProps = {
  handleTopic: (topic: string, description: string) => void;
};

const TextInputTopics = ({ handleTopic }: TextInputProps) => {
  const [topicText, setTopicText] = React.useState("");
  const [descriptionText, setDescriptionText] = React.useState("");
  const lottieSendRef = useRef(null) as any;
  const { handleAlert } = useContext(AlertContext);
  const [showDescriptionTextInput, setShowDescriptionTextInput] =
    useState(false);
  const i18n = useI18n();

  const handleSendAnimationClick = () => {
    if (lottieSendRef.current) {
      lottieSendRef.current.play();
    }
  };

  const handleAddTopic = () => {
    if (!topicText) {
      handleAlert(
        1,
        "Error create topic",
        "Please, type a topic before send it"
      );
      return;
    }
    handleSendAnimationClick();
    setTimeout(() => {
      setTopicText("");
      setDescriptionText("");
      handleTopic(topicText, descriptionText);
    }, 500);
    setTimeout(() => {
      if (lottieSendRef.current) {
        lottieSendRef.current.reset();
      }
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-col items-center justify-center "
    >
      <View className="pb-5  px-5  flex-col items-center justify-center bg-secondary/50  ">
        <TypingTextAnimation
          text={i18n.t("keep_pressing_to_delete_topics")}
          loop={false}
          duration={1000}
          textStyle="text-primary font-bold text-xs my-4"
          reset={3000}
        />
        <View className=" flex-row items-start justify-center mb-4">
          <View className="w-full pl-5 ">
            <TextInput
              className=" p-2 text-center border-2 border-primary rounded-md text-primary text-sm ml-5"
              value={topicText}
              onChangeText={setTopicText}
              placeholder={i18n.t("type_a_topic")}
              onFocus={() => setShowDescriptionTextInput(true)}
              onBlur={() =>
                topicText == "" && setShowDescriptionTextInput(false)
              }
            />
            {showDescriptionTextInput && (
              <TextInput
                className=" p-2 text-center border-2 border-primary rounded-md text-primary text-sm ml-5 mt-2  h-20"
                value={descriptionText}
                onChangeText={setDescriptionText}
                placeholder={i18n.t("type_description_optional")}
                onBlur={() => setShowDescriptionTextInput(false)}
                numberOfLines={2}
                multiline={true}
              />
            )}
          </View>
          <TouchableOpacity
            onPress={handleAddTopic}
            className="bg-primary rounded-full ml-5"
          >
            <LottieView
              ref={lottieSendRef}
              autoPlay={false}
              style={{
                width: 40,
                height: 40,
                margin: 0,
              }}
              loop={false}
              source={animation.animationSend}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TextInputTopics;
