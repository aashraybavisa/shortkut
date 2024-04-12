import firestore from "@react-native-firebase/firestore";
import { getMerchantTemplate } from "./Template";

const createUser = (reqData: any) => {
  return new Promise((resolve, reject) => {
    const { uid, isMerchant } = reqData;
    let payload = null;

    if (isMerchant) {
      console.log(reqData, "reqData");
      payload = getMerchantTemplate(reqData);
      console.log(JSON.stringify(payload), "payload");
      firestore()
        .collection("users")
        .doc(uid)
        .set(payload)
        .then((doc) => {
          console.log("User added!");
          // global.user = payload;
          resolve(doc);
        })
        .catch((e) => {
          console.log(e, "catch - Firestore.createUser");
          reject(e);
        });
    } else {
      payload = reqData;
      firestore()
        .collection("users")
        .doc(uid)
        .set(payload)
        .then((doc) => {
          console.log("User added!");
          resolve(doc);
        })
        .catch((e) => {
          console.log(e, "catch - Firestore.createUser");
          reject(e);
        });
    }
  });
};

const getUser = (uid: string) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User data: ", documentSnapshot.data());
          resolve(documentSnapshot.data());
        } else {
          console.log("User does not exist!");
          reject("User does not exist!");
        }
      })
      .catch((e) => {
        console.log(e, "catch - Firestore.getUser");
        reject(e);
      });
  });
};

const saveTransaction = (reqData: any) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection("transactions")
      .add(reqData)
      .then((documentSnapshot) => {
        console.log("Transaction added!", documentSnapshot.id);
        firestore()
          .collection("users")
          .doc(global?.user?.userId)
          .update({
            transactions: firestore.FieldValue.arrayUnion(documentSnapshot.id),
          });
        resolve(documentSnapshot.id);
      })
      .catch((e) => {
        console.log(e, "catch - Firestore.saveTransaction");
        reject(e);
      });
  });
};

const Firestore = { createUser, getUser, saveTransaction };

export default Firestore;
