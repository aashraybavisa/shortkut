// Library Imports
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import _ from "lodash";
import moment from "moment";
// Component Imports
import { Color, Responsive, Screen } from "../../utils";
import { AppHeader } from "../../components";

// Constants
const defaultAvailability = {
  setSchedule: {
    monday: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      startTime: "09:00",
      endTime: "18:00",
      isHoliday: false,
    },
    tuesday: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      startTime: "09:00",
      endTime: "18:00",
      isHoliday: false,
    },
    wednesday: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      startTime: "09:00",
      endTime: "18:00",
      isHoliday: false,
    },
    thursday: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      startTime: "09:00",
      endTime: "18:00",
      isHoliday: false,
    },
    friday: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      startTime: "09:00",
      endTime: "18:00",
      isHoliday: false,
    },
    saturday: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      startTime: "10:00",
      endTime: "15:00",
      isHoliday: false,
    },
    sunday: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      startTime: "00:00",
      endTime: "00:00",
      isHoliday: true,
    },
  },
  specialSchedule: [
    {
      startDate: "2024-03-23",
      endDate: "2024-03-23",
      startTime: "11:00",
      endTime: "15:00",
      isHoliday: false,
    },
  ],
};

const defaultBookings = [
  {
    orderId: "random_order_id_1",
    startTime: "11:25",
    endTime: "12:10",
    date: "2024-03-14",
  },
  {
    orderId: "random_order_id_2",
    startTime: "16:35",
    endTime: "17:05",
    date: "2024-03-14",
  },
];

// Interface
interface CalenderScreenProps {
  navigation: any;
  route: any;
}

const CalenderScreen: React.FC<CalenderScreenProps> = (props) => {
  // Props
  const { navigation, route } = props;
  // State
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Lifecycle Hooks
  useEffect(() => {
    const serviceDuration = route.params?.selectedService?.duration;
    getTimeSlots(serviceDuration);
  }, [selectedDate]);

  // Functions
  const getTimeSlots = (serviceDuration = 35) => {
    const Time_Slot_Split_Duration = 30; // in minutes
    const currentDate = moment().format("YYYY-MM-DD");
    const chosenDate = moment(selectedDate).format("YYYY-MM-DD");
    const isCurrentDateSelected = moment(chosenDate).isSame(currentDate, "day");

    // SCHEDULE
    const availability = defaultAvailability;
    const chosenDay = moment(selectedDate).format("dddd").toLowerCase();
    let schedule = availability.setSchedule[chosenDay];
    // Check For Special Schedule
    const speSchedule = _.find(defaultAvailability.specialSchedule, (slot) => {
      const { startDate, endDate } = slot;
      if (
        moment(chosenDate).isSameOrAfter(startDate) &&
        moment(chosenDate).isSameOrBefore(endDate)
      )
        return slot;
    });
    schedule = !!speSchedule ? speSchedule : schedule;

    if (schedule?.isHoliday) setTimeSlots([]);

    // BOOKINGS : //LAST I WAS HERE : CONTINUE FROM HERE
    const bookings = defaultBookings;

    const startTime = moment(schedule.startTime, "HH:mm");
    // console.log("startTime", startTime);
    const endTime = moment(schedule.endTime, "HH:mm");
    // console.log("endTime", endTime);
    const slots = [];
    let currentTime = isCurrentDateSelected
      ? moment().startOf("minute")
      : startTime;
    const endOfDay = endTime.clone().subtract(serviceDuration, "minutes"); // Adjusted end time
    // console.log(endOfDay, "endOfDay");
    // generate time slots
    while (currentTime.isBefore(endOfDay)) {
      // Round the current time to the nearest multiple of 15 minutes
      const roundedMinutes =
        Math.ceil(currentTime.minute() / Time_Slot_Split_Duration) *
        Time_Slot_Split_Duration;
      currentTime = currentTime.minute(roundedMinutes);

      const startTime = currentTime.format("hh:mm A");
      const endTime = currentTime
        .add(Time_Slot_Split_Duration, "minutes")
        .format("hh:mm A");
        
      slots.push({ startTime, endTime });

      // currentTime.add(Time_Slot_Split_Duration, "minutes");
    }
    setTimeSlots(slots);
  };

  const onPressBack = () => navigation.goBack();

  const handleTimeSlotPress = (time: string) => {
    // Navigate to PaymentSelectionScreen with the selected date and time
    navigation.navigate(Screen.PaymentSelectionScreen, {
      selectedDate,
      selectedTime: time,
      ...route.params,
    });
  };

  // Render
  const renderTimeSlots = () => {
    return _.map(timeSlots, ({ startTime }, index) => (
      <TouchableOpacity
        key={index}
        style={styles.timeSlotButton}
        onPress={() => handleTimeSlotPress(startTime)}
      >
        <Text style={styles.timeSlotText}>{startTime}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader isBackButton onPressBack={onPressBack} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerText}>Choose A Time</Text>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{ [selectedDate]: { selected: true } }}
          minDate={`${moment()}`}
          style={styles.calendar}
        />
        <View style={styles.selectedDateContainer}>
          <Text style={styles.titleText}>
            Selected Date:
            <Text style={styles.selectedDateText}>{`  ${moment(
              selectedDate
            ).format("MMM DD, YYYY")}`}</Text>
          </Text>
          <View style={styles.timeSlotsContainer}>{renderTimeSlots()}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalenderScreen;

// Default Props
CalenderScreen.defaultProps = {
  route: null,
  navigation: null,
};

// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedDateContainer: {
    marginTop: 20,
  },
  selectedDateText: {
    fontWeight: "400",
  },
  timeSlotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'center',
  },
  timeSlotButton: {
    backgroundColor: Color.blueShadow,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    margin: 5,
    alignItems: "center",
    width: Responsive.scale(100), // Set a fixed width for the buttons
  },
  timeSlotText: {
    fontSize: 16,
  },
  titleText: {
    fontSize: Responsive.scale(18),
    fontWeight: "bold",
    color: Color.black,
    marginVertical: Responsive.verticalScale(10),
  },
  calendar: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Color.themeBlue,
  },
});
