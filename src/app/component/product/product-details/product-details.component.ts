import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.productService.getProductById(productId).subscribe(data => {
      this.product = data;
    });
  }


}
