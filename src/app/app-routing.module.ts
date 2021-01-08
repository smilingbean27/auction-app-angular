import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './base/admin/admin.component';
import { DashboardComponent } from './base/dashboard/dashboard.component';
import { LoginGuard} from './_services/login.guard';
import { ProductsListComponent } from './base/products-list/products-list.component';
import { ProductDetailComponent } from './base/product-detail/product-detail.component';
import { EditProductComponent } from './base/product-detail/edit-product/edit-product.component';
import { PageNotFoundComponent } from './base/page-not-found/page-not-found.component';
import { AuctionFormComponent } from './base/dashboard/auction-form/auction-form.component';
import { UserDashboardComponent } from './base/user-dashboard/user-dashboard.component';

const routes: Routes = [
  // Admin side components 

  { path: 'admin/sign-in', component: AdminComponent},
  { path: '', redirectTo: '/admin/sign-in', pathMatch: 'full'},
  // { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard]},
  { path: 'admin/auction/add', component: AuctionFormComponent},
  { path: 'admin/auction/list', component: ProductsListComponent},
  { path: 'admin/auction/product/:id', component: ProductDetailComponent},
  { path: 'admin/auction/product/:id/edit', component: EditProductComponent},
  { path: 'admin/dashboard', component: DashboardComponent},

  // User side Components 
  { path: 'sign-in', component: AdminComponent},
  { path: 'dashboard', component: UserDashboardComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
