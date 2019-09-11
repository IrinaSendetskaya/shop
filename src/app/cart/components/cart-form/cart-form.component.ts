import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/products/models/product";
import { Observable } from "rxjs";
import { CartService } from "../../services";
import { ActivatedRoute, Router, UrlTree } from "@angular/router";
import { DialogService } from 'src/app/core';
import { pluck } from 'rxjs/operators';

@Component({
  selector: "app-cart-form",
  templateUrl: "./cart-form.component.html",
  styleUrls: ["./cart-form.component.scss"]
})
export class CartFormComponent implements OnInit {
  product: Product;
  originalProduct: Product;


  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    // const id = +this.route.snapshot.paramMap.get("productID");
    // this.sub = this.cartService.getProductById(id).subscribe(
    //   product => {
    //     this.product = { ...product };
    //     this.originalProduct = { ...product };
    //   },
    //   err => console.log(err)
    // );
    this.route.data.pipe(pluck('product')).subscribe((product: Product) => {
      this.product = { ...product };
      this.originalProduct = { ...product };
    });

  }

  onSaveProduct() {
    const product = { ...this.product };

    if (product.id) {
      this.cartService.updateProduct(product);
      this.router.navigate(['/carts', { editedProductID: product.id }]);
    } else {
      this.cartService.addProduct(product);
      this.onGoBack();
    }
    this.originalProduct = { ...this.product };
  }

  onGoBack() {
    this.router.navigate(["./../../"], { relativeTo: this.route });
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const flags = Object.keys(this.originalProduct).map(key => {
      if (this.originalProduct[key] === this.product[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }

    return this.dialogService.confirm('Discard changes?');
  }

}
