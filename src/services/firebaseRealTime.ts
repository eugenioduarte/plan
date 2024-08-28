import { db } from "../vault/config";
import { child, get, push, ref, remove, set } from "firebase/database";

// paths
export const topicsQuery = (roomCode: string) =>
  ref(db, `table/${roomCode}/topics`);
export const topicSelectedQuery = (roomCode: string) =>
  ref(db, `table/${roomCode}/selectedTopic`);
export const onlineUsersQuery = (roomCode: string) =>
  ref(db, `table/${roomCode}/users`);
export const setSelectedCardByTopicQuery = (roomCode: string, topic: string) =>
  ref(db, `table/${roomCode}/topics/${topic}/votes`);
export const setNewRoomQuery = (roomCode: string) =>
  ref(db, "table/" + roomCode);
export const setStatusRoomQuery = (roomCode: string) =>
  ref(db, "table/" + roomCode + "/isValid");

export const setTopicRT = (
  roomCode: string,
  topicText: string,
  description?: string
) => {
  const topicsQueryRef = topicsQuery(roomCode);
  const topicRef = child(topicsQueryRef, topicText);
  const currentTime = new Date().toISOString();

  get(topicsQueryRef)
    .then((snapshot) => {
      if (!snapshot.exists()) {
        setSelectedTopicRT(roomCode, topicText);
      }

      return set(topicRef, {
        name: topicText,
        createdOn: currentTime,
        description: description,
      });
    })
    .then(() => {
      console.log(`Tópico ${topicText} criado com sucesso.`);
    })
    .catch((error) => {
      console.error(`Erro ao criar o tópico ${topicText}: `, error);
    });
};

export const setSelectedTopicRT = (roomCode: string, name: string) => {
  const topicSelectedQueryRef = topicSelectedQuery(roomCode);
  set(topicSelectedQueryRef, name);
};

export const removeSelectedTopicRT = (roomCode: string) => {
  const topicSelectedQueryRef = topicSelectedQuery(roomCode);
  remove(topicSelectedQueryRef);
};

export const removeTopicRT = (roomCode: string, topicTextToDelete: string) => {
  const topicsQueryRef = topicsQuery(roomCode);
  return get(topicsQueryRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const currentTopics = snapshot.val();

        if (Array.isArray(currentTopics)) {
          const updatedTopics = currentTopics.filter(
            (topic) => topic.name !== topicTextToDelete
          );
          return set(topicsQueryRef, updatedTopics)
            .then(() => {
              return updatedTopics;
            })
            .catch((error) => {
              console.error("Erro ao remover tópico: ", error);
            });
        }
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar tópicos: ", error);
    });
};

export const setAverageToTheTopicRT = (
  roomCode: string,
  topic: string,
  average: number,
  median: number,
  onFinishedDate: string
) => {
  const topicVotesQueryRef = ref(db, `table/${roomCode}/topics/${topic}`);
  get(topicVotesQueryRef).then((snapshot) => {
    if (snapshot.exists()) {
      const usersRef = child(topicVotesQueryRef, "results");
      set(usersRef, {
        average: average,
        median: median,
        onFinishedDate: onFinishedDate,
      });
    }
  });
};

export const setVoteToTheTopicRT = (
  roomCode: string,
  topic: string,
  user: string,
  card: string
) => {
  const topicVotesQueryRef = ref(db, `table/${roomCode}/topics/${topic}/votes`);
  get(topicVotesQueryRef).then((snapshot) => {
    if (snapshot.exists()) {
      const currentVotes = snapshot.val();
      const updatedVotes = Array.isArray(currentVotes) ? currentVotes : [];
      const index = updatedVotes.findIndex((vote) => vote.user === user);
      console.log("index", index);
      if (index !== -1) {
        updatedVotes[index].card = card;
      } else {
        updatedVotes.push({ user: user, card: card });
        console.log("updatedVotes", updatedVotes);
      }
      set(topicVotesQueryRef, updatedVotes);
    } else {
      set(topicVotesQueryRef, [{ user: user, card: card }]);
    }
  });
};

export const removeUserFromRoom = (roomCode: string, userName: string) => {
  const roomRef = ref(db, `table/${roomCode}`);
  const usersRef = child(roomRef, "users");

  get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const usersObject: { [key: string]: any } = snapshot.val();
        const updatedUsers: { [key: string]: any } = {};

        for (const key in usersObject) {
          if (usersObject.hasOwnProperty(key)) {
            const user = usersObject[key];
            if (user.userName !== userName) {
              updatedUsers[key] = user;
            }
          }
        }
        if (
          Object.keys(updatedUsers).length !== Object.keys(usersObject).length
        ) {
          set(usersRef, updatedUsers)
            .then(() => {
              console.log(`Usuários com userName ${userName} removidos.`);
            })
            .catch((error) => {
              console.error("removeUserFromRoom1: ", error);
            });
        }
      }
    })
    .catch((error) => {
      console.error("removeUserFromRoom3: ", error);
    });
};

export const setNewRoomRT = async (roomCode: string, userName: string) => {
  const roomRef = setNewRoomQuery(roomCode);
  set(roomRef, {
    id: roomCode,
    admin: userName,
    createdOn: new Date().toISOString(),
  });
};

export const setEnterRoomRT = async (roomCode: string, userName: string) => {
  const roomRef = setNewRoomQuery(roomCode);
  get(roomRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const usersRef = child(roomRef, "users");
        const newUser = { userName: userName, active: true };
        push(usersRef, newUser);
      } else {
        console.log("setEnterRoomRT: Room not found");
      }
    })
    .catch((error) => {
      console.error("setEnterRoomRT: ", error);
    });
};

export const getTopicInfo = async (roomCode: string, topic: string) => {
  const topicRef = ref(db, `table/${roomCode}/topics/${topic}`);
  return get(topicRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("getTopicInfo:Room not found");
      }
    })
    .catch((error) => {
      console.error("getTopicInfo: ", error);
    });
};

export const getUsersOnline = async (roomCode: string) => {
  const usersRef = onlineUsersQuery(roomCode);
  return get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("getUsersOnline:Room not found");
      }
    })
    .catch((error) => {
      console.error("getUsersOnline: ", error);
    });
};
