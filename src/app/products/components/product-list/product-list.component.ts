import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ProductsService } from "src/app/products/services/products.service";
import { ProductModel } from "src/app/products/models/product.model";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  public products: Promise<ProductModel[]>;
  public isAvailableBuy: boolean = true;

  constructor(
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.products = this.productService.getAllProducts();
  }

  onBuy(product: ProductModel): void {
    const updateProduct = { ...product, isAvailable: false };
    this.productService.updateProduct(updateProduct);
    //this.isAvailableBuy = false;
  }
  onEditProduct(product: ProductModel): void {
    const link = ["edit", product.id];
    this.router.navigate(link);
  }
}
