import { Platform } from "react-native";

export const isAndroid = () => Platform.OS === "android";

export const getInitials = (name: string) => {
  if (!name) return "";

  const words = name.split(" ");

  const firstLetter = words[0]?.slice(0, 1).toUpperCase();
  if (words.length === 1) {
    return (
      firstLetter + (name.length > 1 ? name.slice(1, 2).toLowerCase() : "")
    );
  }
  if (words.length === 2) {
    const secondLetter = words[1]?.slice(0, 1).toUpperCase();
    return firstLetter + (secondLetter ? secondLetter : "");
  }
  if (words.length > 2) {
    const lastLetter = words[words.length - 1]?.slice(0, 1).toUpperCase();
    return firstLetter + (lastLetter ? lastLetter : "");
  }
  return "";
};
