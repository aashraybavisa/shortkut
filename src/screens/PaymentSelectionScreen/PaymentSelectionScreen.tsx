import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Color, Screen } from "../../utils"; // Ensure to import Screen from the appropriate location
import { AppHeader } from "../../components";
import { Firestore } from "../../firebase";

interface PaymentSelectionScreenProps {
  navigation: any;
  route: any;
}

const PaymentSelectionScreen: React.FC<PaymentSelectionScreenProps> = ({
  navigation,
  route,
}) => {
  const [tipPercentage, setTipPercentage] = useState(0);
  const [paymentDetail, setPaymentDetail] = useState(null);

  const tipPercentages = [10, 15, 20, 25];

  const processPaymentDetails = (tipPercentage: number = 0) => {
    const price = route.params.selectedService.price;
    const tip = tipPercentage * 0.01 * price;
    const taxes = price * 0.12;
    const total = price + tip + taxes;
    const details = [
      { label: "Price", value: `$${price.toFixed(2)}` },
      { label: "Tip", value: `$${tip.toFixed(2)}` },
      { label: "Taxes", value: `$${taxes.toFixed(2)}` },
      { label: "Total", value: `$${total.toFixed(2)}`, isBold: true },
    ];
    setTipPercentage(tipPercentage);
    setPaymentDetail(details);
  };

  useEffect(() => {
    processPaymentDetails();
  }, []);
  // Dummy data for other details

  const handleBookWithCard = async () => {
    console.log(route.params, "route.params");
    const price = route.params.selectedService.price;
    const tip = tipPercentage * 0.01 * price;
    const taxes = price * 0.12;
    const total = price + tip + taxes;
    const payload = {
      services: [route.params.selectedService],
      payment: {
        price: price.toFixed(2),
        tip: tip.toFixed(2),
        taxes: taxes.toFixed(2),
        total: total.toFixed(2),
      },
      shop: route.params.shop,
      date: route.params.selectedDate,
      time: route.params.selectedTime,
      userId: global.user?.userId,
    };
    const transactionId = await Firestore.saveTransaction(payload);
    navigation.navigate(Screen.AcknowledgementScreen, {
      ...route.params,
      transactionId,
    });
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader isBackButton onPressBack={onPressBack} />
      <View style={styles.mainContainer}>
        <View style={styles.tipContainer}>
          <Text style={styles.label}>Select Tip Percentage:</Text>
          <View style={styles.tipButtonContainer}>
            {tipPercentages.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tipButton,
                  {
                    borderColor:
                      tipPercentage === item
                        ? Color.themeBlue
                        : Color.blueShadow,
                  },
                ]}
                onPress={() => processPaymentDetails(item)}
              >
                <Text style={styles.tipButtonText}>{`${item}%`}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.lineSeparator} />
        {!!paymentDetail && (
          <View style={styles.detailsContainer}>
            {paymentDetail.map((detail, index) => (
              <View key={index} style={styles.detailItem}>
                <Text style={[styles.label, detail.isBold && styles.boldText]}>
                  {detail.label}:
                </Text>
                <Text style={[styles.value, detail.isBold && styles.boldText]}>
                  {detail.value}
                </Text>
              </View>
            ))}
          </View>
        )}
        {/* <View style={styles.promoContainer}>
          <TextInput
            style={styles.promoInput}
            placeholder="Enter Promo Code"
            value={promoCode}
            onChangeText={(text) => setPromoCode(text)}
          />
        </View> */}
        <View style={styles.lineSeparator} />
        <TouchableOpacity
          style={styles.bookWithCardButton}
          onPress={handleBookWithCard}
        >
          <Text style={styles.bookWithCardText}>Book With Card</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  timingContainer: {
    marginBottom: 20,
  },
  selectedTimeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tipContainer: {
    marginBottom: 20,
  },
  tipButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  tipButton: {
    backgroundColor: Color.blueShadow,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 5,
    marginRight: 10,
    width: "45%", // Adjusted width for the 3x2 grid
    borderWidth: 1,
  },
  tipButtonText: {
    fontSize: 16,
  },
  lineSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    marginVertical: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    textAlign: "right",
  },
  promoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  promoInput: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },
  applyPayButton: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  applyPayText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  bookWithCardButton: {
    backgroundColor: Color.themeBlue,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  bookWithCardText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PaymentSelectionScreen;
