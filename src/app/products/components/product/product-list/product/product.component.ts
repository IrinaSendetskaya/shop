import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { Product } from "src/app/products/models/product";
import { ProductListComponent } from "../product-list.component";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent extends ProductListComponent implements OnInit, OnChanges {
  
  @Input() product: Product;
  @Input() isAvailableBuy: boolean = true;
  
  @Output() clickBuy: EventEmitter<string> = new EventEmitter<string>();

  private $product = new BehaviorSubject<Product>(undefined);

  ngOnInit() {
    this.isAvailableBuy=this.product.isAvailable;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product) {
      this.$product.next(this.product);
    }
  }

  buy(): void {
    if (this.product && this.isAvailableBuy) {
      this.clickBuy.emit('Buy');
    }
  }
}

