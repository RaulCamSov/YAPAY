package com.upc.tp_yapay.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.upc.tp_yapay.Entities.Role;
import com.upc.tp_yapay.Repository.RoleRepository;
import com.upc.tp_yapay.Services.IRoleService;
// com.upc.tp_yapay.

import java.util.List;


@Service
public class RoleServiceImpl implements IRoleService {
	@Autowired
	private RoleRepository rR;

	@Transactional
	@Override
	public Role insert(Role role) {
		return rR.save(role);
	}

	@Override
	public List<Role> list() {
		// TODO Auto-generated method stub
		return rR.findAll();
	}
}
