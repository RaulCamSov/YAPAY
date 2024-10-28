package com.upc.tp_yapay.DTO;


import com.upc.tp_yapay.Entities.Role;

import java.util.List;

public class UserDTO {
    private Long id;

    private String username;

    private String password;
    private Boolean enabled;

    private List<Role> roles;
}
