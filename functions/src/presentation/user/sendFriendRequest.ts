import { Request, Response } from 'express';
import { UserDB } from '../../data/userDB';
import { SendFriendRequestUC } from '../../business/usecase/user/sendFriendRequestUC';

export const sendFriendRequestEndpoint = async ( req: Request, res: Response ) => {
  try{
    const sendFriendRequestUC = new SendFriendRequestUC( new UserDB() )
    const response = await sendFriendRequestUC.execute( {
      token: req.headers.auth as string,
      friendEmail: req.body.friendEmail
    } )

    res.status( 200 ).send( response )
  }catch( err ){
    res.status( err.errorCode || 400 ).send( {
      message: err.message
    } )
  }
}
