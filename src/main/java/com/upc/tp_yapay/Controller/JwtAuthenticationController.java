package com.upc.tp_yapay.Controller;

import com.upc.tp_yapay.security.JwtRequest;
import com.upc.tp_yapay.security.JwtResponse;
import com.upc.tp_yapay.security.JwtTokenUtil;
import com.upc.tp_yapay.servicesimplements.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:4200", exposedHeaders = "Authorization")
public class JwtAuthenticationController {
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	@Autowired
	private JwtUserDetailsService userDetailsService;
	@PostMapping("/authenticate")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		final String token = jwtTokenUtil.generateToken(userDetails);
		Long customerId = userDetailsService.getCustomerId(authenticationRequest.getUsername());
		Long paymentTypeId = userDetailsService.getPaymentTypeId(authenticationRequest.getUsername());
		String role = userDetailsService.getRole(authenticationRequest.getUsername());


		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.set("Authorization", token);

		Map<String, Object> responseBody = new HashMap<>();
		responseBody.put("token", token);
		responseBody.put("customerId", customerId);
		responseBody.put("paymentTypeId", paymentTypeId);
		responseBody.put("role", role);

		return ResponseEntity.ok().headers(responseHeaders).body(responseBody);
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}