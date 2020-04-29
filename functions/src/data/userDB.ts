import { BaseDB } from "./baseBD";
import { User } from "../business/entities/user";
import { BadRequestError } from "../business/errors/badRequestError";
import { UserGateway } from "../business/gateways/userGateway";

export class UserDB extends BaseDB implements UserGateway {

  private usersCollection = "users"
  //private friendsCollection = "friendslist"

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
}
