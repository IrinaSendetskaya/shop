import { Component, OnInit} from "@angular/core";
import { Product } from "src/app/products/models/product";
import { ProductService } from "src/app/products/services/product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productSelected: Product;
  isAvailableBuy: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    console.log("OnInit");
    this.productService
      .getAllProducts()
      .subscribe(products => (this.products = products));
      console.log(this.products);
  }

  onBuy(message:string): void {
    if (this.productSelected.isAvailable) {
      console.log("Buy"+message);
    } else {
      this.isAvailableBuy = false;
    }
  }
}
