package com.upc.tp_yapay.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DTOCustomer {
    private Long id_customer;
    private String name_customer;
    private String email_customer;
    private Date birthdate_customer;
    private String phone_customer;
    private String address_customer;
    private Long userId; // Nuevo campo para asociar un User
    private Long paymentTypeId; // Nuevo campo para asociar el PaymentType

}
