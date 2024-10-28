package com.upc.tp_yapay.Controller;

import com.upc.tp_yapay.DTO.DTOCustomer;
import com.upc.tp_yapay.DTO.DTOMicroEmployer;
import com.upc.tp_yapay.Entities.Customer;
import com.upc.tp_yapay.Entities.MicroEmployer;
import com.upc.tp_yapay.Entities.User;
import com.upc.tp_yapay.Repository.MicroEmployerRepository;
import com.upc.tp_yapay.Repository.UserRepository;
import com.upc.tp_yapay.Services.CustomerService;
import com.upc.tp_yapay.Services.IUserService;
import com.upc.tp_yapay.Services.MicroEmployerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ControllerMicroEmployer {
    @Autowired
    private MicroEmployerService microEmployerService;
    @Autowired
    private IUserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MicroEmployerRepository microEmployerRepository;


    @PostMapping("/Employer")
    public ResponseEntity<DTOMicroEmployer> save(@RequestBody DTOMicroEmployer dtoMicroEmployer) {
        ModelMapper modelMapper = new ModelMapper();
        MicroEmployer microEmployer = modelMapper.map(dtoMicroEmployer, MicroEmployer.class);

        // Asignar el usuario al microemployer
        User user = userService.findById(dtoMicroEmployer.getUserId());
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        microEmployer.setUser(user);

        microEmployerRepository.save(microEmployer);
        dtoMicroEmployer = modelMapper.map(microEmployer, DTOMicroEmployer.class);
        return new ResponseEntity<>(dtoMicroEmployer, HttpStatus.OK);
    }


    @GetMapping("/Employer")
    public ResponseEntity<List<DTOMicroEmployer>> list() {
        ModelMapper modelMapper = new ModelMapper();
        List<DTOMicroEmployer> list = Arrays.asList(modelMapper.map(microEmployerService.list(), DTOMicroEmployer[].class));
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/Employer/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<DTOMicroEmployer> getEmployerById(@PathVariable Long id) {
        ModelMapper modelMapper = new ModelMapper();
        DTOMicroEmployer dtoMicroEmployer = modelMapper.map(microEmployerService.findById(id), DTOMicroEmployer.class);
        return new ResponseEntity<>(dtoMicroEmployer, HttpStatus.OK);
    }

    @PutMapping("/Employer/{id}")
    @PreAuthorize("hasAuthority('EMPLOYER')")
    public ResponseEntity<DTOMicroEmployer> update(@PathVariable Long id, @RequestBody DTOMicroEmployer dtoMicroEmployer) {
        ModelMapper modelMapper = new ModelMapper();
        MicroEmployer existingMicroEmployer = microEmployerService.findById(id);

        if (existingMicroEmployer == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        existingMicroEmployer.setFirst_name(dtoMicroEmployer.getFirst_name());
        existingMicroEmployer.setPhone_number(dtoMicroEmployer.getPhone_number());
        existingMicroEmployer.setEmail_micro_employer(dtoMicroEmployer.getEmail_micro_employer());
        existingMicroEmployer.setName_microEnterprise(dtoMicroEmployer.getName_microEnterprise());
        existingMicroEmployer.setAddress_microEnterprise(dtoMicroEmployer.getAddress_microEnterprise());

        microEmployerService.save(existingMicroEmployer);

        DTOMicroEmployer updatedDtoMicroEmployer = modelMapper.map(existingMicroEmployer, DTOMicroEmployer.class);
        return new ResponseEntity<>(updatedDtoMicroEmployer, HttpStatus.OK);
    }

}
