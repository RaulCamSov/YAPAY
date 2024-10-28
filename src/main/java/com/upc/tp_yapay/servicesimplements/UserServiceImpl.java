package com.upc.tp_yapay.servicesimplements;

import com.upc.tp_yapay.Entities.Customer;
import com.upc.tp_yapay.Entities.MicroEmployer;
import com.upc.tp_yapay.Entities.Role;
import com.upc.tp_yapay.Entities.User;
import com.upc.tp_yapay.Repository.CustomerRepository;
import com.upc.tp_yapay.Repository.MicroEmployerRepository;
import com.upc.tp_yapay.Repository.RoleRepository;
import com.upc.tp_yapay.Repository.UserRepository;
import com.upc.tp_yapay.Services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class UserServiceImpl implements IUserService {
	@Autowired
	private UserRepository uR;
	@Autowired
	private RoleRepository rR;
	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	private MicroEmployerRepository employerRepository;

	@Transactional
	@Override
	public Integer insert(User user) {
		int rpta = uR.buscarUsername(user.getUsername());
		if (rpta == 0) {
			uR.save(user);
		}
		return rpta;
	}
	public Integer buscarUser(String username){
		int rpta = uR.buscarUsername(username);
		return rpta;
	}
	@Transactional
	@Override
	public User insertUser(User user) {
		return uR.save(user); // Cambiado para devolver el usuario creado
	}

	@Override
	public List<User> list() {
		// TODO Auto-generated method stub
		return uR.findAll();
	}

	/**
	 * @param user_id De un usuario existente
	 * @param rol_id  De un usuario existente
	 * @return 1 exito
	 */
	@Override
	public Integer insertUserRol(Long user_id, Long rol_id) {
		Integer result = 0;
		uR.insertUserRol(user_id, rol_id);
		return 1;
	}

	@Transactional
	public Integer insertUserRol2(Long user_id, Long rol_id) {
		Integer result = 0;
		User user = uR.findById(user_id).get();
		Role role = rR.findById(rol_id).get();
		user.getRoles().add(role);
		uR.save(user);
		rR.save(role);
		return 1;
	}

	// Additional methods to handle Customer and Employer relationships
	@Override
	public void assignCustomerToUser(Long userId, Long customerId) {
		User user = uR.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
		Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new IllegalArgumentException("Customer not found"));
		user.setCustomer(customer);
		uR.save(user);
	}

	@Transactional
	public void assignEmployerToUser(Long userId, Long employerId) {
		User user = uR.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		MicroEmployer employer = employerRepository.findById(employerId).orElseThrow(() -> new RuntimeException("Employer not found"));
		user.setEmployer(employer);
		uR.save(user);
	}
	@Override
	public User findById(Long id) {
		return uR.findById(id).orElse(null);
	}


}
