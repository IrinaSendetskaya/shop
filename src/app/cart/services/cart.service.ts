import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Product } from "src/app/products/models/product";
import { map, catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CartService {
  productUrl = "../../assets/mock-data/productsBuyed.json";

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProductById(id: number | string): Observable<Product> {
    return this.getAllProducts().pipe(
      map((products: Product[]) =>
        products.find(product => product.id === +id)
      ),
      catchError(err => throwError("Error in getProduct method"))
    );
  }

  addProduct(product: Product): void {
    this.getAllProducts().pipe(map(products => products.push(product)));
  }

  updateProduct(product: Product): void {
    let i: number;
    this.getAllProducts().pipe(
      map((products: Product[]) =>
        products.findIndex(p => p.id === product.id)
      ),
      tap(index => (i = index))
    );

    if (i > -1) {
      this.getAllProducts().pipe(
        map((products: Product[]) => products.splice(i, 1, product))
      );
    }
  }
}
