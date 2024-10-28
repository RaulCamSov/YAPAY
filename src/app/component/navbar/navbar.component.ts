import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  role: string | null = null;
  paymentTypeId: number | null = null;


  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.loginService.role$.subscribe(role => {
      this.role = role;
    });

    this.loginService.paymentTypeId$.subscribe(paymentTypeId => {
      this.paymentTypeId = paymentTypeId;
    });
  }


  close() {
    this.loginService.closeSession();
    this.role = null; // Reset role when logging out
    this.paymentTypeId = null; // Reset paymentTypeId when logging out
    this.router.navigate(['/login']);
  }
}