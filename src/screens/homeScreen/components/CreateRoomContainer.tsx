import React, { useRef } from "react";
import { Text, TouchableOpacity, TextInput, Pressable } from "react-native";
import { useI18n } from "@hooks";

type CreateRoomContainerProps = {
  handleCreateRoom: () => void;
  createRoomCode: string;
  setCreateRoomCode: React.Dispatch<React.SetStateAction<string>>;
  onFocus: () => void;
  onBlur: () => void;
};

export default function CreateRoomContainer({
  handleCreateRoom,
  createRoomCode,
  setCreateRoomCode,
  onFocus,
  onBlur,
}: CreateRoomContainerProps) {
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
      className="flex-1 items-center justify-center bg-primary pb-6"
      onPress={handlePressOutside}
    >
      <Text className="text-xl font-bold text-secondary text-center px-4">
        {i18n.t("create_new_room")}
      </Text>
      <TextInput
        ref={textInputRef}
        className="w-1/2 p-6 my-4 text-center border-2 border-secondary rounded-md text-secondary text-xl"
        value={createRoomCode}
        onChangeText={setCreateRoomCode}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <TouchableOpacity
        className="w-1/2 mt-4 px-4 py-6 my-2 text-secondary bg-secondary rounded-md flex items-center"
        onPress={handleCreateRoom}
      >
        <Text className="text-primary text-xl ">{i18n.t("create_room")}</Text>
      </TouchableOpacity>
    </Pressable>
  );
}
