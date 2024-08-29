export const validateRoomCode = (roomCode: string) => {
  const regex = /^(?=.*[A-Z]).{4,}$/;
  const result = regex.test(roomCode);
  return result;
};
