export class Message {
  constructor(
    private nickname: string,
    private messageContent: string,
    private shippingTime: number,
    private userId: string,
    private contactId: string,
    private id?: string
  ){}

  public getNickname(): string {
    return this.nickname
  }

  public getMessageContent(): string {
    return this.messageContent
  }

  public getShippingTime(): number {
    return this.shippingTime
  }

  public getUserId(): string {
    return this.userId
  }

  public getContactId(): string {
    return this.contactId
  }

  public getId():string | undefined {
    return this.id
  }
}
