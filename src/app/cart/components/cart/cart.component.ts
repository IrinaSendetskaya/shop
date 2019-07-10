import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/products/models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  isEmptyCart: boolean;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getAllProducts().subscribe(products => {
    this.products = products;
    this.isEmptyCart = products.length > 0 ? true : false;
    });
    
  }

}
