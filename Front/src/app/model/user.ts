export class User {
  public name: String;
  public email: string;
  public password: string;
  public address: string;
  public role: string;
  public state: string;

  constructor(email: string, password: string, address: string, name: string, role: string) {
    this.email = email;
    this.password = password;
    this.address = address;
    this.name = name;
    this.role = role;
  }
}
