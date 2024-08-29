import { Text, TouchableOpacity } from "react-native";
import React from "react";

type PokerCardKeyboardProps = {
  textCard: string;
  handleSelectCard: (cardName: string) => void;
  selectedCard?: boolean;
};

export default function PokerCardKeyboard({
  textCard = "1",
  handleSelectCard,
  selectedCard,
}: PokerCardKeyboardProps) {

  
  return (
    <TouchableOpacity
      onPress={() => handleSelectCard(textCard)}
      className={`${
        selectedCard ? "border-yellow-500 " : "border-primary "
      }w-12 h-12 rounded-xl flex items-center justify-center border-2 bg-secondary m-1`}
    >
      <Text className="text-sm font-normal">{textCard}</Text>
    </TouchableOpacity>
  );
}
