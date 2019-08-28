import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/products/models/product";
import { Subscription } from "rxjs";
import { CartService } from "../../services";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-cart-form",
  templateUrl: "./cart-form.component.html",
  styleUrls: ["./cart-form.component.scss"]
})
export class CartFormComponent implements OnInit {
  product: Product;
  originalProduct: Product;

  private sub: Subscription;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("productID");
    this.sub = this.cartService.getProductById(id).subscribe(
      product => {
        this.product = { ...product };
        this.originalProduct = { ...product };
      },
      err => console.log(err)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSaveProduct() {
    const product = { ...this.product };

    if (product.id) {
      this.cartService.updateProduct(product);
    } else {
      this.cartService.addProduct(product);
    }
    this.originalProduct = { ...this.product };
    this.onGoBack();
  }

  onGoBack() {
    this.router.navigate(["./../../"], { relativeTo: this.route });
  }
}
