import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Product } from "src/app/products/models/product";
import { ProductListComponent } from "../product-list.component";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent extends ProductListComponent implements OnInit {
  @Input() product: Product;
  @Output() clickBuy: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {}

  buy(): void {
    if (this.product && this.isAvailableBuy) {
      this.clickBuy.emit();
    }
  }
}

