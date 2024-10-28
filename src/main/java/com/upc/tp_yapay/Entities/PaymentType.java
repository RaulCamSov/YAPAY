package com.upc.tp_yapay.Entities;

import com.fasterxml.jackson.databind.DatabindException;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class PaymentType implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_paymenteType;
    private int cardpayment;
    private Date dateexpiration;
    private String titularcard;
    private int CVVcard;

    @OneToOne
    @JoinColumn(name = "id_customer", referencedColumnName = "id_customer")
    private Customer customer;

    @Override
    public String toString() {
        return "PaymentType{" +
                "id_paymenteType=" + id_paymenteType +
                ", cardpayment=" + cardpayment +
                ", dateexpiration=" + dateexpiration +
                ", titularcard='" + titularcard + '\'' +
                ", CVVcard=" + CVVcard +
                '}';
    }
}