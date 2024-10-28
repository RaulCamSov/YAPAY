package com.upc.tp_yapay.DTO;

import com.upc.tp_yapay.Entities.Customer;
import com.upc.tp_yapay.Entities.DetailsOrder;
import com.upc.tp_yapay.Entities.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DTOMyOrders {
    private Long id;
    private Customer customer;
    private PaymentType paymentType;
    private Date orderDate;
    private List<DetailsOrder> detailsOrders;


}
