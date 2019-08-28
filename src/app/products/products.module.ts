import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import {
  ProductComponent,
  ProductListComponent,
  ProductFormComponent
} from "./components";

import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsServicesModule } from "./products-services.module";

@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    ProductsServicesModule
  ],
  exports: [ProductComponent, ProductListComponent]
})
export class ProductsModule {}
