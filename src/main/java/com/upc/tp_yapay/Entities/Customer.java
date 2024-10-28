package com.upc.tp_yapay.Entities;

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
public class Customer implements Serializable {         //CLIENTE
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_customer;
    private String name_customer;
    private String email_customer;
    private Date birthdate_customer;
    private String phone_customer;
    private String address_customer;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL)
    private PaymentType paymentType;

    @Override
    public String toString() {
        return "Customer{" +
                "id_customer=" + id_customer +
                ", name_customer='" + name_customer + '\'' +
                ", email_customer='" + email_customer + '\'' +
                ", birthdate_customer=" + birthdate_customer +
                ", phone_customer='" + phone_customer + '\'' +
                ", address_customer='" + address_customer + '\'' +
                '}';
    }
}
