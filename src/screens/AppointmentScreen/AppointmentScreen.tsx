import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AppContainer, AppHeader } from "../../components";
import { Color, Responsive, Storage } from "../../utils";
import firestore from "@react-native-firebase/firestore";
import _ from "lodash";

interface AppointmentScreenProps {}

const AppointmentScreen: React.FC<AppointmentScreenProps> = (props) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    console.log("global.user?.userId", global.user);
    const subscriber = firestore()
      .collection("users")
      .doc(global.user?.userId)
      .onSnapshot((documentSnapshot) => {
        console.log("User data: ", documentSnapshot.data());
        const latestUser = { ...global.user, ...documentSnapshot.data() };
        Storage.setUserData(latestUser);
        setUpAppointmentsData(latestUser?.transactions);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const setUpAppointmentsData = async (transactions: any) => {
    console.log(transactions, "transactions");
    const allAppointments = await Promise.all(
      transactions.map(async (transactionId: any) => {
        const data = await firestore()
          .collection("transactions")
          .doc(transactionId)
          .get();
        return { ...data.data(), transactionId };
      })
    );
    const sortedAppointments = _.sortBy(allAppointments, "date").reverse();
    console.log(sortedAppointments, "sortedAppointments");
    setAppointments(sortedAppointments);
  };

  return (
    <AppContainer>
      <AppHeader title={"Appointments"} />
      <View style={styles.mainContainer}>
        <FlatList
          data={appointments}
          renderItem={({ item }) => {
            return (
              <View style={styles.mainView}>
                <View style={styles.itemView}>
                  <Text
                    style={styles.timeText}
                  >{`${item?.date} ${item?.time}`}</Text>
                  <Text
                    style={styles.priceText}
                  >{`@${item?.shop?.businessName}`}</Text>
                </View>
                {_.map(item?.services, (service: any, index: number) => {
                  return (
                    <View key={`service-${index}`} style={styles.itemView}>
                      <Text style={styles.titleText}>{service?.title}</Text>
                      <Text
                        style={styles.priceText}
                      >{`$${service?.price}`}</Text>
                    </View>
                  );
                })}
              </View>
            );
          }}
        />
      </View>
    </AppContainer>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    // alignItems: "center",
    paddingHorizontal: Responsive.scale(10),
    paddingVertical: Responsive.verticalScale(10),
  },
  mainView: {
    backgroundColor: Color.blueShadow,
    marginVertical: Responsive.verticalScale(10),
    padding: Responsive.scale(10),
    borderRadius: 5,
  },
  itemView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Responsive.verticalScale(5),
  },
  titleText: {
    fontSize: Responsive.font(5),
    fontWeight: "bold",
    marginHorizontal: Responsive.scale(10),
    color: Color.themeBlue,
    flex: 1,
  },
  priceText: {
    fontSize: Responsive.font(5),
    fontWeight: "bold",
    marginHorizontal: Responsive.scale(10),
    color: Color.black,
  },
  timeText: {
    fontSize: Responsive.font(4),
    fontWeight: "600",
    marginHorizontal: Responsive.scale(10),
    color: Color.black,
  },
});
