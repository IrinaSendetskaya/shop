import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services";
import { ProductModel } from "../../models/product.model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"]
})
export class ProductFormComponent implements OnInit {
  product: ProductModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.product = new ProductModel();

    this.route.paramMap
      .pipe(
        switchMap((params: Params) =>
          this.productsService.getProductById(+params.get("productID"))
        )
      )
      .subscribe(
        product => (this.product = { ...product }),
        err => console.log(err)
      );
  }

  onSaveProduct(): void {
    const product = { ...this.product };

    if (product.id) {
      this.productsService.updateProduct(product);
    } else {
      this.productsService.createProduct(product);
    }
    this.onGoBack();
  }

  onGoBack(): void {
    this.router.navigate(["/home"]);
  }
}
