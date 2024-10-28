package com.upc.tp_yapay;

import com.upc.tp_yapay.Entities.Role;
import com.upc.tp_yapay.Entities.User;
import com.upc.tp_yapay.Repository.RoleRepository;
import com.upc.tp_yapay.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Component
@Transactional
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        insertRoles();
        insertAdminUser();
    }

    private void insertRoles() {
        if (roleRepository.count() == 0) {
            Role adminRole = roleRepository.findByrol("ADMIN");
            if (adminRole == null) {
                adminRole = new Role();
                adminRole.setRol("ADMIN");
            }

            Role employerRole = roleRepository.findByrol("EMPLOYER");
            if (employerRole == null) {
                employerRole = new Role();
                employerRole.setRol("EMPLOYER");
            }

            Role customerRole = roleRepository.findByrol("CUSTOMER");
            if (customerRole == null) {
                customerRole = new Role();
                customerRole.setRol("CUSTOMER");
            }

            roleRepository.save(adminRole);
            roleRepository.save(employerRole);
            roleRepository.save(customerRole);
        }
    }

    private void insertAdminUser() {
        if (userRepository.count() == 0) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setEnabled(true);
            Set<Role> roles = new HashSet<>();
            Role adminRole = roleRepository.findByrol("ADMIN");
            if (adminRole != null) {
                roles.add(adminRole);
            }
            adminUser.setRoles(roles);

            userRepository.save(adminUser);
        }
    }

}
