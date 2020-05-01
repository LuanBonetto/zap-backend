import { UserGateway } from "../../gateways/userGateway";
import { FirebaseAdmin } from "../../../sources/firebaseAdmin";

export class DenyFriendRequestUC {
  constructor( private db:UserGateway ){}

  public async execute( input:DenyFriendRequestInput ): Promise<DenyFriendRequestOutput>{
    try{
      const auth = new FirebaseAdmin()

      auth.verifyToken( input.token )

      await this.db.denyFriendRequest( input.requestId )

      return ( {
        message: "friend request successfully denied"
      } )
    }catch( err ){
      throw {
        code: err.statusCode || 400,
        message: err.message || "Some error occurred during the request"
      }
    }
  }

}

interface DenyFriendRequestInput {
  token: string,
  requestId: string
}

interface DenyFriendRequestOutput {
  message: string
}
