import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Product } from './product';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class ProductService {
private _productUrl = './api/products/products.json';
  constructor(private _http: HttpClient) { }
  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this._productUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
