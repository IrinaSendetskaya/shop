import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";
import { Product } from "src/app/products/models/product";

@Component({
  selector: "app-cart-item",
  templateUrl: "./cart-item.component.html",
  styleUrls: ["./cart-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent implements OnInit {
  @Input() product: Product;

  @Output() buyCart: EventEmitter<any> = new EventEmitter<any>();
  @Output() editCart: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  public onBuy() {
      this.buyCart.emit("Buyed " + this.product.name);
  }

  public onEdit() {
      this.editCart.emit(this.product);
    
  }
}
