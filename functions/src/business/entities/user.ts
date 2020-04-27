export class User {
  constructor(
    private nickname: string,
    private email: string,
    private password: string,
    private photo: string
  ){}

  public getNickname():string {
    return this.nickname
  }

  public getEmail():string {
    return this.email
  }

  public getPassword():string{
    return this.password
  }

  public getPhoto():string{
    return this.photo
  }
}
