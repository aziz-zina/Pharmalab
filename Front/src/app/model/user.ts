export class User {
  public name: string;
  public email: string;
  public password?: string;
  public address: string;
  public role: string;
  public state: string;

  constructor(email: string, address: string, name: string, role: string, password?: string) {
    this.email = email;
    this.password = password;
    this.address = address;
    this.name = name;
    this.role = role;
  }

  setState(state: string) {
    this.state = state;
  }

}
