import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MicroEmployer } from '../../../model/micro-employer';
import { MicroemployerService } from '../../../service/microemployer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-microemployer-registro',
  templateUrl: './microemployer-registro.component.html',
  styleUrl: './microemployer-registro.component.css'
})
export class MicroemployerRegistroComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  microemployer: MicroEmployer = new MicroEmployer();
  id: number = 0;
  edicion: boolean = false;
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private microemployerService: MicroemployerService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log("recuperando id");
    this.route.params.subscribe((data: Params) => {
      this.microemployer.id_micro_employer = data['id'];
      console.log(this.microemployer.id_micro_employer);
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.fb.group({
      id_micro_employer: new FormControl(),
      first_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      phone_number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      email_micro_employer: new FormControl('', [Validators.required, Validators.email]),
      name_microEnterprise: new FormControl('', [Validators.required]),
      address_microEnterprise: new FormControl('', [Validators.required])
    });
  }

  init() {
    if (this.edicion) {
      this.microemployerService.getMicroEmployerById(this.microemployer.id_micro_employer).subscribe((data) => {
        this.form.patchValue({
          id_micro_employer: data.id_micro_employer,
          first_name: data.first_name,
          phone_number: data.phone_number,
          email_micro_employer: data.email_micro_employer,
          name_microEnterprise: data.name_microEnterprise,
          address_microEnterprise: data.address_microEnterprise,
        });
      });
    }
  }

  onSubmit(): void {
    const microemployerData = { ...this.form.value, id_micro_employer: this.microemployer.id_micro_employer };

    if (this.form.valid) {
      if (this.edicion) {
        this.microemployerService.update(microemployerData).subscribe({
          next: () => {
            this.snackBar.open('Microemployer actualizado exitosamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
            //this.router.navigate(['/microemployer/list']);
          },
          error: (error) => {
            console.error('Error al actualizar el microemployer:', error);
            this.snackBar.open('Error al actualizar el microemployer', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
          }
        });
      } else {
        this.microemployerService.insert(microemployerData).subscribe({
          next: () => {
            this.snackBar.open('Microemployer registrado exitosamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
            //this.router.navigate(['/microemployer/list']);
          },
          error: (error) => {
            console.error('Error al registrar el microemployer:', error);
            this.snackBar.open('Error al registrar el microemployer', 'Cerrar', {
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
