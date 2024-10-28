package com.upc.tp_yapay.Entities;


import com.upc.tp_yapay.Services.MicroEmployerService;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class MicroEmployer {        //MICROEMPRESARIO

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_micro_employer;
    private String first_name;
    private String phone_number;
    private String email_micro_employer;
    private String name_microEnterprise;
    private String address_microEnterprise;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;
}
