import firestore from '@react-native-firebase/firestore'
import { getMerchantTemplate } from './Template'

const createUser = (reqData: any) => {
  const { uid, isMerchant } = reqData
  let payload = null

  if (isMerchant) {
    console.log(reqData, 'reqData')
    payload = getMerchantTemplate(reqData)
    console.log(JSON.stringify(payload), 'payload')
    firestore()
      .collection('users')
      .doc(uid)
      .set(payload)
      .then(() => {
        console.log('User added!')
        global.user = payload
      })
      .catch((e) => console.log(e, 'catch - Firestore.createUser'))
  } else {
    payload = reqData
    firestore()
      .collection('users')
      .doc(uid)
      .set(payload)
      .then(() => {
        console.log('User added!')
      })
      .catch((e) => console.log(e, 'catch - Firestore.createUser'))
  }
}

const getUser = (uid: string) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data())
          global.user = documentSnapshot.data()
          resolve(documentSnapshot.data())
        } else {
          console.log('User does not exist!')
          reject('User does not exist!')
        }
      })
      .catch((e) => {
        console.log(e, 'catch - Firestore.getUser')
        reject(e)
      })
  })
}

const Firestore = { createUser, getUser }

export default Firestore
