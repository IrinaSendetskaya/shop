import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/products/models/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() product: Product;

  constructor() { }

  ngOnInit() {
    
  }

}
