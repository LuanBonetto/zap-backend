import { UserGateway } from "../../gateways/userGateway";
import { FirebaseAdmin } from "../../../sources/firebaseAdmin";

export class ApproveFriendRequestUC {
  constructor( private db:UserGateway ){}

  public async execute( input:ApproveFriendRequestInput ){
    try{
      const auth = new FirebaseAdmin()
      const userId = await auth.getIdOfToken( input.token )

      await this.db.approveFriendRequest( userId, input.friendId, input.requestId )

    }catch( err ){
      throw {
        code: err.statusCode || 400,
        message: err.message || "Some error occurred during the request"
      }
    }
  }
}

interface ApproveFriendRequestInput{
  token: string,
  friendId: string,
  requestId: string
}
