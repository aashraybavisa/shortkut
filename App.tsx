import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Route from "./src/navigation/Route";
import { Color, Images, Responsive, Storage } from "./src/utils";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    const userData = await Storage.getUserData();
    if (userData) {
      console.log(userData, "userData");
      setIsLogIn(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      {isLoading ? (
        <View style={styles.container}>
          <View style={styles.logoView}>
            <Image
              source={Images.logo}
              style={styles.logoImg}
              resizeMode={"contain"}
            />
          </View>
          <ActivityIndicator size={"large"} color={Color.themeOrange} />
        </View>
      ) : (
        <Route isLogIn={isLogIn} />
      )}
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: Responsive.font(7),
    color: Color.themeOrange,
    fontWeight: "bold",
    marginBottom: Responsive.verticalScale(50),
    textDecorationLine: "underline",
  },
  logoView: {
    width: Responsive.scale(150),
    height: Responsive.scale(150),
    marginBottom: Responsive.scale(50),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.white,
    borderRadius: 100,
  },
  logoImg: {
    width: "70%",
    height: "70%",
  },
});
