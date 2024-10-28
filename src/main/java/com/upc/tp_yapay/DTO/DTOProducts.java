package com.upc.tp_yapay.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DTOProducts {
    private Long id_product;
    private String name;
    private String description_product;
    private Integer price_product;
    private String productBrand;
    private String size;
    private Integer quantity_product;
    private String imageUrl; // URL de la imagen del producto

}
