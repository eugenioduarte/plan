import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PokerCard from "./PokerCard";
import { setAverageToTheTopicRT } from "@/services/firebaseRealTime";
import AverageCard from "./AverageCard";
import { useI18n } from "@hooks";
import { DataContext } from "@hooks";

interface UserWithCard {
  username: string;
  card: any;
  x: number;
  y: number;
}

interface Topic {
  name: string;
  description: string;
  createdOn: string;
  votes: React.SetStateAction<never[]>;
  results: {
    average: number;
    median: number;
  };
}

interface UserWithCard {
  username: string;
  card: any;
  x: number;
  y: number;
}

export default function Table({ roomCode }: { roomCode: string }) {
  const { roomData } = useContext(DataContext);
  const [topic, setTopic] = useState<any>(null);

  const [showCards, setShowCards] = useState(false);
  const [viewDimensions, setViewDimensions] = useState({ width: 0, height: 0 });
  const [votes, setVotes] = useState([]);
  const [usersWithCards, setUsersWithCards] = useState<UserWithCard[]>([]);
  const [clicked, setClicked] = useState(false);
  const [average, setAverage] = useState(0);
  const [median, setMedian] = useState(0);

  const centerX = viewDimensions.width / 2 - 30;
  const centerY = viewDimensions.height / 2 - 30;
  const radius = viewDimensions.width / 3;

  useEffect(() => {
    setShowCards(false);
    setMedian(0);
    setAverage(0);
    setVotes([]);
  }, [roomData && roomData.selectedTopic]);

  useEffect(() => {
    if (!roomData) return;

    if (!roomData.topics) {
      return;
    }

    const topicsArray: Topic[] = Object.values(roomData.topics);
    if (topicsArray.length > 0) {
      topicsArray.map((topic_: { name: any }) => {
        if (topic_.name === roomData.selectedTopic) {
          if (roomData.selectedTopic !== topic) {
            setShowCards(false);
          }
          setTopic(topic_);
        }
      });
    }

    topicsArray.forEach(
      (element: { name: any; votes: React.SetStateAction<never[]> }) => {
        if (element.name === roomData.selectedTopic && element.votes) {
          setVotes(element.votes);
        }
      }
    );

    topicsArray.forEach((element) => {
      if (element.name === roomData.selectedTopic && element.results) {
        setAverage(element.results.average);
        setMedian(element.results.median);
        setShowCards(true);
      }
    });

    if (roomData.users !== undefined) {
      updateUsersVotes(roomData.users);
    }
  }, [roomData]);

  useEffect(() => {
    if (roomData && roomData.users !== undefined) {
      updateUsersVotes(roomData.users);
    }
  }, [viewDimensions, votes]);

  useEffect(() => {}, [usersWithCards]);

  const updateUsersVotes = (users: { [x: string]: any }) => {
    const userIds = Object.keys(users);

    const updatedUsersWithCards = userIds.map((userId, index) => {
      const user = users[userId];
      const angle = (2 * Math.PI * index) / userIds.length;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const username = user.userName;

      const card =
        votes.find(
          (vote: { user: string; card: any }) => vote.user === user.userName
        )?.card || null;
      return {
        username,
        card,
        x,
        y,
      };
    });

    setUsersWithCards(updatedUsersWithCards);
  };

  const handleLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setViewDimensions({ width, height });
  };

  const handleFinishVoting = () => {
    const votes = topic.votes;

    if (!votes) return;

    const validVotes = votes
      .map((vote: { card: string }) => parseFloat(vote.card))
      .filter((value: number) => !isNaN(value));

    const average =
      validVotes.reduce((acc: any, curr: any) => acc + curr, 0) /
      validVotes.length;

    const median = validVotes
      .map((vote: any) => vote)
      .sort((a: number, b: number) => a - b)[Math.floor(votes.length / 2)];

    const onFinishedDate = new Date().toISOString();

    setClicked(true);
    setAverageToTheTopicRT(
      roomCode,
      roomData.selectedTopic,
      average,
      median,
      onFinishedDate
    );

    setTimeout(() => {
      setShowCards(true);
      setClicked(false);
    }, 500);
  };

  const i18n = useI18n();
  return (
    <View
      onLayout={handleLayout}
      className="flex items-center justify-center flex-1 bg-secondary  w-full relative"
    >
      {roomData.selectedTopic && !showCards && (
        <TouchableOpacity
          onPress={handleFinishVoting}
          className={`flex-1 justify-center items-center absolute bg-secondary ${
            clicked ? "border-b-2 border-r-2" : "border-b-4  border-r-4"
          } border-t-2 border-l-2 border-primary`}
        >
          <Text className="text-primary font-semibold text-sm p-4 text-center">
            {i18n.t("finish")}
          </Text>
        </TouchableOpacity>
      )}
      {roomData.selectedTopic && showCards && (
        <AverageCard average={average} median={median} />
      )}

      {roomData.selectedTopic ? (
        usersWithCards.map((user, index) => (
          <PokerCard
            showCards={showCards}
            key={index}
            data={user as UserWithCard}
            style={{
              position: "absolute",
              left: user?.x,
              top: user?.y,
            }}
          />
        ))
      ) : (
        <Text className="flex flex-wrap text-primary font-semibold text-sm p-4 text-center">
          {i18n.t("need_create_topic")}
        </Text>
      )}
    </View>
  );
}
