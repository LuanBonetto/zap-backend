import { Message } from "../entities/message";

export interface MessageGateway {
  sendMessage( input:Message ): Promise<void>
}
