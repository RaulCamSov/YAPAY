package com.upc.tp_yapay.DTO;

import com.upc.tp_yapay.Entities.MyOrders;
import com.upc.tp_yapay.Entities.Products;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DTODetailsOrder {
    private Long idDetailsOrder;
    private int amount;
    private int Subtotal;

    private Products products;
    private MyOrders order;

}
