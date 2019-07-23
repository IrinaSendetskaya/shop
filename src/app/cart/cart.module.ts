import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './components/cart/cart-list.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';



@NgModule({
  declarations: [CartListComponent, CartItemComponent],
  imports: [
    CommonModule
  ],
exports:[CartListComponent]
})
export class CartModule { }
