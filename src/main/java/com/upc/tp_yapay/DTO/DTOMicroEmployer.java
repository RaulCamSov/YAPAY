package com.upc.tp_yapay.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DTOMicroEmployer {
    private Long id_micro_employer;
    private String first_name;
    private String phone_number;
    private String email_micro_employer;
    private String name_microEnterprise;
    private String address_microEnterprise;
    private Long userId; // Nuevo campo para asociar un User

}
