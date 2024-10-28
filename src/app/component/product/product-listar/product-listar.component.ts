import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../model/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../../../service/product.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-listar',
  templateUrl: './product-listar.component.html',
  styleUrl: './product-listar.component.css'
})
export class ProductListarComponent implements OnInit {
  lista: Product[]=[];
  displayedColumns= ["id_product", "name", "description_product", "price_product", "productBrand", "size", "quantity_product", "imageUrl","accion01"];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService:ProductService,
    private router: Router, private dialog:MatDialog){
    }


  ngOnInit(): void {
    this.productService.list().subscribe(data => {
      let newData = this.logica(data);
      this.dataSource.data=newData;
    });
    this.productService.getList().subscribe(data => {
      let newData = this.logica(data);
      this.dataSource.data = newData;
   });
  }

  logica(data:any){
    for(var i = 0; i < data.length; i++)
    {
        if (data[i].name.includes('Juana')){
          data[i].cantidad = i*10;//call rule
        }
    }
    return data;
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  listar(){
     this.productService.list().subscribe(data => {
         this.productService.setList(data);
     });
  }


}
