package com.upc.tp_yapay.Controller;


import com.upc.tp_yapay.Entities.User;
import com.upc.tp_yapay.Services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@Controller
@RequestMapping("/users")
public class UserController {
	@Autowired
	private PasswordEncoder bcrypt;
	@Autowired
	private IUserService uService;

	@PostMapping("/save")
	public ResponseEntity<Long> saveUser(@RequestBody User user) {
		if (uService.buscarUser(user.getUsername()) == 0) {
			String bcryptPassword = bcrypt.encode(user.getPassword());
			user.setPassword(bcryptPassword);
			User savedUser = uService.insertUser(user);
			return new ResponseEntity<>(savedUser.getUser_id(), HttpStatus.CREATED);
		}
		return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	}


	@PostMapping("/save/{user_id}/{rol_id}")
	public ResponseEntity<Integer> saveUseRol(@PathVariable("user_id") Long user_id,
											  @PathVariable("rol_id") Long rol_id){
		return new ResponseEntity<Integer>(uService.insertUserRol(user_id, rol_id),HttpStatus.OK);
	}

	@GetMapping("/list")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<List<User>> getUsers(){
		return new ResponseEntity<>(uService.list(),HttpStatus.OK);
	}


}

