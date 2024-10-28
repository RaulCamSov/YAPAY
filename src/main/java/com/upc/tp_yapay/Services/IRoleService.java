package com.upc.tp_yapay.Services;

import com.upc.tp_yapay.Entities.Role;

import java.util.List;


public interface IRoleService {
	public Role insert(Role role);

	List<Role> list();

}
