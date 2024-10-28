package com.upc.tp_yapay.Repository;

import com.upc.tp_yapay.Entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByrol(String rol);

}