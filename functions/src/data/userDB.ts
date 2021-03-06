import { BaseDB } from "./baseBD";
import { User } from "../business/entities/user";
import { BadRequestError } from "../business/errors/badRequestError";
import { UserGateway } from "../business/gateways/userGateway";

export class UserDB extends BaseDB implements UserGateway {

  private usersCollection = "users"
  private friendRequestsCollection = "friendRequests"
  private friendsCollection = "friendslist"

  public async createUserAccount( user:User ): Promise<void>{
    try{
      const response = await this.dbFirebase.auth().createUserWithEmailAndPassword( user.getEmail(), user.getPassword() )

      const userId = response.user?.uid

      if( !userId ){
        throw new BadRequestError( "user id not found" )
      }

      await this.dbFirestore.collection( this.usersCollection ).doc( userId )
      .set( {
        nickname: user.getNickname(),
        email: user.getEmail(),
        photo: user.getPhoto()
      } )

    }catch( err ){
      throw new BadRequestError( err.message )
    }
  }

  public async login( email:string, password: string ): Promise<void>{
    try{
      await this.dbFirebase.auth().signInWithEmailAndPassword( email, password )

    }catch( err ){
      throw new BadRequestError( err.message )
    }
  }

  public async redefinePassword( email:string ): Promise<void>{
    try{
      await this.dbFirebase.auth().sendPasswordResetEmail( email )

    }catch( err ){
      throw new BadRequestError( err.message )
    }
  }

  public async sendFriendRequest( userId:string, friendEmail:string ): Promise<void>{
    try{

      const userInfo = await this.dbFirestore.collection( this.usersCollection ).doc( userId ).get()

      await this.dbFirestore.collection( this.friendRequestsCollection ).doc().set( {
        senderUserId: userId,
        senderNickname: userInfo.data()?.nickname,
        senderEmail: userInfo.data()?.email,
        senderPhoto: userInfo.data()?.photo,
        receiverUserEmail: friendEmail
      } )

    }catch( err ){
      throw new BadRequestError( err.message )
    }
  }

  public async getFriendRequestList( userEmail:string ): Promise<object[]>{
    try{
      const result = await this.dbFirestore.collection( this.friendRequestsCollection )
      .where( "receiverUserEmail", "==", userEmail )
      .get()

      const listOfRequests = result.docs.map( ( doc ) => {
        const request = {
          requestId: doc.id,
          senderUserId: doc.data().senderUserId,
          senderNickname: doc.data().senderNickname,
          senderPhoto: doc.data().senderPhoto,
          senderEmail: doc.data().senderEmail
        }

        return request
      } )

      return listOfRequests

    }catch( err ){
      throw new BadRequestError( err.message )
    }
  }

  public async getUserById( userId:string ): Promise<object>{
    try{
      const result = await this.dbFirestore.collection( this.usersCollection ).doc( userId ).get()

      const userInfo = {
        nickname: result.data()?.nickname,
        email: result.data()?.email,
        photo: result.data()?.photo
      }

      return userInfo

    }catch( err ){
      throw new BadRequestError( err.message )
    }
  }

  public async approveFriendRequest( userId:string, friendId: string, requestId:string ): Promise<void>{
    try{
      await this.dbFirestore.collection( this.friendsCollection ).doc()
      .set( {
        userId,
        friendId
      } )

      await this.dbFirestore.collection( this.friendsCollection ).doc()
      .set( {
        userId: friendId,
        friendId: userId
      } )

      await this.dbFirestore.collection( this.friendRequestsCollection ).doc( requestId ).delete()

    }catch( err ){
      throw new BadRequestError( err.message )
    }
  }

  public async denyFriendRequest( requestId:string ): Promise<void>{
    try{
      await this.dbFirestore.collection( this.friendRequestsCollection ).doc( requestId ).delete()

    }catch( err ){
      throw new BadRequestError( err.message )
    }
  }
}

