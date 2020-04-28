import { UserGateway } from "../../gateways/userGateway";
import { FirebaseAuth } from "../../../sources/firebaseAuth";

export class LoginUC {
  constructor( private db:UserGateway ){}

  public async execute( input:LoginInput ): Promise<LoginOutput>{
    try{
      await this.db.login( input.email, input.password )

      const auth = new FirebaseAuth()
      const newToken = await auth.getToken()

      return ( {
        message: "Successfully logged in",
        token: newToken
      } )
    }catch( err ){
      throw {
        code: err.statusCode || 400,
        message: err.message || "Some error occurred during the request"
      }
    }
  }
}

interface LoginInput {
  email: string
  password: string
}

interface LoginOutput {
  message: string
  token: string
}
