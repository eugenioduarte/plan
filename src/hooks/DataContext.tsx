import { createContext, useContext, useEffect, useState } from "react";
import { get, onValue } from "firebase/database";
import {
  setEnterRoomRT,
  setNewRoomQuery,
  setNewRoomRT,
} from "@/services/firebaseRealTime";
import { AlertContext } from "./AlertContext";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useI18n } from "@hooks";
import { validateRoomCode } from "@utils";

type DataContextType = {
  roomData: any;
  enterRoom: (roomCode: string, userName: string) => void;
  createNewRoom: (roomCode: string, userName: string) => void;
  setRoomData: (roomData: any) => void;
  userName: string;
  getUserName: () => void;
  updateUserName: (userName: string) => void;
};

export const DataContext = createContext<DataContextType>({
  roomData: null,
  enterRoom: () => {},
  createNewRoom: () => {},
  setRoomData: () => {},
  userName: "",
  getUserName: () => {},
  updateUserName: () => {},
});

export function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { handleAlert } = useContext(AlertContext);
  const [roomData, setRoomData] = useState<any>(null);
  const [userName, setUserName] = useState("");
  const i18n = useI18n();

  useEffect(() => {
    getUserName();
  }, [roomData]);

  const getUserName = async () => {
    try {
      const userName = await AsyncStorage.getItem("userName");
      if (userName) {
        setUserName(userName);
      } else {
        router.push("/");
      }
    } catch (error) {
      handleAlert(1, i18n.t("error"), i18n.t("error_enter_room"));
    }
  };

  const updateUserName = async (userName: string) => {
    if (userName.length === 0) return;

    try {
      await AsyncStorage.setItem("userName", userName);
      router.push("/home");
    } catch (error) {
      //TODO: handle error
      handleAlert(1, i18n.t("error"), i18n.t("error_enter_room"));
    }
  };

  const enterRoom = (roomCode: string, userName: string) => {
    const roomRef = setNewRoomQuery(roomCode);
    let flag = true;

    get(roomRef)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          flag = false;
          return;
        }
        onValue(roomRef, (snapshot) => {
          flag = true;
          const data = snapshot.val();
          setRoomData(data);
        });
        setEnterRoomRT(roomCode, userName)
          .then(() => {
            router.push({ pathname: "/table", params: { roomCode } });
          })
          .catch(() => {
            handleAlert(1, i18n.t("error"), i18n.t("error_enter_room"));
          });
      })
      .then(() => {
        if (!flag) {
          handleAlert(1, i18n.t("error"), i18n.t("error_room_not_found"));
        }
      });
  };

  const createNewRoom = (roomCode: string, userName: string) => {
    if (!validateRoomCode(roomCode)) {
      handleAlert(
        1,
        i18n.t("error"),
        i18n.t("error_room_code_required_6_characters")
      );
      return;
    }
    setNewRoomRT(roomCode, userName);
    enterRoom(roomCode, userName);
  };

  return (
    <DataContext.Provider
      value={{
        roomData,
        enterRoom,
        createNewRoom,
        setRoomData,
        userName,
        getUserName,
        updateUserName,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
