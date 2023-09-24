export interface RoomData {
  id: number;
  title: string;
  photo: string;
  description: string;
  price: number;
  address: string;
  nearUniversities: string[];
}

export interface AccountData {
  id: number;
  name:string;
  lastname:string
  username: string;
  phone: string;
  email: string;
  address: string;
  password: string;
  profilePicture: string;
}