package com.upc.tp_yapay.Controller;

import com.upc.tp_yapay.DTO.DTOPaymentType;
import com.upc.tp_yapay.Entities.Customer;
import com.upc.tp_yapay.Entities.PaymentType;
import com.upc.tp_yapay.Services.CustomerService;
import com.upc.tp_yapay.Services.PaymentTypeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class PaymentTypeController {
    @Autowired
    private PaymentTypeService paymentTypeService;

    @Autowired
    private CustomerService customerService;

    @PostMapping("/payment-type")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<DTOPaymentType> save(@RequestBody DTOPaymentType dtoPaymentType) {
        ModelMapper modelMapper = new ModelMapper();

        // Print the received DTO
        System.out.println("Received DTOPaymentType: " + dtoPaymentType);

        PaymentType paymentType = modelMapper.map(dtoPaymentType, PaymentType.class);

        // Print the mapped entity
        System.out.println("Mapped PaymentType before setting customer: " + paymentType);

        // Asignar el cliente al PaymentType
        Customer customer = customerService.getById(dtoPaymentType.getCustomerId());
        if (customer == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        paymentType.setCustomer(customer);

        // Print the entity after setting the customer
        System.out.println("Mapped PaymentType after setting customer: " + paymentType);

        paymentTypeService.save(paymentType);

        // Print the saved entity
        System.out.println("Saved PaymentType: " + paymentType);

        dtoPaymentType = modelMapper.map(paymentType, DTOPaymentType.class);
        return new ResponseEntity<>(dtoPaymentType, HttpStatus.OK);
    }

    @GetMapping("/payment-type")
    public ResponseEntity<List<DTOPaymentType>> list() {
        ModelMapper modelMapper = new ModelMapper();
        List<DTOPaymentType> list = Arrays.asList(modelMapper.map(paymentTypeService.list(), DTOPaymentType[].class));
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/payment-type/{id}")
    public ResponseEntity<DTOPaymentType> getPaymentTypeById(@PathVariable Long id) {
        ModelMapper modelMapper = new ModelMapper();
        DTOPaymentType dtoPaymentType = modelMapper.map(paymentTypeService.getById(id), DTOPaymentType.class);
        return new ResponseEntity<>(dtoPaymentType, HttpStatus.OK);
    }

}
