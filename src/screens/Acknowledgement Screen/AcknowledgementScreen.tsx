import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Color, Screen } from "../../utils";
import { AppButton, AppHeader } from "../../components";

interface AcknowledgementScreenProps {
  navigation: any;
  route: any;
}

const AcknowledgementScreen: React.FC<AcknowledgementScreenProps> = ({
  navigation,
  route,
}) => {
  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressDone = () => {
    navigation.navigate(Screen.LandingScreen);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader isBackButton onPressBack={onPressBack} />
      <View style={styles.container}>
        <View style={styles.rectangularContainer}>
          <Text style={styles.title}>Appointment Reserved</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Confirmation code:</Text>
            <Text style={styles.value}>{route.params?.transactionId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Shop:</Text>
            <Text style={styles.value}>{route.params.shop.businessName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Service:</Text>
            <Text style={styles.value}>
              {route.params.selectedService.title}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Time:</Text>
            <Text
              style={styles.value}
            >{`${route.params.selectedDate}, ${route.params.selectedTime}`}</Text>
          </View>
          {/* <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 20 }]}>
            <Text style={styles.buttonText}>Add to calendar</Text>
          </TouchableOpacity> */}
          <View style={styles.row}>
            <Text style={styles.label}>Payment method:</Text>
            <Text style={styles.value}>VISA</Text>
          </View>
          {/* // <View style={styles.row}>
          //   <Text style={styles.label}>Address:</Text>
          //   <View style={{ flex: 2 }}>
          //     <Text style={styles.value}></Text>
          //   </View>
          // </View> */}
          <View style={styles.row}>
            <Text style={styles.label}>Location:</Text>
            <Text
              style={styles.value}
            >{`${route.params.shop.address},\n${route.params.shop.city} ${route.params.shop.province}`}</Text>
          </View>
        </View>
        <Text style={styles.note}>
          You will not be charged until an hour before your appointment starts.
        </Text>

        <AppButton text="Done" onPress={onPressDone} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.background,
  },
  rectangularContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.themeBlue,
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    flex: 2,
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    flex: 3,
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  note: {
    fontSize: 14,
    color: "gray",
    marginTop: 20,
    textAlign: "center",
  },
});

export default AcknowledgementScreen;
