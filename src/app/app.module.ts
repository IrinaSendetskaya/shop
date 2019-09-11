import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { Router } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { CartModule } from "./cart/cart.module";
import { ProductsModule } from "./products/products.module";
import { SharedModule } from "./shared/shared.module";
import { LayoutModule } from "./layout/layout.module";
import { AdminModule } from './admin/admin.module';
import { SpinnerModule } from './widgets/spinner/spinner.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CartModule,
    ProductsModule,
    SharedModule,
    LayoutModule,
    SpinnerModule.forRoot(),
    AdminModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    const replacer = (key: string, value: any): string =>
      typeof value === "function" ? value.name : value;
    console.log("Routes: ", JSON.stringify(router.config, replacer, 2));
  }
}
