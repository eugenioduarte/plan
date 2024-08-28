import { Text, Modal, Pressable, Image, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import { useI18n, DataContext } from "@hooks";
import { getTopicInfo, getUsersOnline } from "@/services/firebaseRealTime";
import { formatOnlyDate } from "@utils";

type ModalTopicDetailsProps = {
  visible: boolean;
  setVisibleModal: (visible: boolean) => void;
};

type TopicInfoProps = {
  name: string;
  description: string;
  createdOn: string;
};

type UserProps = {
  userName: string;
  active?: boolean;
};

export function ModalTopicDetailsScreen({
  visible,
  setVisibleModal,
}: ModalTopicDetailsProps) {
  const { roomData } = useContext(DataContext);
  const i18n = useI18n();
  const [usersOnline, setUsersOnline] = useState<UserProps[]>([
    {
      userName: "",
      active: false,
    },
  ]);
  const [topicInfo, setTopicInfo] = useState<TopicInfoProps>({
    name: "",
    description: "",
    createdOn: "",
  });

  const fetchData = async () => {
    if (!roomData) return;
    if (!roomData.selectedTopic) return;
    const topicInfoFetch = await getTopicInfo(
      roomData.id,
      roomData.selectedTopic
    );
    const userOnlineFetch = await getUsersOnline(roomData.id);
    setTopicInfo(topicInfoFetch);
    setUsersOnline(Object.values(userOnlineFetch));
  };

  useEffect(() => {
    fetchData();
  }, [roomData && visible === true]);

  const shareApp = async () => {
    alert("share");
    // try {
    //   const url = "https://www.seu-site.com/seu-app";
    //   const options = {
    //     message: i18n.t("share_this"),
    //     url: url,
    //   };

    //   await Share.share(options);
    // } catch (error) {
    //   console.log("Erro ao compartilhar");
    // }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <BlurView intensity={40} className="flex-1">
        <Pressable
          className="flex-1 items-center justify-start"
          onPress={() => setVisibleModal(false)}
        >
          <View className="bg-secondary/50  rounded-md  mx-4 p-8 w-full flex flex-col items-center justify-center  pt-20">
            <View className="bg-primary flex items-center justify-center w-full p-2">
              <Text className="text-sm font-bold text-secondary">
                {i18n.t("topic_details")}
              </Text>
            </View>
            {roomData && roomData.selectedTopic && (
              <View className="gap-1 mt-2">
                <Text className="font-primary">{`${i18n.t("name")}: ${
                  topicInfo.name
                }`}</Text>
                {topicInfo.description && (
                  <View className="pt-2">
                    <Text className="mb-1">{i18n.t("description")}: </Text>
                    <Text>{topicInfo.description}</Text>
                  </View>
                )}
                <Text className="font-primary py-2">
                  {i18n.t("created_date") +
                    ": " +
                    formatOnlyDate(topicInfo.createdOn)}
                </Text>
                <View className="pt-2 border-b-2 border-primary w-full">
                  <Text className="text-sm font-bold text-primary pb-2">
                    {i18n.t("users_online")}
                  </Text>
                </View>
                {usersOnline.map((user, index) => (
                  <View className="flex-row" key={user.userName + index}>
                    <Text className="font-primary">{user.userName} | </Text>
                    <Text className="font-primary">
                      {`${i18n.t("status")}: `}
                      <Text
                        className={`font-primary ${
                          user.active
                            ? "font-bold text-primary"
                            : "font-normal text-gray-400"
                        }`}
                      >
                        {user.active ? i18n.t("active") : i18n.t("inactive")}
                      </Text>
                    </Text>
                  </View>
                ))}
              </View>
            )}
            {topicInfo.name === "" && (
              <View className="py-2">
                <Text className="text-primary font-bold text-sm">
                  {i18n.t("topic_not_created")}
                </Text>
              </View>
            )}
            <Pressable
              onPress={shareApp}
              className="bg-primary w-full p-2 mt-20 flex flex-row items-center justify-center "
            >
              <Image
                source={require("@/assets/images/share-icon.png")}
                className="w-6 h-6 "
                style={{ tintColor: "white" }}
              />
              <Text className="text-secondary font-bold mx-1">
                {i18n.t("share")}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </BlurView>
    </Modal>
  );
}
