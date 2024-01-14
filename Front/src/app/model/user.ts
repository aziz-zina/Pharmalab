export class User {
  public _id: string;
  public name: string;
  public email: string;
  public password?: string;
  public address: string;
  public role: string;
  public state: string;
  public medicines_bought?: any = [
    {
      quantity: Number,
      medicine: String,
      purchaseDate: Date,
    },
  ];

  constructor(
    email: string,
    address: string,
    name: string,
    role: string,
    password?: string
  ) {
    this.email = email;
    this.password = password;
    this.address = address;
    this.name = name;
    this.role = role;
  }

  setState(state: string) {
    this.state = state;
  }

  getId() {
    return this._id;
  }

  setId(id: string) {
    this._id = id;
  }
}
