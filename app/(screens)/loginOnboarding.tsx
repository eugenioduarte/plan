import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { OnboardingScreen, LoginScreen } from "@screens";

const Routes = {
  ONBOARDING: "onboarding",
  LOGIN: "login",
};

const Index = () => {
  const [route, setRoute] = useState(Routes.ONBOARDING);

  const getInitialRoute = async () => {
    try {
      const value = await AsyncStorage.getItem("onboarding");
      if (value) {
        setRoute(Routes.LOGIN);
      } else {
        setRoute(Routes.ONBOARDING);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInitialRoute();
  }, []);

  return route === Routes.ONBOARDING ? <OnboardingScreen /> : <LoginScreen />;
};

export default Index;
