import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { ModalTopicDetailsScreen } from "@screens";
import { useI18n, DataContext } from "@hooks";

export function Header({
  title = "title",
  goBack = Function,
}: {
  title: string;
  goBack?: () => void;
}) {
  const { roomData } = useContext(DataContext);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const i18n = useI18n();
  useEffect(() => {}, [roomData]);

  const handleModalWithDetails = () => {
    setVisibleModal(true);
  };

  return (
    <View className="mt-10 p-4  w-full flex-col items-center justify-center">
      <ModalTopicDetailsScreen
        visible={visibleModal}
        setVisibleModal={() => setVisibleModal(false)}
      />
      <View className="px-4  w-full flex-row items-center justify-between">
        <TouchableOpacity
          disabled={!goBack}
          className="w-15"
          onPress={() => goBack && goBack()}
        >
          <Image
            source={require("@/assets/images/chevron-icon.png")}
            className="w-8 h-8 "
            style={{ tintColor: "white" }}
          />
        </TouchableOpacity>
        <Text className="text-sm text-secondary font-semibold w-50">
          {title.length > 20 ? title.slice(0, 30) : title}
        </Text>
      </View>
      {roomData && roomData.selectedTopic !== null && (
        <TouchableOpacity
          onPress={handleModalWithDetails}
          className="flex-row items-center justify-center p-2 border-2 border-secondary mt-2"
        >
          <Text className="text-sm text-secondary font-semibold w-30">
            {`${i18n.t("topic")} : `}
          </Text>

          <Text className="text-sm text-secondary font-semibold w-30">
            {roomData.selectedTopic
              ? roomData.selectedTopic.length > 20
                ? roomData.selectedTopic.slice(0, 30)
                : roomData.selectedTopic
              : i18n.t("no_topic_selected")}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
