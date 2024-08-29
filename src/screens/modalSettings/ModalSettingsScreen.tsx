import {
  Text,
  Modal,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import { BlurView } from "expo-blur";
import { useI18n, DataContext } from "@hooks";
import { languageOptions } from "@/locales/localization";
import { TypingTextAnimation } from "@components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { animation } from "@/assets/animation";

type ModalSettingsProps = {
  visible: boolean;
  setVisibleModal: (visible: boolean) => void;
};

export function ModalSettingsScreen({
  visible,
  setVisibleModal,
}: ModalSettingsProps) {
  const [language, setLanguage] = useState("en" as string);
  const [newName, setNewName] = useState("");
  const { roomData, updateUserName } = useContext(DataContext);
  const lottieSendRef = useRef(null) as any;
  const i18n = useI18n();

  useEffect(() => {}, [language]);

  useEffect(() => {
    setLanguage(i18n.locale);
  }, [roomData && visible === true]);

  const handleSendAnimationClick = () => {
    if (lottieSendRef.current) {
      lottieSendRef.current.play();
    }
  };

  const changeLanguage = async (id: string) => {
    await AsyncStorage.setItem("language", id);
    i18n.locale = id;
    setLanguage(id);
  };

  const changeName = async () => {
    handleSendAnimationClick();
    updateUserName(newName);
    setNewName("");
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <BlurView intensity={40} className="flex-1">
        <Pressable
          className="flex-1 items-center justify-start"
          onPress={() => setVisibleModal(false)}
        >
          <View className="bg-secondary/50  rounded-md  p-8 w-full flex flex-col items-center justify-center  pt-20">
            <View className="w-full bg-primary p-2 flex items-center justify-center">
              <Text className="text-secondary text-sm font-bold">
                {i18n.t("input_your_name")}
              </Text>
            </View>
            <View className="flex-row items-center justify-between my-1">
              <TextInput
                className=" p-2 text-center border-2 border-primary rounded-md text-primary text-sm flex-1"
                value={newName}
                onChangeText={setNewName}
                placeholder={i18n.t("input_your_name")}
              />
              <TouchableOpacity
                onPress={changeName}
                className="bg-primary rounded-xl m-1"
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
            <View className="w-full bg-primary p-2 flex items-center justify-center mt-5">
              <Text className="text-secondary text-sm font-bold">
                {i18n.t("select_your_language")}
              </Text>
            </View>
            {languageOptions.map((item) => (
              <TouchableOpacity
                onPress={() => changeLanguage(item.id)}
                className="border-2 border-primary p-2 w-full mt-1 flex-row items-center justify-between"
                key={item.id}
              >
                <Text className="text-primary text-lg">
                  {i18n.t(item.name)}
                </Text>
                <TypingTextAnimation
                  text={language === item.id ? i18n.t("selected") : ""}
                  loop={false}
                  duration={1000}
                  textStyle="text-primary font-bold text-xs"
                />
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </BlurView>
    </Modal>
  );
}
