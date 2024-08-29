import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import { TypingTextAnimation } from "@components";
import { isAndroid } from "@utils";
import { useI18n } from "@hooks";
import { DataContext } from "@hooks";
import * as test from "@components";

export function LoginScreen() {
  const [userNameValue, setUserNameValue] = useState("");
  const [loading, setLoading] = useState(true);
  const i18n = useI18n();
  const { userName, updateUserName } = useContext(DataContext);

  useEffect(() => {
    console.log(test);
    validateUserNameStorage();
  }, []);

  const validateUserNameStorage = async () => {
    if (userName) {
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } else {
      setLoading(false);
    }
  };

  const storeUserName = async () => {
    updateUserName(userNameValue);
  };

  if (!loading)
    return (
      <View className="flex-1">
        <View className="flex-col flex-1 bg-secondary items-center justify-center bg-red">
          <View className="flex-row flex items-center justify-center relative ">
            <Text className="text-7xl font-medium text-primary">{`[`}</Text>
            <Text className="text-5xl font-bold text-primary mt-2">{`PLAN`}</Text>
            <Text className="text-7xl font-medium text-primary">{`]`}</Text>
            <Text className="text-xl font-bold text-secondary absolute -bottom-7 right-2 bg-primary px-2">{`poker`}</Text>
          </View>
        </View>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={isAndroid() ? "height" : "padding"}
        >
          <View className="bg-primary flex-1 flex items-center justify-center">
            <Text className="text-xl font-bold text-secondary">
              {i18n.t("enter_with_your_name")}
            </Text>
            <TextInput
              className="w-1/2 px-6 py-5 my-4 text-center text-secondary text-xl font-semibold border-2 border-secondary rounded-md "
              value={userNameValue}
              onChangeText={setUserNameValue}
              placeholder={i18n.t("name")}
            />
            <TouchableOpacity
              className="w-1/2 px-4 py-4 text-secondary bg-secondary rounded-md flex items-center mt-2"
              onPress={storeUserName}
            >
              <Text className="text-primary text-xl font-bold">
                {i18n.t("enter")}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );

  return (
    <View className="flex-1 items-center justify-center bg-secondary">
      <TypingTextAnimation />
    </View>
  );
}
