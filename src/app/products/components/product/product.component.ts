import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { Product } from "src/app/products/models/product";
import { ProductListComponent } from "../product-list/product-list.component";
import { BehaviorSubject } from "rxjs";
import { ProductModel } from "src/app/products/models/product.model";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent extends ProductListComponent
  implements OnInit, OnChanges {
  @Input() product: Product;
  @Input() isAvailableBuy: boolean = true;

  @Output() clickBuy: EventEmitter<ProductModel> = new EventEmitter<
    ProductModel
  >();
  @Output() editProduct: EventEmitter<ProductModel> = new EventEmitter<
    ProductModel
  >();

  private $product = new BehaviorSubject<Product>(undefined);

  ngOnInit() {
    this.isAvailableBuy = this.product.isAvailable;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product) {
      this.$product.next(this.product);
    }
  }

  onBuy(): void {
    this.clickBuy.emit(this.product);
  }
  onEdit(): void {
    this.editProduct.emit(this.product);
  }
}
