import { User } from './user';

export class Medicine {
  public _id: string;
  public name: string;
  public description: string;
  public chemical_composition: string;
  public side_effects: string;
  public dosage_form: string;
  public manufacture_date: Date;
  public expiry_date: Date;
  public price: number;
  public quantity: number;
  public producer: User;
  public buyers?: User[];
  public state?: string;

  constructor(
    name: string,
    description: string,
    chemical_composition: string,
    side_effects: string,
    dosage_form: string,
    manufacture_date: Date,
    expiration_date: Date,
    price: number,
    quantity: number,
    producer: User,
    state?: string,
    buyers?: User[]
  ) {
    this.name = name;
    this.description = description;
    this.chemical_composition = chemical_composition;
    this.side_effects = side_effects;
    this.dosage_form = dosage_form;
    this.manufacture_date = manufacture_date;
    this.expiry_date = expiration_date;
    this.price = price;
    this.quantity = quantity;
    this.producer = producer;
    this.buyers = buyers;
    this.state = state;
  }

  setId(id: string) {
    this._id = id;
  }
}
