import { UserGateway } from "../../gateways/userGateway";
import { User } from "../../entities/user";
import { FirebaseAuth } from "../../../sources/firebaseAuth";

export class CreateUserAccoutUC {
  constructor( private db:UserGateway ){}

  public async execute( input:CreateUserAccoutInput ): Promise<CreateUserAccoutOutput>{
    try{

      const newUser = new User(
        input.nickname,
        input.email,
        input.password,
        input.photo
      )

      await this.db.createUserAccount( newUser )

      const auth = new FirebaseAuth()

      auth.sendEmailVerification()

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

interface CreateUserAccoutInput {
  nickname: string,
  email: string,
  password: string,
  photo: string
}

interface CreateUserAccoutOutput {
  message: string
  token: string
}
