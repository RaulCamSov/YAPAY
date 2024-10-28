package com.upc.tp_yapay.Repository;

import com.upc.tp_yapay.Entities.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Products,Long> {
    List<Products> findByNameContainingOrSizeContaining(String name, String size);
    @Query("SELECT p FROM Products p WHERE p.id_product IN (SELECT d.products.id_product FROM DetailsOrder d)")
    List<Products> findSoldProducts();
    @Query("SELECT p FROM Products p WHERE p.name LIKE %:name% AND p.id_product IN (SELECT d.products.id_product FROM DetailsOrder d)")
    List<Products> searchSoldProductsByName(String name);

    List<Products> findByProductBrandContaining(String brand);

}
