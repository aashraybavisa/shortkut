import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Screen from "../utils/Screens";
import LandingPage from "../screens/Home/landingPage";
import SearchScreen from "../screens/Search Screen/SearchScreen";
import BusinessProfileScreen from "../screens/BusinessProfileScreen/BusinessProfileScreen";
import CalenderScreen from "../screens/CalenderScreen/CalenderScreen";
import PaymentSelectionScreen from "../screens/PaymentSelectionScreen/PaymentSelectionScreen";
import AcknowledgementScreen from "../screens/Acknowledgement Screen/AcknowledgementScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import FirstScreen from "../screens/FirstScreen/FirstScreen";
import RegistrationScreen from "../screens/RegistrationScreen/RegistrationScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import AppointmentScreen from "../screens/AppointmentScreen/AppointmentScreen";
import { AppTabBar } from "../components";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screen.FirstScreen} component={FirstScreen} />
      <Stack.Screen name={Screen.LoginScreen} component={LoginScreen} />
      <Stack.Screen
        name={Screen.RegistrationScreen}
        component={RegistrationScreen}
      />
    </Stack.Navigator>
  );
};

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={Screen.MainStack}
      tabBar={(props) => <AppTabBar {...props} />}
    >
      <Tab.Screen name={Screen.ProfileScreen} component={ProfileScreen} />
      <Tab.Screen name={Screen.MainStack} component={MainStack} />
      <Tab.Screen
        name={Screen.AppointmentScreen}
        component={AppointmentScreen}
      />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screen.LandingScreen} component={LandingPage} />
      <Stack.Screen name={Screen.SearchScreen} component={SearchScreen} />
      <Stack.Screen
        name={Screen.BusinessProfileScreen}
        component={BusinessProfileScreen}
      />
      <Stack.Screen name={Screen.CalenderScreen} component={CalenderScreen} />
      <Stack.Screen
        name={Screen.PaymentSelectionScreen}
        component={PaymentSelectionScreen}
      />
      <Stack.Screen
        name={Screen.AcknowledgementScreen}
        component={AcknowledgementScreen}
      />
    </Stack.Navigator>
  );
};

interface RouteProps {
  isLogIn: boolean;
}

const Route: React.FC<RouteProps> = (props) => {
  const { isLogIn } = props;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isLogIn ? Screen.MainTab : Screen.AuthStack}
      >
        <Stack.Screen name={Screen.AuthStack} component={AuthStack} />
        <Stack.Screen name={Screen.MainTab} component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
