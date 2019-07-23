import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/products/models/product";
import { CartService } from "../../services/cart.service";
import { ReplaySubject } from "rxjs";
import { takeUntil } from "rxjs/operators";

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

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService
      .getAllProducts()
      .pipe(takeUntil(this.destroyedSource))
      .subscribe(products => {
        this.products = products;
        this.isEmptyCart = products.length > 0 ? true : false;
      });
  }

  onUpdate(message:string):void{
    console.log(message);
  }

  onDelete(message:string):void{
    console.log(message);
  }
}
