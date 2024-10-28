import { Component, OnInit } from '@angular/core';
import { Credentials } from '../../model/credentials';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  hide = true; // Control para mostrar/ocultar el password

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    // Redirigir al home si ya está logueado
    if (this.loginService.getToken()) 
      { this.router.navigate(['/product/cliente-listado']);}
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Getter para el acceso fácil a los controles del formulario
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Detener si el formulario es inválido
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const creds: Credentials = { 
      username: this.f['username'].value, 
      password: this.f['password'].value 
    };
    this.loginService.login(creds).subscribe(
      data => {
        const role = this.loginService.getRole();
        const paymentTypeId = this.loginService.getPaymentTypeId();
        if (role === 'CUSTOMER') {
          if (paymentTypeId) {
            this.router.navigate(['/product/cliente-listado']);
          } else {
            this.router.navigate(['/payment-type']);
          }
        } else {
          this.router.navigate(['/product/listado']);
        }
      },
      error => {
        this.error = 'Username or password is incorrect';
        this.loading = false;
      }
    );
  }
}
