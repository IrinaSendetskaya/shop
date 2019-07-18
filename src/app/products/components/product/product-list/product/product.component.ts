import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/products/models/product';
import { ProductListComponent } from '../product-list.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends ProductListComponent implements OnInit {
  @Input() productName: string;
  @Input() productPrice: number;
  @Output() buy:EventEmitter<string>=new EventEmitter<string>();

  public product:Product;

  ngOnInit() {
  }

  onBuy(): void {
    if(this.productName&&this.isAvailableBuy){
      this.buy.emit();
    }
  }
}
