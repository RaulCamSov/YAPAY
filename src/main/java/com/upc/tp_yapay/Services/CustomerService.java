package com.upc.tp_yapay.Services;

import com.upc.tp_yapay.Entities.Customer;
import com.upc.tp_yapay.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    //CRUD CUSTOMER
    public Customer save(Customer customer){
        return customerRepository.save(customer);
    }

    public List<Customer> list(){
        return customerRepository.findAll();
    }

    public Customer getById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

}
