import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentTypeService } from '../../service/payment-type.service';
import { Router } from '@angular/router';
import { PaymentType } from '../../model/payment-type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrl: './payment-type.component.css'
})
export class PaymentTypeComponent implements OnInit {
  paymentTypeForm: FormGroup;
  customerId: number;


  constructor(
    private fb: FormBuilder,
    private paymentTypeService: PaymentTypeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private loginservice:LoginService
  ) {
    this.paymentTypeForm = this.fb.group({
      cardpayment: ['', Validators.required],
      dateexpiration: ['', Validators.required],
      titularcard: ['', Validators.required],
      CVVcard: ['', Validators.required]
    });

    // Assuming customerId is stored in localStorage after registration/login
    this.customerId = Number(localStorage.getItem('customerId'));
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.paymentTypeForm.valid) {
      const paymentType: PaymentType = {
        id_paymenteType: 0,
        cardpayment: this.paymentTypeForm.get('cardpayment')?.value,
        dateexpiration: this.paymentTypeForm.get('dateexpiration')?.value,
        titularcard: this.paymentTypeForm.get('titularcard')?.value,
        CVVcard: this.paymentTypeForm.get('CVVcard')?.value,
        customerId: this.customerId
      };

      console.log('Submitting PaymentType:', paymentType);

      this.paymentTypeService.registerPaymentType(paymentType).subscribe(() => {
        console.log('Payment Type registered:', paymentType);
        this.snackBar.open('Payment Type registered successfully', 'Close', {
          duration: 3000
        });
        this.loginservice.closeSession();
        this.router.navigate(['/login']); // Redirect after successful registration
      }, error => {
        console.error('Error registering Payment Type:', error);
        this.snackBar.open('Error registering Payment Type', 'Close', {
          duration: 3000
        });
      });
    }
  }
}

