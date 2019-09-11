import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  CartFormComponent,
  CartListComponent
} from "./components";
import { CartsComponent } from "./carts.component";
import { CanDeactivateGuard } from '../core';
import { ProductResolveGuard } from './guards';

const routes: Routes = [
  {
    path: "carts",
    component: CartsComponent,
    children: [
      {
        path: "add",
        component: CartFormComponent
      },
      {
        path: "edit/:productID",
        component: CartFormComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          product: ProductResolveGuard
        }

      },
      {
        path: "",
        component: CartListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {
  static components = [CartsComponent, CartFormComponent, CartListComponent];
}
