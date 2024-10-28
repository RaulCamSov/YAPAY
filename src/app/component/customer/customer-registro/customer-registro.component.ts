import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../service/customer.service';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from '../../../model/customer';

@Component({
  selector: 'app-customer-registro',
  templateUrl: './customer-registro.component.html',
  styleUrl: './customer-registro.component.css'
})
export class CustomerRegistroComponent implements OnInit {
  customer: Customer = new Customer();
  form: FormGroup=new FormGroup({}); //modelo de la estructura de la entidad product para el html
  id: number=0;
  isEditMode: boolean = false;
  mensaje: string="";

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log("recuperando id");
    this.route.params.subscribe((data: Params) => {
      this.customer.id_customer = data['id']; // Capturando el id del listado
      console.log(this.customer.id_customer);
      this.isEditMode = data['id'] != null;
      this.init();
    });
    this.form = this.fb.group({ // Se asignan a los atributos de la entidad customer las validaciones
      id_customer: new FormControl(),
      name_customer: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email_customer: new FormControl('', [Validators.required, Validators.email]),
      birthdate_customer: new FormControl('', [Validators.required]),
      phone_customer: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      address_customer: new FormControl('', [Validators.required])
    });
  }

  init() {
    if (this.isEditMode) {
      this.customerService.getCustomerById(this.customer.id_customer).subscribe((data) => {
        this.form.patchValue({
          id_customer: data.id_customer,
          name_customer: data.name_customer,
          email_customer: data.email_customer,
          birthdate_customer: data.birthdate_customer,
          phone_customer: data.phone_customer,
          address_customer: data.address_customer,
        });
      });
    }
  }

  onSubmit(): void {
    const customerData = { ...this.form.value, id_customer: this.customer.id_customer };

    if (this.form.valid) {
      if (this.isEditMode) {
        this.customerService.update(customerData).subscribe({
          next: () => {
            this.snackBar.open('Cliente actualizado exitosamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
            //this.router.navigate(['/customer/list']);
          },
          error: (error) => {
            console.error('Error al actualizar el cliente:', error);
            this.snackBar.open('Error al actualizar el cliente', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
          }
        });
      } else {
        this.customerService.insert(customerData).subscribe({
          next: () => {
            this.snackBar.open('Cliente registrado exitosamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
            //this.router.navigate(['/customer/list']);
          },
          error: (error) => {
            console.error('Error al registrar el cliente:', error);
            this.snackBar.open('Error al registrar el cliente', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
          }
        });
      }
    } else {
      this.mensaje = "Agregue campos omitidos";
      this.snackBar.open(this.mensaje, 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-warning']
      });
    }
  }
}
