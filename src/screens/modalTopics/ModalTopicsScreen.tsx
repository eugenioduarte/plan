import { View, Modal, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import TextInputTopics from "./components/TextInputTopics";
import TopicCard from "./components/TopicCard";
import { onValue } from "firebase/database";
import {
  setTopicRT,
  setSelectedTopicRT,
  removeTopicRT,
  topicsQuery,
  topicSelectedQuery,
  removeSelectedTopicRT,
} from "@/services/firebaseRealTime";

type ModalTopicsProps = {
  visible: boolean;
  setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  roomCode: string;
};

export function ModalTopicsScreen({
  visible,
  setVisibleModal,
  roomCode,
}: ModalTopicsProps) {
  const lottieRef = useRef(null) as any;
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const [topics, setTopics] = useState([]);
  const [showTopicDetails, setShowTopicDetails] = useState(false);

  useEffect(() => {
    if (!visible) return;
    fetchTopicsAndSelectedTopic(roomCode);
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [visible]);

  useEffect(() => {}, [selectedTopic]);

  const handleAnimationAddTopic = () => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
    setTimeout(() => {
      setLoading(true);
    }, 1000);
    setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.reset();
      }
    }, 2000);
  };

  const fetchTopicsAndSelectedTopic = (roomCode: string) => {
    const roomTopicsData = topicsQuery(roomCode);
    const roomTopicsSelected = topicSelectedQuery(roomCode);
    onValue(roomTopicsData, (snapshot) => {
      if (!snapshot.val()) return;
      setTopics(Object.values(snapshot.val()));
    });
    onValue(roomTopicsSelected, (snapshot) => {
      if (!snapshot.val()) return;
      setSelectedTopic(snapshot.val());
    });
  };

  const addTopicToFirebase = (topicText: string, description: string) => {
    handleAnimationAddTopic();
    setTopicRT(roomCode, topicText, description);
  };

  const removeTopicFromFirebase = (topicTextToDelete: string) => {
    removeTopicRT(roomCode, topicTextToDelete).then((resp) => {
      if (resp?.length === 0 || resp === undefined) {
        setTopics([]);
      }
    });
    if (selectedTopic === topicTextToDelete) {
      setSelectedTopic("");
      removeSelectedTopicRT(roomCode);
    }
  };

  const handleSelectedTopic = async (topic: any) => {
    if (selectedTopic === topic.name) {
      if (showTopicDetails) {
        setShowTopicDetails(false);
      } else {
        setShowTopicDetails(true);
      }
    } else {
      setShowTopicDetails(false);
    }
    setSelectedTopicRT(roomCode, topic.name);
    setSelectedTopic(topic.name);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <BlurView intensity={40} className="flex-1">
        <View className="mt-20 w-full items-end justify-center ">
          <TouchableOpacity
            className="w-10 h-10 mx-5 items-center justify-center bg-primary rounded-full"
            onPress={() => setVisibleModal(false)}
          >
            <Image
              source={require("@/assets/images/delete-icon.png")}
              className="w-5 h-5"
              style={{ tintColor: "white" }}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          ref={flatListRef}
          className="flex-1 my-2"
          data={topics}
          renderItem={({ item }) => (
            <TopicCard
              showTopicDetails={showTopicDetails && selectedTopic === item.name}
              topic={item}
              isSelected={selectedTopic === item.name}
              selectedTopic={() => handleSelectedTopic(item)}
              removeTopic={() => removeTopicFromFirebase(item.name)}
              key={item.name}
            />
          )}
          onContentSizeChange={() => {
            setTimeout(() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
          }}
        />
        <TextInputTopics
          handleTopic={(text: string, description: string) =>
            addTopicToFirebase(text, description)
          }
        />
      </BlurView>
    </Modal>
  );
}
