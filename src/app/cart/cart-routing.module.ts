import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  CartFormComponent,
  CartListComponent,
  CartItemComponent
} from "./components";
import { CartsComponent } from "./carts.component";

const routes: Routes = [
  {
    path: "",
    component: CartsComponent,
    children: [
      {
        path: "add",
        component: CartFormComponent
      },
      {
        path: "edit/:productID",
        component: CartFormComponent
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
