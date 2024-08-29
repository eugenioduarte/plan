import React, { useRef } from "react";
import { Text, TextInput, TouchableOpacity, Pressable } from "react-native";
import { useI18n } from "@hooks";

type EnterRoomContainerProps = {
  roomCode: string;
  setRoomCode: (roomCode: string) => void;
  handleEnterRoom: () => void;
  onFocus: () => void;
  onBlur: () => void;
};

export default function EnterRoomContainer({
  roomCode,
  setRoomCode,
  handleEnterRoom,
  onFocus,
  onBlur,
}: EnterRoomContainerProps) {
  const i18n = useI18n();

  const textInputRef = useRef<TextInput>(null);

  const handlePressOutside = () => {
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
    onBlur();
  };

  return (
    <Pressable
      className="flex-1 items-center justify-center bg-secondary"
      onPress={handlePressOutside}
    >
      <Text className="text-xl font-bold text-primary px-4">
        {i18n.t("enter_with_your_room_code")}
      </Text>
      <TextInput
        ref={textInputRef}
        className="w-1/2 p-6 my-4 text-center border-2 border-primary rounded-md text-primary text-xl"
        value={roomCode}
        onChangeText={setRoomCode}
        onFocus={onFocus}
      />
      <TouchableOpacity
        className="w-1/2 mt-4 px-4 py-6 my-2 text-secondary bg-primary rounded-md flex items-center mt-2"
        onPress={handleEnterRoom}
      >
        <Text className="text-secondary text-xl ">{i18n.t("enter")}</Text>
      </TouchableOpacity>
    </Pressable>
  );
}
