import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'ProductDetail';
  product: Product;
  errorMessage: string;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _productService: ProductService) { }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this._productService.getProducts()
      .subscribe(
        products => this.product = this.getProductById(id, products),
        error => this.errorMessage = <any>error
      );
  }

  onBack(): void {
    this._router.navigate(['/products']);
  }

  getProductById(id: number, products: Product[]): Product {
   return products.find(product => product.productId === id);
  }
}
