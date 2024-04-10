import { View, ViewProps, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { Color } from "../utils";

interface AppContainerProps {
  children: React.ReactNode;
  isTopSafeArea?: Boolean;
  isBottomSafeArea?: Boolean;
  style?: ViewProps["style"];
}

const AppContainer: React.FC<AppContainerProps> = (props) => {
  const { style, isTopSafeArea, isBottomSafeArea } = props;
  const TopComponent = isTopSafeArea ? SafeAreaView : View;
  const BottomComponent = isBottomSafeArea ? SafeAreaView : View;
  return (
    <View style={styles.container}>
      <TopComponent style={[styles.topSafeArea]} />
      <View style={[styles.mainContainer, style]}>{props?.children}</View>
      <BottomComponent style={[styles.bottomSafeArea]} />
    </View>
  );
};

export default AppContainer;

AppContainer.defaultProps = {
  isTopSafeArea: true,
  isBottomSafeArea: true,
  style: {},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.themeBlue,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Color.background,
  },
  topSafeArea: {
    backgroundColor: Color.themeBlue,
  },
  bottomSafeArea: {
    backgroundColor: Color.white,
  },
});
