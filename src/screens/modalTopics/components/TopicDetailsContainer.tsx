import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { formatOnlyDate } from "@utils";
import { useI18n } from "@hooks";

type TopicDetailsContainerProps = {
  topic: {
    average: number;
    median: number;
    description: string;
    votes: any[];
    createdOn: string;
    onFinishedDate: string;
  };
};

export default function TopicDetailsContainer({
  topic,
}: TopicDetailsContainerProps) {
  useEffect(() => {}, [topic]);

  const i18n = useI18n();
  return (
    <View className="bg-primary w-full flex items-center justify-center p-2 gap-1">
      <Text className="text-secondary text-sm font-bold">
        {`${topic.description} `}
      </Text>
      <Text className="text-secondary text-sm font-bold">
        {`${i18n.t("created_by")}: ${formatOnlyDate(
          topic.createdOn
        )} | ${i18n.t("finished")}: ${
          topic?.results?.onFinishedDate
            ? formatOnlyDate(topic?.results?.onFinishedDate)
            : i18n.t("not_finished")
        }`}
      </Text>
      <Text className="text-secondary text-sm font-normal">
        {` ${i18n.t("average")}: ${
          topic?.results?.average || i18n.t("not_finished")
        }`}
      </Text>
      <Text className="text-secondary text-sm font-normal mb-2">
        {` ${i18n.t("median")}: ${
          topic?.results?.median || i18n.t("not_finished")
        }`}
      </Text>

      {topic.onFinishedDate ? (
        topic.votes.map((vote: any) => (
          <View className="border-2 border-secondary p-2 w-full flex flex-row items-center justify-between">
            <Text className="text-secondary text-sm font-normal">
              {vote.user}
            </Text>
            <View className="flex-row items-center justify-center border-l-2 border-secondary">
              <Text className="text-secondary text-sm font-normal mx-4">
                {vote.card}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <Text>{i18n.t("none_available_votes")}</Text>
      )}
    </View>
  );
}
