import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppButton, AppContainer, AppHeader } from "../../components";
import { Auth } from "../../firebase";
import { NavigationProp } from "@react-navigation/native";
import { Color, Responsive } from "../../utils";

interface ProfileScreenProps {
  navigation: NavigationProp<any, any>;
}

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
  const { navigation } = props;

  const onPressLogOut = () => {
    // Implement logout functionality here
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "No", onPress: () => {}, style: "cancel" },
      {
        text: "Yes",
        onPress: () => Auth?.signOut(navigation),
        style: "destructive",
      },
    ]);
  };

  const renderItem = (title: string, answer: string) => {
    return (
      <View style={styles.smallItemView}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.ansText}>{answer}</Text>
      </View>
    );
  };

  const { displayName, email } = global?.user;

  return (
    <AppContainer>
      <AppHeader title={"Profile"} />
      <View style={styles.mainContainer}>
        {renderItem("Name", displayName)}
        {renderItem("Email", email)}
      </View>
      <AppButton
        text={"Logout"}
        onPress={onPressLogOut}
        style={styles.logoutTouch}
      />
    </AppContainer>
  );
};

interface ProfileScreenProps {}

export default ProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Responsive.scale(10),
  },
  logoutTouch: {
    marginHorizontal: Responsive.scale(10),
  },
  smallItemView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Responsive.scale(10),
    paddingVertical: Responsive.verticalScale(10),
    backgroundColor: Color.blueShadow,
    marginTop: Responsive.verticalScale(10),
    borderRadius: 5,
  },
  titleText: {
    fontSize: Responsive.font(4.5),
    color: Color.black,
    flex: 1,
  },
  ansText: {
    fontSize: Responsive.font(4.5),
    color: Color.themeBlue,
    fontWeight: "700",
  },
});
