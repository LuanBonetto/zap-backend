import { UserGateway } from "../../gateways/userGateway";
import { FirebaseAdmin } from "../../../sources/firebaseAdmin";

export class SendFriendRequestUC {
  constructor( private db:UserGateway ){}

  public async execute( input:SendFriendRequestInput ): Promise<SendFriendRequestOutput>{
    try{

      const auth = new FirebaseAdmin()
      const userId = await auth.getIdOfToken( input.token )

      await this.db.sendFriendRequest( userId, input.friendEmail )

      return ( {
        message: "Friend request sent successfully"
      } )
    }catch( err ){
      throw {
        code: err.statusCode || 400,
        message: err.message || "Some error occurred during the request"
      }
    }
  }
}

interface SendFriendRequestInput {
  token: string,
  friendEmail: string
}

interface SendFriendRequestOutput {
  message: string
}
