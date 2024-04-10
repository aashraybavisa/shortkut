import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import _ from "lodash";
import { Color, Images, Responsive, Screen } from "../utils";

const tabBar = [
  {
    key: Screen.ProfileScreen,
    icon: Images.user,
    name: "Profile",
  },
  {
    key: Screen.MainStack,
    icon: Images.home,
    name: "Home",
  },
  {
    key: Screen.AppointmentScreen,
    icon: Images.appointment,
    name: "Appointments",
  },
];

interface AppTabBarProps {
  state: any;
  navigation: any;
}

const AppTabBar: React.FC<AppTabBarProps> = (props) => {
  const { state, navigation } = props;
  const onPress = (item: any) => {
    navigation.jumpTo(item?.key, { isFromTab: true });
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      {_.map(tabBar, (item, index) => {
        const isFocused = state.index === index;
        return (
          <TouchableOpacity
            style={styles.itemView}
            key={`tab-${index}`}
            onPress={() => onPress(item)}
          >
            <Image
              source={item?.icon}
              style={[styles.itemImg, isFocused && { tintColor: Color.white }]}
              resizeMode={"contain"}
            />
            <Text
              style={[
                styles.itemText,
                isFocused && { color: Color.white, fontWeight: "bold" },
              ]}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

export default AppTabBar;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Color.themeBlue,
    flexDirection: "row",
  },
  itemView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    paddingVertical: Responsive.verticalScale(5),
  },
  itemImg: {
    height: Responsive.verticalScale(30),
    aspectRatio: 1,
    margin: Responsive.verticalScale(5),
    tintColor: Color.black,
  },
  itemText: {
    fontSize: Responsive.font(4),
    // fontWeight: "700",
    color: Color.black,
  },
});
