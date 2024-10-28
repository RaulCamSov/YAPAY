package com.upc.tp_yapay.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity

public class MyOrders {         //MISORDENES ( Y FECHA DE LAS ORDENES DEL CUSTOMER)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "payment_type_id")
    private PaymentType paymentType;

    private Date orderDate;


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<DetailsOrder> detailsOrders = new ArrayList<>(); // Inicializar la lista


}
