import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Customer } from '../../model/customer';
import { MicroEmployer } from '../../model/micro-employer';
import { User } from '../../model/user';
import { LoginService } from '../../service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      // Customer fields
      name_customer: [''],
      email_customer: [''],
      birthdate_customer: [''],
      phone_customer: [''],
      address_customer: [''],
      // Employer fields
      first_name: [''],
      phone_number: [''],
      email_micro_employer: [''],
      name_microEnterprise: [''],
      address_microEnterprise: ['']
    });
  }

  ngOnInit(): void {}

  get f() { return this.registerForm.controls; }

  isCustomer(): boolean {
    return this.registerForm.get('role')?.value === 'CUSTOMER';
  }

  isEmployer(): boolean {
    return this.registerForm.get('role')?.value === 'EMPLOYER';
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    
    const user: User = {
      user_id: 0,
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      enabled: true,
      roles: [],
      customer: undefined,
      employer: undefined
    };

    this.authService.registerUser(user).subscribe((userId: number) => {
      console.log('User ID:', userId);  // Mostrar el ID del usuario
      const roleId = this.registerForm.get('role')?.value === 'CUSTOMER' ? 3 : 2;
      this.authService.assignRoleToUser(userId, roleId).subscribe(() => {
        if (this.isCustomer()) {
          const customer: Customer = {
            id_customer: 0,
            name_customer: this.registerForm.get('name_customer')?.value,
            email_customer: this.registerForm.get('email_customer')?.value,
            birthdate_customer: this.registerForm.get('birthdate_customer')?.value,
            phone_customer: this.registerForm.get('phone_customer')?.value,
            address_customer: this.registerForm.get('address_customer')?.value,
            userId: userId // Aquí se asigna el userId en lugar de un objeto User
          };
          console.log('Customer to be registered:', customer);  // Mostrar el objeto Customer antes de registrarlo
          this.authService.registerCustomer(customer).subscribe((newCustomer) => {
            console.log('Customer ID:', newCustomer.id_customer);  // Mostrar el ID del Customer registrado
            this.router.navigate(['/payment-type']);
          });
        } else if (this.isEmployer()) {
          const employer: MicroEmployer = {
            id_micro_employer: 0,
            first_name: this.registerForm.get('first_name')?.value,
            phone_number: this.registerForm.get('phone_number')?.value,
            email_micro_employer: this.registerForm.get('email_micro_employer')?.value,
            name_microEnterprise: this.registerForm.get('name_microEnterprise')?.value,
            address_microEnterprise: this.registerForm.get('address_microEnterprise')?.value,
            userId: userId // Aquí se asigna el userId en lugar de un objeto User
          };
          console.log('Employer to be registered:', employer);  // Mostrar el objeto Employer antes de registrarlo
          this.authService.registerEmployer(employer).subscribe((newEmployer) => {
            console.log('Employer ID:', newEmployer.id_micro_employer);  // Mostrar el ID del Employer registrado
            this.router.navigate(['/login']);
          });
        }
      });
    });
  }
}
