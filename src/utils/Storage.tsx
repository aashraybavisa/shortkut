import AsyncStorage from "@react-native-async-storage/async-storage";

const setUserData = async (userData: any) => {
  try {
    global.user = userData;
    await AsyncStorage.setItem("@userData", JSON.stringify(userData));
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
    global.user = null;
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
