import { AlertError } from "@components";
import { createContext, useState, useEffect } from "react";

type AlertStruct = {
  flag: boolean;
  message: string;
  descriptionText?: string;
};

type AlertContextType = {
  handleAlert: (type: number, message: string, descriptionText: string) => void;
};

export const AlertContext = createContext<AlertContextType>({
  handleAlert: () => {},
});

export function AlertContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [counterToClose, setCounterToClose] = useState<number>(0);
  const [errorAlert, setErrorAlert] = useState<AlertStruct>({
    flag: false,
    message: "",
    descriptionText: "",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (counterToClose > 0) {
        setCounterToClose(counterToClose - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [errorAlert.flag === true, counterToClose]);

  const handleAlert = (
    type: number,
    message: string,
    descriptionText: string
  ) => {
    switch (type) {
      case 1:
        setCounterToClose(3);
        setErrorAlert({
          flag: true,
          message,
          descriptionText,
        });
        setTimeout(() => {
          setErrorAlert({
            flag: false,
            message: "",
            descriptionText: "",
          });
        }, 4000);
        break;

      default:
        break;
    }
  };

  return (
    <AlertContext.Provider value={{ handleAlert }}>
      <AlertError
        visible={errorAlert.flag}
        setVisible={() =>
          setErrorAlert({ ...errorAlert, flag: !errorAlert.flag })
        }
        text={errorAlert.message}
        descriptionText={errorAlert.descriptionText}
        counterToClose={counterToClose}
      />
      {children}
    </AlertContext.Provider>
  );
}
