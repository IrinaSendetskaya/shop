import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/products/models/product";
import { CartService } from "../../services/cart.service";
import { ReplaySubject } from "rxjs";
import { takeUntil, switchMap } from "rxjs/operators";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart-list.component.html",
  styleUrls: ["./cart-list.component.scss"]
})
export class CartListComponent implements OnInit {
  public products: Product[] = [];
  public isEmptyCart: boolean;
  private editedProduct:Product;

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

      this.route.paramMap.pipe(
        switchMap((params:ParamMap)=>
        this.cartService.getProductById(+params.get('editedProductID')))
      ).subscribe(
        (product:Product)=>{
          this.editedProduct={...product};
        },
        err=>console.log(err)
      )
  }

  isEdited(product:Product):boolean{
    if(this.editedProduct){
      return product.id===this.editedProduct.id;
    }
    return false;
  }

  onBuy(message: string): void {
    console.log(message);
  }

  onEdit(product: Product): void {
    const link = ["/carts/edit", product.id];
    this.router.navigate(link);
    // or
    // const link = ['edit', product.id];
    // this.router.navigate(link, {relativeTo: this.route});
  }
}
