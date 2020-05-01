import { Request, Response } from 'express';
import { ApproveFriendRequestUC } from '../../business/usecase/user/approveFriendRequestUC';
import { UserDB } from '../../data/userDB';

export const approveFriendRequestEndpoint = async ( req: Request, res: Response ) => {
  try{
    const approveFriendRequestUC = new ApproveFriendRequestUC( new UserDB() )
    const response = await approveFriendRequestUC.execute( {
      token: req.headers.auth as string,
      friendId: req.body.friendId,
      requestId: req.body.requestId
    } )

    res.status( 200 ).send( response )
  }catch( err ){
    res.status( err.errorCode || 400 ).send( {
      message: err.message
    } )
  }
}
