import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";
import * as Animatable from "react-native-animatable";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useI18n } from "@hooks";
import { AlertContext } from "@hooks";
import { animation } from "@/assets/animation";

export function OnboardingScreen() {
  const scrollViewRef: React.RefObject<ScrollView> = useRef(null);
  const animationDelay = 1500;
  const animationDuration = 1000;
  const { handleAlert } = useContext(AlertContext);

  const conversationArray = [
    "Hey, Eva, have you heard of planning poker?",
    "It's a way to estimate task effort at work.",
    "How does it work?",
    "We use cards with numbers to estimate task difficulty, discussing until we agree.",
    "Why not just calculate an average?",
    "Planning poker fosters discussion, leading to more accurate estimates and team alignment.",
    "What are the benefits?",
    "We understand tasks better, get accurate estimates, and improve teamwork. Plus, it's fun!",
    "Interested in trying it?",
    "Definitely! It'll boost productivity and add excitement to our meetings. Let's do it! 😄",
  ];

  const [shouldScroll, setShouldScroll] = useState(true);

  useEffect(() => {
    const animateConversation = async () => {
      for (let i = 0; i < conversationArray.length; i++) {
        if (i === conversationArray.length - 2) {
          setShouldScroll(false);
        }
        setTimeout(() => {
          if (i >= 5 && shouldScroll) {
            scrollScrollView(i);
          }
        }, animationDelay * i);
      }
    };

    animateConversation();
  }, [shouldScroll]);

  const storeOnboardingDone = async () => {
    try {
      await AsyncStorage.setItem("onboarding", "true");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenUrl = async () => {
    storeOnboardingDone();
    const url = "https://en.wikipedia.org/wiki/Planning_poker";
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        handleAlert(1, i18n.t("error"), `${i18n.t("error_open_url")}: ${url}`);
      }
    } catch (error) {
      handleAlert(1, i18n.t("error"), `${i18n.t("error_open_url")}: ${url}`);
    }
  };

  const scrollScrollView = (index: any) => {
    const yOffset = index * 50;
    const scrollDuration = 500;
    const frames = 60;
    const scrollIncrement = yOffset / (scrollDuration / frames);

    let currentScroll = 0;

    const animateScroll = () => {
      if (!shouldScroll) {
        return;
      }

      currentScroll += scrollIncrement;
      scrollViewRef?.current?.scrollTo({ y: currentScroll, animated: false });

      if (currentScroll < yOffset && shouldScroll) {
        requestAnimationFrame(animateScroll);
      }
    };

    animateScroll();
  };

  const goToApp = () => {
    storeOnboardingDone();
    router.push("/login");
  };
  const i18n = useI18n();
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-primary">
      <View className="flex-row items-center justify-between w-full p-4">
        <View className="flex-row items-center justify-center">
          <LottieView
            autoPlay
            loop
            style={{
              width: 50,
              height: 50,
            }}
            source={animation.animationEva}
          />
          <Text className="text-secondary text-sm font-bold ml-2">Eva</Text>
        </View>
        <TouchableOpacity
          className="bg-primary pb-2 pt-1 flex items-end justify-center"
          onPress={handleOpenUrl}
        >
          <Text className="text-secondary text-sm">
            {i18n.t("for_more_information")}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1"
      >
        <View className="flex-1 justify-start items-center bg-white w-full py-2">
          {conversationArray.map((text, index) => {
            return (
              <Animatable.View
                duration={animationDuration}
                key={index}
                delay={animationDelay * index + 1}
                animation={index % 2 ? "bounceInLeft" : "bounceInRight"}
                className={`p-1 w-full flex-row items-center justify-end ${
                  index % 2 ? "justify-end" : "justify-start"
                }`}
              >
                <View
                  className={` w-4/5 px-4 py-4 rounded-xl ${
                    index % 2 ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  <Text
                    className={`${
                      index % 2 ? "text-secondary" : "text-primary"
                    } text-sm`}
                  >
                    {text}
                  </Text>
                </View>
              </Animatable.View>
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity
        className="bg-primary w-full pb-4 p-1 flex items-end justify-center"
        onPress={goToApp}
      >
        <Text className="text-secondary text-sm">
          {i18n.t("go_to_the_app")}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
