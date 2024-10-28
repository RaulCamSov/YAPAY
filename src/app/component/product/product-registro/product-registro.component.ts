import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-product-registro',
  templateUrl: './product-registro.component.html',
  styleUrl: './product-registro.component.css'
})
export class ProductRegistroComponent implements OnInit{
  form: FormGroup=new FormGroup({}); //modelo de la estructura de la entidad product para el html
  product: Product = new Product();
  id: number=0;
  edicion: boolean = false; //no es edicion
  selectedFile: File ;  // Declara la propiedad aquí, fuera del constructor
  mensaje: string = '';


  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route:ActivatedRoute
  ) { 
  }

  ngOnInit(): void {
    console.log("recuperando id")
    this.route.params.subscribe((data: Params) => {
      this.product.id_product=data['id'];//capturando el id del listado
      console.log(this.product.id_product)
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.fb.group({ // Se asignan a los atributos de la entidad product las validaciones
      id_product: new FormControl(),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      description_product: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      price_product: new FormControl('', [Validators.required]),
      productBrand: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
      quantity_product: new FormControl('', [Validators.required, Validators.min(1)]),
    });
  }
  
  init() {
    if (this.edicion) {
      this.productService.getProductById(this.product.id_product).subscribe((data) => {
        this.form.patchValue({
          id_product: data.id_product,
          name: data.name,
          description_product: data.description_product,
          price_product: data.price_product,
          productBrand: data.productBrand,
          size: data.size,
          quantity_product: data.quantity_product,
        });
      });
    }
  }
  
  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.selectedFile = element.files[0]; // Correctamente tomando el archivo seleccionado
    }
  }
  
  onSubmit(): void { 
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('product', JSON.stringify(this.form.value));

    if (this.form.valid) {
      if (this.edicion) {
        this.productService.update(formData, this.product.id_product).subscribe({
          next: () => {
            this.snackBar.open('Producto actualizado exitosamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          },
          error: (error) => {
            console.error('Error al actualizar el producto:', error);
            this.snackBar.open('Error al actualizar el producto', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
          }
        });
      } else {
        this.productService.insert(formData).subscribe({
          next: () => {
            this.snackBar.open('Producto registrado exitosamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          },
          error: (error) => {
            console.error('Error al registrar el producto:', error);
            this.snackBar.open('Error al registrar el producto', 'Cerrar', {
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
