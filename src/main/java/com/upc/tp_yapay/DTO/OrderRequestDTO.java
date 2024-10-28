package com.upc.tp_yapay.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequestDTO { //SOLICITUD DE LISTADO DE TODOS LOS PRODUCTOS A COMPRAR POR UN CLIENTE
    private Long customerId;
    private Long paymentTypeId;
    private List<OrderProductDTO> products;
}
