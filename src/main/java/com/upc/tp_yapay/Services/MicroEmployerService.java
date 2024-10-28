package com.upc.tp_yapay.Services;

import com.upc.tp_yapay.Entities.MicroEmployer;
import com.upc.tp_yapay.Repository.MicroEmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MicroEmployerService {
    @Autowired
    private MicroEmployerRepository microEmployerRepository;

    //CRUD CUSTOMER
    public MicroEmployer save(MicroEmployer microEmployer){
        return microEmployerRepository.save(microEmployer);
    }

    public List<MicroEmployer> list(){
        return microEmployerRepository.findAll();
    }

    public MicroEmployer findById(Long id){
        return microEmployerRepository.findById(id).orElse(null);
    }
}
