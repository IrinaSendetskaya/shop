import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";
import { Product } from "src/app/products/models/product";
import { ProductListComponent } from "../product-list.component";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent extends ProductListComponent implements OnInit, OnChanges {
  
  @Input() product: Product;
  @Input() isAvailableBuy: boolean = true;
  
  @Output() clickBuy: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.isAvailableBuy=this.product.isAvailable;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const name: SimpleChange = changes.name;
    //console.log('prev value: ', name.previousValue);
    console.log('got name: ', name.currentValue);
    //this._name = name.currentValue.toUpperCase();
  }

  buy(): void {
    if (this.product && this.isAvailableBuy) {
      this.clickBuy.emit();
    }
  }
}

