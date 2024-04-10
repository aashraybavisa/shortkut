import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { Constants, Screen, Storage, Utility } from "../utils";
import { Firestore } from ".";

const signUp = (reqData: any) => {
  // Registration
  const { email, password, displayName, navigation, isMerchant } = reqData;
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (resData) => {
      console.log("User account created & signed in!", resData);

      // Setting Up Display Name of User
      await auth().currentUser?.updateProfile({ displayName });

      // Firestore User Creation Query
      const firestoreObj = {
        email,
        displayName,
        userId: auth()?.currentUser?.uid,
        uid: auth()?.currentUser?.uid,
        isMerchant,
      };
      console.log(firestoreObj, "firestoreObj");
      await Firestore.createUser(firestoreObj);

      // Firestore User Data Fetch
      const userData = await Firestore.getUser(firestoreObj?.uid);

      // Store User
      Storage.setUserData({ ...userData, authData: auth()?.currentUser });

      // Stack Change
      navigation.replace(isMerchant ? Screen.BusinessStack : Screen.MainTab);
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
        Utility.showToast(Constants.Auth.emailAlreadyInUse);
        navigation.navigate(Screen.LoginScreen);
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }

      console.error(error);
    });
};

const signIn = async (reqData: any) => {
  // Login
  const { email, password, navigation } = reqData;
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (resData) => {
      console.log("Log In Success", resData);

      // Firestore User Data Fetch
      const userData = await Firestore.getUser(auth()?.currentUser?.uid);

      // Store User
      console.log(
        { ...userData, authData: auth()?.currentUser },
        "{ ...userData, authData: auth()?.currentUser }"
      );
      Storage.setUserData({ ...userData, authData: auth()?.currentUser });

      // Stack Change
      navigation.replace(
        userData?.isMerchant ? Screen.BusinessStack : Screen.MainTab
      );
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        console.log(Constants.Auth.emailAlreadyInUse);
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }

      if (error.code === "auth/wrong-password") {
        // sendPasswordResetEmail(email)
        Alert.alert("Wrong Password");
      }

      if (error.code === "auth/user-not-found") {
        console.log("User not found!");
      }
      console.error(error);
    });
};

const signOut = (navigation: any) => {
  auth()
    .signOut()
    .then(() => {
      console.log("User signed out!");

      // Remove User
      Storage.logout();

      // Stack Change
      navigation.replace(Screen.AuthStack);
    })
    .catch((e) => console.log(e, `catch : Auth.signOut`));
};

const onAuthStateChanged = () => {
  auth().onAuthStateChanged((user) => {
    console.log(user?.uid, "Auth.onAuthStateChanged");
  });
};

const sendPasswordResetEmail = (email: string) => {
  auth()
    .sendPasswordResetEmail(email)
    .then((resData) => {
      // Password reset email sent.
      console.log(resData, "Auth.sendPasswordResetEmail");
      Alert.alert("Password reset email sent. Please check your email");
    })
    .catch((error) => {
      // Error occurred. Inspect error.code.
      console.log(error, "Auth.sendPasswordResetEmail");
    });
};

const Auth = {
  signUp,
  signIn,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
};

export default Auth;
