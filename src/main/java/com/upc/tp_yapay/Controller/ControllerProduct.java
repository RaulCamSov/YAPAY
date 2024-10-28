package com.upc.tp_yapay.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.upc.tp_yapay.DTO.DTOProducts;
import com.upc.tp_yapay.Entities.Products;
import com.upc.tp_yapay.Services.FileStorageService;
import com.upc.tp_yapay.Services.ProductServices;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ControllerProduct {

    @Autowired
    private ProductServices productServices;

    @Autowired
    private FileStorageService fileStorageService;  // Inyección del servicio de almacenamiento de archivos

    @PostMapping("/Products")
    @PreAuthorize("hasAuthority('EMPLOYER')")
    public ResponseEntity<DTOProducts> save(@RequestParam("file") MultipartFile file,
                                            @RequestParam("product") String productJson) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Products products = objectMapper.readValue(productJson, Products.class); // Deserializa el JSON a un objeto Products

        // Almacenar el archivo usando el servicio y obtener la URL de la imagen
        String fileName = fileStorageService.storeFile(file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/files/")
                .path(fileName)
                .toUriString();

        products.setImageUrl(fileDownloadUri);
        productServices.save(products);

        ModelMapper modelMapper = new ModelMapper();
        DTOProducts dtoProducts = modelMapper.map(products, DTOProducts.class);
        return new ResponseEntity<>(dtoProducts, HttpStatus.OK);
    }

    @GetMapping("/Products")
    @PreAuthorize("hasAuthority('CUSTOMER') or hasAuthority('EMPLOYER') or hasAuthority('ADMIN')")
    public ResponseEntity<List<DTOProducts>> list() {
        ModelMapper modelMapper = new ModelMapper();
        List<DTOProducts>list= Arrays.asList(modelMapper.map(productServices.list(), DTOProducts[].class));
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/Products/search")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<List<DTOProducts>> search(@RequestParam(required = false) String name,
                                                    @RequestParam(required = false) String size) {
        ModelMapper modelMapper = new ModelMapper();
        List<DTOProducts> products = Arrays.asList(modelMapper.map(productServices.searchBySizeOrName(size, name), DTOProducts[].class));
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/Products/sold")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<DTOProducts>> listSoldProducts() {
        ModelMapper modelMapper = new ModelMapper();
        List<DTOProducts> products = Arrays.asList(modelMapper.map(productServices.listSoldProducts(), DTOProducts[].class));
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/Products/sold/search")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<DTOProducts>> searchSoldProductsByName(@RequestParam String name) {
        ModelMapper modelMapper = new ModelMapper();
        List<DTOProducts> products = Arrays.asList(modelMapper.map(productServices.searchSoldProductsByName(name), DTOProducts[].class));
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/Products/byBrand")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<List<DTOProducts>> searchByBrand(@RequestParam String brand) {
        ModelMapper modelMapper = new ModelMapper();
        List<DTOProducts> products = Arrays.asList(modelMapper.map(productServices.searchByBrand(brand), DTOProducts[].class));
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/Products/{id}")
    @PreAuthorize("hasAuthority('CUSTOMER') or hasAuthority('EMPLOYER')")
    public ResponseEntity<DTOProducts> getProductById(@PathVariable Long id) {
        ModelMapper modelMapper = new ModelMapper();
        DTOProducts dtoProduct = modelMapper.map(productServices.getProductById(id), DTOProducts.class);
        return new ResponseEntity<>(dtoProduct, HttpStatus.OK);
    }

    @PutMapping("/Products/{id}")
    @PreAuthorize("hasAuthority('EMPLOYER')")
    public ResponseEntity<DTOProducts> updateProduct(
            @PathVariable Long id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("product") String productJson
    ) throws IOException {
        ModelMapper modelMapper = new ModelMapper();
        Products existingProduct = productServices.getProductById(id);
        if (existingProduct == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Map the JSON string to a DTO
        DTOProducts updatedProductDTO = new ObjectMapper().readValue(productJson, DTOProducts.class);

        // Update fields
        if (file != null) {
            String fileName = fileStorageService.storeFile(file);
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/files/")
                    .path(fileName)
                    .toUriString();
            existingProduct.setImageUrl(fileDownloadUri);
        }

        // Update other fields
        if (updatedProductDTO.getName() != null) {
            existingProduct.setName(updatedProductDTO.getName());
        }
        if (updatedProductDTO.getDescription_product() != null) {
            existingProduct.setDescription_product(updatedProductDTO.getDescription_product());
        }
        if (updatedProductDTO.getPrice_product() != null) {
            existingProduct.setPrice_product(updatedProductDTO.getPrice_product());
        }
        if (updatedProductDTO.getProductBrand() != null) {
            existingProduct.setProductBrand(updatedProductDTO.getProductBrand());
        }
        if (updatedProductDTO.getSize() != null) {
            existingProduct.setSize(updatedProductDTO.getSize());
        }
        if (updatedProductDTO.getQuantity_product() != null) {
            existingProduct.setQuantity_product(updatedProductDTO.getQuantity_product());
        }

        productServices.save(existingProduct);

        DTOProducts dtoProducts = modelMapper.map(existingProduct, DTOProducts.class);
        return new ResponseEntity<>(dtoProducts, HttpStatus.OK);
    }

}
