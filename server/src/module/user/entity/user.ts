export class User {
  [x: string]: string
  constructor({ id, username, email, password }: User) {
    this.id = id
    this.username = username
    this.email = email
    this.password = password
  }
}
