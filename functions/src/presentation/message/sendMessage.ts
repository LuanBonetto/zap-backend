import { Request, Response } from 'express';
import { SendMessageUC } from '../../business/usecase/message/sendMessageUC';
import { MessageDB } from '../../data/messageDB';

export const sendMessageEndpoint = async ( req: Request, res: Response ) => {
  try{
    const sendMessageUC = new SendMessageUC( new MessageDB() )
    const response = await sendMessageUC.execute( {
      nickname: req.body.nickname,
      messageContent: req.body.messageContent,
      shippingTime: req.body.shippingTime,
      token: req.headers.auth as string,
      contactId: req.body.contactId
    } )

    res.status( 200 ).send( response )
  }catch( err ){
    res.status( err.errorCode || 400 ).send( {
      message: err.message
    } )
  }
}
