package com.upc.tp_yapay.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity

public class Products {         //PRODUCTOS
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_product;
    private String name;
    private String description_product;
    private Integer price_product;
    private String productBrand;
    private String size;
    private Integer quantity_product;
    private String imageUrl; // URL de la imagen del producto

}
