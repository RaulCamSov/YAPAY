import { Customer } from "./customer";
import { MicroEmployer } from "./micro-employer";

export class Registeruser {
  username: string;
  password: string;
  role: string; // "CUSTOMER" o "EMPLOYER"
  enabled: boolean;
  customerDetails?: Customer; // Detalles del cliente si el rol es CUSTOMER
  employerDetails?: MicroEmployer; // Detalles del empleador si el rol es EMPLOYER
}
