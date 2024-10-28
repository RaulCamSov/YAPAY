import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../../../model/customer';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerService } from '../../../service/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-listar',
  templateUrl: './customer-listar.component.html',
  styleUrl: './customer-listar.component.css'
})
export class CustomerListarComponent implements OnInit {
  lista: Customer[]=[];
  displayedColumns: string[] = ["id_customer", "name_customer", "email_customer", "birthdate_customer", "phone_customer", "address_customer", "actions"];
  dataSource = new MatTableDataSource<Customer>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private customerService: CustomerService, 
    private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.customerService.list().subscribe(data => {
      this.dataSource.data = data;
    });

    this.customerService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  deleteCustomer(id: number) {
    this.customerService.delete(id).subscribe(() => {
      this.snackBar.open('Cliente eliminado exitosamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });
      this.customerService.list().subscribe(data => {
        this.customerService.setList(data);
      });
    });
  }

  editCustomer(id: number) {
    this.router.navigate(['/customer/edit', id]);
  }

  listar(){
    this.customerService.list().subscribe(data => {
        this.customerService.setList(data);
    });
 }
}