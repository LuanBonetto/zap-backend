import { Request, Response } from 'express';
import { DenyFriendRequestUC } from '../../business/usecase/user/denyFriendRequestUC';
import { UserDB } from '../../data/userDB';

export const denyFriendRequestEndpoint = async ( req: Request, res: Response ) => {
  try{
    const denyFriendRequestUC = new DenyFriendRequestUC( new UserDB() )
    const response = await denyFriendRequestUC.execute( {
      token: req.headers.auth as string,
      requestId: req.body.requestId
    } )

    res.status( 200 ).send( response )
  }catch( err ){
    res.status( err.errorCode || 400 ).send( {
      message: err.message
    } )
  }
}
