package com.upc.tp_yapay.Services;

import com.upc.tp_yapay.Entities.PaymentType;
import com.upc.tp_yapay.Repository.PaymentTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentTypeService {
    @Autowired
    private PaymentTypeRepository paymentTypeRepository;

    public PaymentType save(PaymentType paymentType){
        // Print the entity before saving to ensure CVVcard is present
        System.out.println("Saving PaymentType: " + paymentType);
        return paymentTypeRepository.save(paymentType);
    }

    public List<PaymentType> list(){
        return paymentTypeRepository.findAll();
    }

    public PaymentType getById(Long id) {
        return paymentTypeRepository.findById(id).orElse(null);
    }
}
