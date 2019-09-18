import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ProductsService } from "src/app/products/services/products.service";
import { ProductModel } from "src/app/products/models/product.model";
import { ProductsPromiseService } from '../../services';
import { Product } from '../../models/product';

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
    private productPromiseService: ProductsPromiseService
  ) { }

  ngOnInit() {
    this.products = this.productPromiseService.getProducts();
  }

  onBuy(product: ProductModel): void {
    // const updateProduct = { ...product, isAvailable: false };
    // this.productService.updateProduct(updateProduct);
    //this.isAvailableBuy = false;
    this.productPromiseService.updateProduct(product).catch(err => console.log(err));
  }
  onEditProduct(product: ProductModel): void {
    const link = ["edit", product.id];
    this.router.navigate(link);
  }
  onCreateProduct() {
    const link = ['/add'];
    this.router.navigate(link);
  }
  onDeleteProduct(product: Product) {
    this.productPromiseService
      .deleteProduct(product)
      .then(() => (this.products = this.productPromiseService.getProducts()))
      .catch(err => console.log(err));
  }

  private async updateProduct(product: Product) {
    const updatedProduct = await this.productPromiseService.updateProduct({
      ...product,
      isAvailable: true
    });
    const products: Product[] = await this.products;
    const index = products.findIndex(t => t.id === updatedProduct.id);
    products[index] = { ...updatedProduct };
  }
}
