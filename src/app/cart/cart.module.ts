import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CartRoutingModule } from "./cart-routing.module";

import { CartItemComponent } from "./components";
import { CartServicesModule } from "./cart-services.module";

@NgModule({
  declarations: [CartRoutingModule.components, CartItemComponent],
  imports: [CommonModule, FormsModule, CartRoutingModule, CartServicesModule]
})
export class CartModule {}
