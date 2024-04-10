import { Text, Pressable, StyleSheet, ViewProps } from "react-native";
import React from "react";
import { Color, Responsive } from "../utils";

interface AppButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewProps["style"];
}

const AppButton: React.FC<AppButtonProps> = (props) => {
  const { onPress, text, style } = props;
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default AppButton;

AppButton.defaultProps = {
  text: "",
  onPress: () => {},
  style: {},
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.themeBlue,
    borderRadius: 10,
    paddingVertical: Responsive.scale(10),
    paddingHorizontal: Responsive.scale(20),
    marginVertical: Responsive.scale(10),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Color.blackShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    fontSize: Responsive.font(5),
    color: Color.white,
    fontWeight: "600",
  },
});
