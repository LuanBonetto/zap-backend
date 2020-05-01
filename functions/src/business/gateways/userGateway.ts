import { User } from "../entities/user";

export interface UserGateway{
  createUserAccount( user:User ): Promise<void>
  login( email:string, password: string ): Promise<void>
  redefinePassword( email:string ): Promise<void>
  sendFriendRequest( userId:string, friendEmail:string ): Promise<void>
  getFriendRequestList( userEmail:string ): Promise<object[]>
  getUserById( userId:string ): Promise<object>
  approveFriendRequest( userId:string, friendId: string, requestId:string ): Promise<void>
}
