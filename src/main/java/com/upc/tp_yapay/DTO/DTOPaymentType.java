package com.upc.tp_yapay.DTO;

import com.upc.tp_yapay.Entities.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DTOPaymentType {
    private Long id_paymenteType;
    private int cardpayment;
    private Date dateexpiration;
    private String titularcard;
    private int CVVcard;
    private Long customerId; // Asocia con el ID del cliente
}
