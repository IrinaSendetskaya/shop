import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/products/models/product';
import { ProductService } from 'src/app/products/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => this.products = products);
  }

  onBuy():void{
    console.log('Buy');
  }

}
