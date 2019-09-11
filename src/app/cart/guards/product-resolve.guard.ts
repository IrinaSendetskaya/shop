import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { map, catchError, take, delay, finalize } from 'rxjs/operators';

import { Product } from 'src/app/products/models/product';
import { CartServicesModule } from '../cart-services.module';
import { CartService } from '../services';
import { SpinnerService } from 'src/app/widgets';


@Injectable({
  providedIn: CartServicesModule
})
export class ProductResolveGuard implements Resolve<Product> {
  constructor(
    private cartService: CartService,
    private spinner: SpinnerService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product | null> {
    console.log('ProductResolve Guard is called');

    if (!route.paramMap.has('productID')) {
      return of();
    }
    this.spinner.show();
    const id = +route.paramMap.get('productID');

    return this.cartService.getProductById(id).pipe(
      delay(2000),
      map((product: Product) => {
        if (product) {
          return product;
        } else {
          this.router.navigate(['/carts']);
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['carts']);
        return of(null);
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
