import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent, ProductsComponent, OrdersComponent, AddComponent, EditComponent } from './components';
import { AuthGuard } from '../core';



const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'products', component: ProductsComponent },
          { path: 'orders', component: OrdersComponent },
          { path: 'product/add', component: AddComponent },
          { path: 'product/edit/:id', component: EditComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  static components = [
    AdminComponent,
    AdminDashboardComponent,
    ProductsComponent,
    OrdersComponent,
    AddComponent,
    EditComponent
  ];

}
