import React, { useContext, useState } from "react";
import { useFocusEffect } from "expo-router";
import { KeyboardAvoidingView, SafeAreaView } from "react-native";
import EnterRoomContainer from "./components/EnterRoomContainer";
import CreateRoomContainer from "./components/CreateRoomContainer";
import HeaderName from "./components/HeaderName";
import { isAndroid } from "@utils";
import { DataContext } from "@hooks";
import { ModalSettingsScreen } from "@screens";
import { useI18n } from "@hooks";

export const HomeScreen = () => {
  const { enterRoom, createNewRoom, userName, getUserName } =
    useContext(DataContext);
  const [roomCode, setRoomCode] = useState("");
  const [createRoomCode, setCreateRoomCode] = useState("");
  const [showTextInputCreateRoom, setShowTextInputCreateRoom] = useState(true);
  const [showTextInputEnterRoom, setShowTextInputEnterRoom] = useState(true);
  const [visible, setVisible] = useState(false);
  const i18n = useI18n();

  useFocusEffect(
    React.useCallback(() => {
      getUserName();
    }, [visible, i18n.locale, userName])
  );

  const handleCreateRoom = () => {
    createNewRoom(createRoomCode, userName);
    setCreateRoomCode("");
  };

  const handleEnterRoom = () => {
    enterRoom(roomCode, userName);
  };

  return (
    <>
      <SafeAreaView
        className={`flex-0 bg-secondary ${isAndroid() && "pt-8"}`}
      />
      <ModalSettingsScreen visible={visible} setVisibleModal={setVisible} />
      <SafeAreaView className="flex-1 bg-primary">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={isAndroid() ? "height" : "padding"}
        >
          <HeaderName userName={userName} setVisible={setVisible} />
          {showTextInputCreateRoom && (
            <EnterRoomContainer
              roomCode={roomCode}
              setRoomCode={setRoomCode}
              handleEnterRoom={handleEnterRoom}
              onFocus={() => setShowTextInputEnterRoom(false)}
              onBlur={() => setShowTextInputEnterRoom(true)}
            />
          )}
          {showTextInputEnterRoom && (
            <CreateRoomContainer
              handleCreateRoom={handleCreateRoom}
              createRoomCode={createRoomCode}
              setCreateRoomCode={setCreateRoomCode}
              onFocus={() => setShowTextInputCreateRoom(false)}
              onBlur={() => setShowTextInputCreateRoom(true)}
            />
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};
