package com.upc.tp_yapay.Controller;

import com.upc.tp_yapay.DTO.DTOCustomer;
import com.upc.tp_yapay.DTO.DTOMicroEmployer;
import com.upc.tp_yapay.DTO.DTOProducts;
import com.upc.tp_yapay.Entities.Customer;
import com.upc.tp_yapay.Entities.User;
import com.upc.tp_yapay.Services.CustomerService;
import com.upc.tp_yapay.Services.IUserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ControllerCustomer {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private IUserService userService;

    @PostMapping("/customer")
    public ResponseEntity<DTOCustomer> save(@RequestBody DTOCustomer dtoCustomer) {
        ModelMapper modelMapper = new ModelMapper();
        Customer customer = modelMapper.map(dtoCustomer, Customer.class);

        // Agregar registros de depuración
        System.out.println("DTO Customer: " + dtoCustomer);
        System.out.println("User ID from DTO: " + dtoCustomer.getUserId());

        if (dtoCustomer.getUserId() == null) {
            System.out.println("User ID is null");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user = userService.findById(dtoCustomer.getUserId());
        if (user == null) {
            System.out.println("User not found with ID: " + dtoCustomer.getUserId());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        customer.setUser(user);
        customerService.save(customer);
        dtoCustomer = modelMapper.map(customer, DTOCustomer.class);
        return new ResponseEntity<>(dtoCustomer, HttpStatus.OK);
    }


    @GetMapping("/customer")
    public ResponseEntity<List<DTOCustomer>> list() {
        ModelMapper modelMapper = new ModelMapper();
        List<DTOCustomer> list = Arrays.asList(modelMapper.map(customerService.list(), DTOCustomer[].class));
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/customer/{id}")
    public ResponseEntity<DTOCustomer> getCustomerById(@PathVariable Long id) {
        ModelMapper modelMapper = new ModelMapper();
        DTOCustomer dtocustomer = modelMapper.map(customerService.getById(id), DTOCustomer.class);
        return new ResponseEntity<>(dtocustomer, HttpStatus.OK);
    }

    @PutMapping("/customer/{id}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<DTOCustomer> update(@PathVariable Long id, @RequestBody DTOCustomer dtoCustomer) {
        ModelMapper modelMapper = new ModelMapper();
        Customer existingCustomer = customerService.getById(id);

        if (existingCustomer == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        existingCustomer.setName_customer(dtoCustomer.getName_customer());
        existingCustomer.setEmail_customer(dtoCustomer.getEmail_customer());
        existingCustomer.setBirthdate_customer(dtoCustomer.getBirthdate_customer());
        existingCustomer.setPhone_customer(dtoCustomer.getPhone_customer());
        existingCustomer.setAddress_customer(dtoCustomer.getAddress_customer());

        // Asignar el usuario al customer
        User user = userService.findById(dtoCustomer.getUserId());
        if (user != null) {
            existingCustomer.setUser(user);
        }

        customerService.save(existingCustomer);

        DTOCustomer updatedDtoCustomer = modelMapper.map(existingCustomer, DTOCustomer.class);
        return new ResponseEntity<>(updatedDtoCustomer, HttpStatus.OK);
    }
}