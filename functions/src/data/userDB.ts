import { BaseDB } from "./baseBD";
import { User } from "../business/entities/user";
import { BadRequestError } from "../business/errors/badRequestError";
import { UserGateway } from "../business/gateways/userGateway";

export class UserDB extends BaseDB implements UserGateway {

  public async createUserAccount( user:User ): Promise<void>{
    try{
      await this.dbFirebase.auth().createUserWithEmailAndPassword( user.getEmail(), user.getPassword() )

      const newProfile = {
        displayName: user.getNickname(),
        photoURL: user.getPhoto()
      }

      await this.dbFirebase.auth().currentUser?.updateProfile( newProfile )
    }catch( err ){
      throw new BadRequestError( err.message )
    }
  }
}
