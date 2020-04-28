import { UserGateway } from "../../gateways/userGateway";

export class RedefinePasswordUC {
  constructor( private db:UserGateway ){}

  public async execute( input: RedefinePasswordInput ): Promise<RedefinePasswordOutput>{
    try{
      await this.db.redefinePassword( input.email )

      return ( {
        message: "Success, check your email to reset your password"
      } )
    }catch( err ){
      throw {
        code: err.statusCode || 400,
        message: err.message || "Some error occurred during the request"
      }
    }
  }
}

interface RedefinePasswordInput {
  email: string
}

interface RedefinePasswordOutput {
  message: string
}
