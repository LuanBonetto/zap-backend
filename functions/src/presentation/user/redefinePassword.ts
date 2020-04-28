import { Request, Response } from 'express';
import { RedefinePasswordUC } from '../../business/usecase/user/redefinePasswordUC';
import { UserDB } from '../../data/userDB';

export const redefinePasswordEndpoint = async ( req: Request, res: Response ) => {
  try{
    const redefinePasswordUC = new RedefinePasswordUC( new UserDB() )
    const response = await redefinePasswordUC.execute( {
      email: req.body.email
    } )

    res.status( 200 ).send( response )
  }catch( err ){
    res.status( err.errorCode || 400 ).send( {
      message: err.message
    } )
  }
}
