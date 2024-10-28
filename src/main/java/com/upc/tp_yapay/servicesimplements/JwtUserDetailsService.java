package com.upc.tp_yapay.servicesimplements;

import com.upc.tp_yapay.Entities.PaymentType;
import com.upc.tp_yapay.Entities.User;
import com.upc.tp_yapay.Repository.CustomerRepository;
import com.upc.tp_yapay.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

//Clase 2
@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository repo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repo.findByUsername(username);

        if(user == null) {
            throw new UsernameNotFoundException(String.format("User not exists", username));
        }

        List<GrantedAuthority> roles = new ArrayList<>();

        user.getRoles().forEach(rol -> {
            //System.out.println(rol.getRol());
            roles.add(new SimpleGrantedAuthority(rol.getRol()));
        });

        UserDetails ud = new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.getEnabled(), true, true, true, roles);

        return ud;
    }
    public Long getCustomerId(String username) {
        User user = repo.findByUsername(username);
        return user.getCustomer() != null ? user.getCustomer().getId_customer() : null;
    }

    public Long getPaymentTypeId(String username) {
        User user = repo.findByUsername(username);
        if (user.getCustomer() != null) {
            PaymentType paymentType = user.getCustomer().getPaymentType();
            return paymentType != null ? paymentType.getId_paymenteType() : null;
        }
        return null;
    }


    public String getRole(String username) {
        User user = repo.findByUsername(username);
        if (user != null && user.getRoles() != null && !user.getRoles().isEmpty()) {
            return user.getRoles().iterator().next().getRol();
        }
        return null;
    }


}