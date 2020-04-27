import firebaseAdmin from 'firebase-admin'
import firebase from "firebase"

export class BaseDB {
  protected dbFirestore = firebaseAdmin.firestore()
  protected dbFirebase = firebase
}
