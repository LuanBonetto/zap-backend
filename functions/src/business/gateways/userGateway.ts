import { User } from "../entities/user";

export interface UserGateway{
  createUserAccount( user:User ): Promise<void>
}
