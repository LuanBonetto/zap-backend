import firebaseAdmin from 'firebase-admin';

export class FirebaseAdmin {
  public async verifyToken( token:string ): Promise<void>{
    const checkRevoked = true

    await firebaseAdmin.auth().verifyIdToken( token, checkRevoked )
  }

  public async getIdOfToken( token:string ): Promise<string>{
    const verifiedToken = await firebaseAdmin.auth().verifyIdToken( token )

    const id = verifiedToken.uid

    return id
  }
}
