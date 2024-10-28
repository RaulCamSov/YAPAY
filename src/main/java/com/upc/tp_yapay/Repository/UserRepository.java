package com.upc.tp_yapay.Repository;

import com.upc.tp_yapay.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	public User findByUsername(String username);

	//BUSCAR POR NOMBRE
	@Query("select count(u.username) from User u where u.username =:username")
	public int buscarUsername(@Param("username") String nombre);
	
	@Transactional
	@Modifying
		@Query(value = "INSERT INTO users_roles (user_id, role_id ) VALUES (:user_id, :rol_id)", nativeQuery = true)
	public Integer insertUserRol(@Param("user_id") Long user_id, @Param("rol_id") Long rol_id);

}