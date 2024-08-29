import { View, Text, Dimensions } from "react-native";
import React from "react";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { TypingTextAnimation } from "@components";
import * as Animatable from "react-native-animatable";
import { animation } from "@/assets/animation";

function AnimationSplashScreen() {
  const [showZombie, setShowZombie] = React.useState(true);
  const [showPlan, setShowPlan] = React.useState(false);
  const widthAnimation = Dimensions.get("window").width;
  const heightAnimation = Dimensions.get("window").width;

  const switchAnimation = (finishedLastAnimation: boolean) => {
    if (!finishedLastAnimation) {
      setTimeout(() => {
        setShowPlan(true);
        setShowZombie(false);
      }, 100);
    } else {
      setTimeout(() => {
        setShowPlan(false);
        router.push("/loginOnboarding");
      }, 1500);
    }
  };

  const PlanAnimation = () => {
    switchAnimation(true);
    return (
      <Animatable.View
        className="bg-secondary flex-1 w-full items-center justify-center"
        animation={showPlan ? "fadeIn" : "fadeOut"}
      >
        <View>
          <LottieView
            autoPlay={true}
            loop
            style={{
              width: widthAnimation,
              height: heightAnimation,
            }}
            source={animation.animationSquare}
          />
        </View>
        <View className="flex flex-col items-center justify-center bg-red mt-5 border-b-2 border-secondary pb-2 relative">
          <TypingTextAnimation
            text="PLAN"
            loop={false}
            textStyle="text-primary font-bold text-2xl absolute"
            duration={1000}
          />
          <TypingTextAnimation
            text="[          ]"
            loop={false}
            textStyle="text-primary font-bold text-4xl absolute"
            duration={1000}
          />
        </View>
      </Animatable.View>
    );
  };

  const ZombieAnimation = () => {
    return (
      <Animatable.View
        className="bg-[#6f54b5] flex-1 w-full items-center justify-center relative"
        animation={showZombie ? "fadeIn" : "fadeOut"}
      >
        <>
          <LottieView
            autoPlay={true}
            loop={false}
            speed={1.5}
            style={{
              width: widthAnimation,
              height: heightAnimation,
            }}
            onAnimationFinish={() => switchAnimation(false)}
            source={animation.animationZombie}
          />
        </>
        <View className="flex flex-col items-center justify-start bg-red  pb-2 absolute bottom-10">
          <Text
            style={{
              fontFamily: "FrightMaidenDemo",
              fontSize: widthAnimation * 0.8,
            }}
            className=" text-secondary mr-2  -z-1 "
          >
            138
          </Text>
          <Text className="text-2xl text-secondary font-bold  -mt-10">
            studio
          </Text>
        </View>
      </Animatable.View>
    );
  };

  return (
    <View className="flex-1 w-full items-center justify-center">
      {showZombie && <ZombieAnimation />}
      {showPlan && <PlanAnimation />}
    </View>
  );
}

export { AnimationSplashScreen };
