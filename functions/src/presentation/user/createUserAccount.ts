import { Request, Response } from 'express';
import { CreateUserAccoutUC } from '../../business/usecase/user/createUserAccountUC';
import { UserDB } from '../../data/userDB';

export const createUserAccountEndpoint = async( req: Request, res: Response ) => {
  try{
    const createUserAccountUC = new CreateUserAccoutUC( new UserDB() )
    const response = await createUserAccountUC.execute( {
      nickname: req.body.nickname,
      email: req.body.email,
      password: req.body.password,
      photo: req.body.photo
    } )

    res.status( 200 ).send( response )
  }catch( err ){
    res.status( err.errorCode || 400 ).send( {
      message: err.message
    } )
  }
}
