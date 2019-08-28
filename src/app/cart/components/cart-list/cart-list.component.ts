import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/products/models/product";
import { CartService } from "../../services/cart.service";
import { ReplaySubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart-list.component.html",
  styleUrls: ["./cart-list.component.scss"]
})
export class CartListComponent implements OnInit {
  public products: Product[] = [];
  public isEmptyCart: boolean;

  private destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(
    1
  );

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cartService
      .getAllProducts()
      .pipe(takeUntil(this.destroyedSource))
      .subscribe(products => {
        this.products = products;
        this.isEmptyCart = products.length > 0 ? true : false;
      });
  }

  onBuy(message: string): void {
    console.log(message);
  }

  onEdit(product: Product): void {
    const link = ["/cart/edit", product.id];
    this.router.navigate(link);
    // or
    // const link = ['edit', product.id];
    // this.router.navigate(link, {relativeTo: this.route});
  }
}
