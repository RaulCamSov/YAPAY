import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MicroEmployer } from '../../../model/micro-employer';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MicroemployerService } from '../../../service/microemployer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-microemployer-listar',
  templateUrl: './microemployer-listar.component.html',
  styleUrl: './microemployer-listar.component.css'
})
export class MicroemployerListarComponent implements OnInit {
  displayedColumns: string[] = ['id_micro_employer', 'first_name', 'phone_number', 'email_micro_employer', 'name_microEnterprise', 'address_microEnterprise', 'actions'];
  dataSource = new MatTableDataSource<MicroEmployer>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private microemployerService: MicroemployerService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.microemployerService.list().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  deleteMicroEmployer(id: number) {
    this.microemployerService.delete(id).subscribe(() => {
      this.snackBar.open('Microemployer eliminado exitosamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });
      this.microemployerService.list().subscribe(data => {
        this.dataSource.data = data;
      });
    });
  }

  editMicroEmployer(id: number) {
    this.router.navigate(['/microemployer/edit', id]);
  }
}
