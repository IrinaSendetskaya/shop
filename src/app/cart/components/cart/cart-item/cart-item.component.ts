import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/products/models/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() product: Product;

  @Output() updateCart:EventEmitter<any>=new EventEmitter<any>();
  @Output() deleteCart:EventEmitter<any>=new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    
  }

  public update(){
    if (this.product && this.product.isAvailable) {
      this.updateCart.emit('Update');
    }
  }

  public delete(){
    if (this.product && this.product.isAvailable) {
      this.deleteCart.emit('Delete');
    }
  }

}
