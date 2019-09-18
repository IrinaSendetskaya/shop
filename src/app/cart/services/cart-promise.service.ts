import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartServicesModule } from '../cart-services.module';
import { Product } from 'src/app/products/models/product';

@Injectable({
  providedIn: CartServicesModule
})
export class CartPromiseService {
  private cartsUrl = 'http://localhost:3000/carts';

  constructor(private http: HttpClient) {}

  getCarts(): Promise<Product[]> {
    return this.http
      .get(this.cartsUrl)
      .toPromise()
      .then(response => response as Product[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
