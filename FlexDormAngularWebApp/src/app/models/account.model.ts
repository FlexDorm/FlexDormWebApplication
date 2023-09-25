export class Account {
  id: number;
  name: string;
  lastname:string;
  username:string;
  phone:string;
  email: string;
  address:string;
  password: string;
  type:string;
  birthdate:string;

  constructor(id: number,name:string, lastname:string,username:string,phone:string, email: string, address:string, password: string, type:string, birthdate: string) {
    this.id = id;
    this.name=name;
    this.lastname=lastname;
    this.username=username;
    this.phone=phone;
    this.email = email;
    this.address=address;
    this.password = password;
    this.type=type;
    this.birthdate=birthdate;
  }
}
