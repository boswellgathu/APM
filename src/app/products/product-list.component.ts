import { Component, OnInit } from '@angular/core';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements  OnInit {
  pageTitle = 'Product List';
  showImage = false;
  imageWidth = 50;
  imageMargin = 2;
  products: Product[];
  filteredProducts: Product[];
  private _productsFilter: string;
  errorMessage: string;

  constructor(private _productService: ProductService) {
    this._productsFilter = '';
  }

  get productsFilter(): string {
    return this._productsFilter;
  }

  set productsFilter(value: string) {
    this._productsFilter = value;
    this.filteredProducts = this.productsFilter ? this.filterProducts(this.productsFilter) : this.products;
  }

  filterProducts(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleShowImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this._productService.getProducts()
      .subscribe(
        products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error => {
          this.errorMessage = <any>error;
          console.log('hello ' + this.errorMessage);
        }
      );
  }

  onRatingClicked(message: string): void {
    this.pageTitle = `Product List:  ${message}`;
  }
}

