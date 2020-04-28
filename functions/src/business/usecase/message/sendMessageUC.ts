import { MessageDB } from "../../../data/messageDB";
import { Message } from "../../entities/message";
import { FirebaseAdmin } from "../../../sources/firebaseAdmin";

export class SendMessageUC {
  constructor( private db:MessageDB ){}

  public async execute( input:SendMessageInput ): Promise<sendMessageOutput>{
    try{

      const auth = new FirebaseAdmin()
      const userId = await auth.getIdOfToken( input.token )

      const newMessage = new Message(
          input.nickname,
          input.messageContent,
          input.shippingTime,
          userId,
          input.contactId
        )

      await this.db.sendMessage( newMessage )

      return ( {
        message: "Message sent successfully"
      } )
    }catch( err ){
      throw {
        code: err.statusCode || 400,
        message: err.message || "Some error occurred during the request"
      }
    }
  }
}

interface SendMessageInput{
  nickname: string
  messageContent: string
  shippingTime: number
  token: string
  contactId: string
}

interface sendMessageOutput{
  message: string
}
