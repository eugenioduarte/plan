import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated } from "react-native";

const TypingTextAnimation = ({
  text = "Loading....",
  loop = true,
  reset = 0,
  duration = 3000,
  textStyle = "text-primary font-extrabold text-2xl",
}) => {
  const typingAnimation = useRef(new Animated.Value(0)).current;
  const [animatedText, setAnimatedText] = useState("");

  useEffect(() => {
    const animation = Animated.timing(typingAnimation, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    });
    const loopedAnimation = Animated.loop(animation, { iterations: -1 });
    if (loop) {
      loopedAnimation.start();
    } else {
      animation.start(() => {
        if (reset > 0) {
          setTimeout(() => {
            setAnimatedText("");
          }, reset);
        }
      });
    }

    typingAnimation.addListener(({ value }) => {
      const newText = text.substring(0, Math.floor(value * text.length));
      setAnimatedText(newText);
    });
    return () => {
      loopedAnimation.stop();
    };
  }, [loop, text]);

  return (
    <View className="items-center justify-center ">
      <Text className={textStyle} testID="animatedText">
        {animatedText}
      </Text>
    </View>
  );
};

export { TypingTextAnimation };
