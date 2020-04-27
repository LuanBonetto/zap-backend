import * as functions from 'firebase-functions';
import firebaseAdmin from 'firebase-admin';
import firebase from 'firebase';
import { AddressInfo } from 'net';
import app from "./presentation/routes"

exports.app = functions.https.onRequest ( app );

const firebaseConfig = {
  apiKey: functions.config().someservice.key,
  authDomain: functions.config().someservice.auth,
  databaseURL: functions.config().someservice.database,
  projectId: functions.config().someservice.project,
  storageBucket: functions.config().someservice.storage,
  messagingSenderId: functions.config().someservice.messaging,
  appId: functions.config().someservice.app,
};

firebaseAdmin.initializeApp ( functions.config ().firebase );
firebase.initializeApp ( firebaseConfig );


const server = app.listen( process.env.PORT || 3000, () => {
  if ( server ) {
    const address = server.address () as AddressInfo;
    // tslint:disable-next-line: no-console
    console.log( `Server is running in http://localhost:${address.port}` );
  } else {
    // tslint:disable-next-line: no-console
    console.error( 'Failure upon starting server.' );
  }
} );
