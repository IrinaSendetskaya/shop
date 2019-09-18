import { Component, OnInit } from "@angular/core";
import { ProductsPromiseService } from "../../services";
import { ProductModel } from "../../models/product.model";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
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
    private productPromiseService: ProductsPromiseService
  ) { }

  ngOnInit() {
    this.product = new ProductModel();

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return params.get('productID')
            ? this.productPromiseService.getProduct(+params.get('productID'))
            // when Promise.resolve(null) => task = null => {...null} => {}
            : Promise.resolve(null);
        })
      )
      .subscribe(
        product => (this.product = { ...product }),
        err => console.log(err)
      );
  }

  onSaveProduct(): void {
    const product = { ...this.product };

    const method = product.id ? 'updateProduct' : 'createaProduct';
    this.productPromiseService[method](product)
      .then(() => this.onGoBack())
      .catch(err => console.log(err));

  }

  onGoBack(): void {
    this.router.navigate(["/home"]);
  }
}
