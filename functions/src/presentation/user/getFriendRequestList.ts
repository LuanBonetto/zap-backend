import { Request, Response } from 'express';
import { GetFriendRequestListUC } from '../../business/usecase/user/getFriendRequestListUC';
import { UserDB } from '../../data/userDB';

export const getFriendRequestListEndpoint = async ( req: Request, res: Response ) => {
  try{
    const getFriendRequestListUC = new GetFriendRequestListUC( new UserDB() )
    const response = await getFriendRequestListUC.execute( {
      token: req.headers.auth as string
    } )

    res.status( 200 ).send( response )
  }catch( err ){
    res.status( err.errorCode || 400 ).send( {
      message: err.message
    } )
  }
}
