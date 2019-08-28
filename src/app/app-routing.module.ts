import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  AboutComponent,
  PathNotFoundComponent,
  MessagesComponent
} from "./layout";

const routes: Routes = [
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "cart",
    loadChildren: () => import("./cart/cart.module").then(m => m.CartModule),
    data: {
      preload: true,
      title: "Cart"
    }
  },
  {
    path: "messages",
    component: MessagesComponent,
    outlet: "messages"
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "**",
    component: PathNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
