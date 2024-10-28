export class PaymentType {
    id_paymenteType: number = 0;
    cardpayment: number;
    dateexpiration: Date;
    titularcard: string;
    CVVcard: number; // Verifica que esto esté correctamente tipado como número
    customerId: number;
  }
  