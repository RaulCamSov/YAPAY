package com.upc.tp_yapay.Services;

import com.upc.tp_yapay.Entities.Products;
import com.upc.tp_yapay.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServices {
    @Autowired
    private ProductRepository productRepository;

    //CRUD CUSTOMER
    public Products save(Products products){
        return productRepository.save(products);
    }

    public List<Products> list(){
        return productRepository.findAll();
    }

   public List<Products> searchBySizeOrName(String size, String name) {
       return productRepository.findByNameContainingOrSizeContaining(name, size);
   }
    public List<Products> listSoldProducts() {
        return productRepository.findSoldProducts();
    }
    public List<Products> searchSoldProductsByName(String name) {
        return productRepository.searchSoldProductsByName(name);
    }
    public List<Products> searchByBrand(String brand) {
        return productRepository.findByProductBrandContaining(brand);
    }

    public Products getProductById(Long id) {
        Optional<Products> product = productRepository.findById(id);
        return product.orElse(null);
    }

}
