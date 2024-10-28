import { Role } from "./role";
import { Customer } from "./customer";
import { MicroEmployer } from "./micro-employer";

export class User {
  user_id: number=0;
  username: string=" ";
  password: string="";
  enabled: boolean=true;
  roles: Role[]=[];
  customer?: Customer; // Opcional, puede ser null
  employer?: MicroEmployer; // Opcional, puede ser null
}
