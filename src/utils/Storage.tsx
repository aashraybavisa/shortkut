import AsyncStorage from "@react-native-async-storage/async-storage";

const setUserData = async (userData: any) => {
  try {
    await AsyncStorage.setItem("@userData", JSON.stringify(userData));
    global.user = userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.log(e);
  }
};

const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem("@userData");
    global.user = userData ? JSON.parse(userData) : null;
    return userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.log(e);
  }
};

const logout = async () => {
  try {
    await AsyncStorage.removeItem("@userData");
  } catch (e) {
    console.log(e);
  }
};

const Storage = {
  setUserData,
  getUserData,
  logout,
};

export default Storage;
