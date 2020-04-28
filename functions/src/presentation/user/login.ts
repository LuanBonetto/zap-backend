import { Request, Response } from 'express';
import { LoginUC } from '../../business/usecase/user/loginUC';
import { UserDB } from '../../data/userDB';

export const loginEndpoint = async( req: Request, res: Response ) => {
  try{
    const loginUC = new LoginUC( new UserDB() )
    const response = await loginUC.execute( {
      email: req.body.email,
      password: req.body.password
    } )

    res.status( 200 ).send( response )
  }catch( err ){
    res.status( err.errorCode || 400 ).send( {
      message: err.message
    } )
  }
}
