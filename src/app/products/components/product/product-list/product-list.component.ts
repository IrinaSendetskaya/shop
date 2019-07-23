import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/products/models/product";
import { ProductService } from "src/app/products/services/product.service";
import { ReplaySubject } from "rxjs";
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];
  public isAvailableBuy: boolean = true;

  private destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(
    1
  );

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService
      .getAllProducts().pipe(
        // destroyedSource - не выполняет же метод next()
        // отписка не происходит?
        takeUntil(this.destroyedSource)
      )
      .subscribe(products => (this.products = products));
  }

  onBuy(message: string): void {
    console.log(message);

    this.isAvailableBuy = false;
  }
}
