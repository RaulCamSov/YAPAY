package com.upc.tp_yapay.Services;


import com.upc.tp_yapay.Entities.User;

import java.util.List;


public interface IUserService {
	public Integer insert(User user);
	public User insertUser(User user);
	public Integer buscarUser(String username);
	List<User> list();
	public Integer insertUserRol(Long user_id, Long rol_id);
	public Integer insertUserRol2(Long user_id, Long rol_id);
	void assignCustomerToUser(Long userId, Long customerId); // Nuevo método para asignar un Customer
	void assignEmployerToUser(Long userId, Long employerId); // Nuevo método para asignar un Employer

	User findById(Long id); // Añadir este método
}
