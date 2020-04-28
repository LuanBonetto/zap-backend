import { BaseDB } from "./baseBD";
import { MessageGateway } from "../business/gateways/messageGateway";
import { BadRequestError } from "../business/errors/badRequestError";
import { Message } from "../business/entities/message";

export class MessageDB extends BaseDB implements MessageGateway {

  private messageCollection = "messages"

  public async sendMessage( input:Message ): Promise<void>{
    try{

      await this.dbFirestore.collection( this.messageCollection ).doc()
      .set( {
        nickname: input.getNickname(),
        messageContent: input.getMessageContent(),
        shippingTime: input.getShippingTime(),
        userId: input.getUserId(),
        contactId: input.getContactId()
      } )

    }catch( err ){
      throw new BadRequestError( err.message )
    }
  }
}
