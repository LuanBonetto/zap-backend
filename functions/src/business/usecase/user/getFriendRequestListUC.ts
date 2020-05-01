import { UserGateway } from "../../gateways/userGateway";
import { FirebaseAdmin } from "../../../sources/firebaseAdmin";

export class GetFriendRequestListUC {
  constructor( private db:UserGateway ){}

  public async execute( input:GetFriendRequestListInput ): Promise<GetFriendRequestListOutput>{
    try{

      const auth = new FirebaseAdmin()

      const userEmail = await auth.getEmailOfToken( input.token )

      const requestList = await this.db.getFriendRequestList( userEmail )


      return ( {
        requestList
      } )

    }catch( err ){
      throw {
        code: err.statusCode || 400,
        message: err.message || "Some error occurred during the request"
      }
    }
  }
}

interface GetFriendRequestListInput {
  token: string
}

interface GetFriendRequestListOutput {
  requestList: object[]
}
