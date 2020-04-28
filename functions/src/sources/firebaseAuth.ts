import firebase from "firebase"
import { BadRequestError } from "../business/errors/badRequestError"

export class FirebaseAuth {
  public async getToken(): Promise<string>{
    const newToken = await firebase.auth().currentUser?.getIdToken( true )

    if( !newToken ){
      throw new BadRequestError( "The token could not be generated" )
    }

    return newToken
  }

  public async sendEmailVerification() :Promise<void>{
    await firebase.auth().currentUser?.sendEmailVerification()
  }
}
