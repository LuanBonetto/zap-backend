import { User } from "../entities/user";

export interface UserGateway{
  createUserAccount( user:User ): Promise<void>
  login( email:string, password: string ): Promise<void>
}
