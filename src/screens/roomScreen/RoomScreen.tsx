import { Header } from "@components";
import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { get } from "firebase/database";

import UserTable from "@/screens/roomScreen/components/UserTable";
import { ModalTopicsScreen } from "@screens";
import PokerCardKeyboard from "./components/PokerCardKeyboard";
import { router } from "expo-router";
import { DeletedRoomContainer } from "@components";
import {
  topicSelectedQuery,
  removeUserFromRoom,
  setVoteToTheTopicRT,
} from "@/services/firebaseRealTime";
import { DataContext } from "@hooks";
import TopicInputContainer from "./components/TopicInputContainer";

export function RoomScreen() {
  const { roomData, setRoomData, userName } = useContext(DataContext);
  const [roomDeleted, setRoomDeleted] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState("");
  const [roomCode, setRoomCode] = React.useState("");
  const [selectedTopic, setSelectedTopic] = React.useState("");
  const pokerCardNames = [
    "0",
    "1",
    "2",
    "3",
    "5",
    "8",
    "13",
    "20",
    "40",
    "100",
    "?",
    "☕",
  ];

  const [visibleModalTopics, setVisibleModalTopics] = React.useState(false);

  useEffect(() => {
    return () => {
      removeUserFromRoom(props.roomCode, userName);

      setTimeout(() => {
        setRoomDeleted(true);
        setRoomData(null);
        router.push("/home");
      }, 1000);
    };
  }, [roomDeleted === true]);

  const props = useLocalSearchParams<{
    roomCode: string;
  }>();

  useEffect(() => {
    getSelectedTopic();
  }, [visibleModalTopics === false]);

  useEffect(() => {
    setSelectedCard("");

    if (roomData && roomData.selectedTopic) {
      setSelectedTopic(roomData.selectedTopic);
    }
  }, [roomData]);

  useEffect(() => {
    getSelectedTopic();
    setRoomCode(props.roomCode);
  }, []);

  const handleSelectCard = (cardName: string) => {
    setVoteToTheTopicRT(roomCode, selectedTopic, userName, cardName);
    setSelectedCard(cardName);
  };

  const goBack = async () => {
    setRoomDeleted(true);
  };

  const getSelectedTopic = () => {
    const getSelectedTopicRt = topicSelectedQuery(props.roomCode);
    get(getSelectedTopicRt).then((snapshot) => {
      setSelectedTopic(snapshot.val());
    });
  };

  if (roomDeleted) {
    return <DeletedRoomContainer />;
  }

  return (
    <View className="bg-primary flex-1 items-center justify-center">
      <Header title={`Room: ${roomCode}`} goBack={() => goBack()} />
      <UserTable roomCode={roomCode} />
      <ModalTopicsScreen
        roomCode={roomCode}
        visible={visibleModalTopics}
        setVisibleModal={setVisibleModalTopics}
      />
      <View className="bg-gree-200 w-full flex-row items-center justify-end px-4 py-2">
        {roomData?.admin === userName && (
          <TopicInputContainer
            setModalTopics={() => setVisibleModalTopics(true)}
          />
        )}
      </View>

      <View className=" bg-primary w-full flex flex-row flex-wrap items-center justify-center px-6 pb-10 pt-4">
        {pokerCardNames.map((pokerCardName) => (
          <PokerCardKeyboard
            textCard={pokerCardName}
            handleSelectCard={handleSelectCard}
            selectedCard={pokerCardName === selectedCard}
            key={pokerCardName}
          />
        ))}
      </View>
    </View>
  );
}
