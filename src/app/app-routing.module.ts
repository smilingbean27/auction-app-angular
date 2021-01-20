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
import { SignUpComponent } from './base/sign-up/sign-up.component';
import { UserLoginGuard } from './_services/user-login.guard';

const routes: Routes = [
  // Admin side components 
  { path: 'admin', canActivate: [LoginGuard], 
  children: [
      { path: 'auction/add', component: AuctionFormComponent},
      { path: 'auction/list', component: ProductsListComponent},
      { path: 'auction/product/:id', component: ProductDetailComponent },
      { path: 'auction/product/:id/edit', component: EditProductComponent},
      { path: 'dashboard', component: DashboardComponent},
    ] 
  },
  { path: '', canActivate: [UserLoginGuard],
    children: [
      { path: 'dashboard', component: UserDashboardComponent,},
    ]
  },
  { path: 'admin/sign-in', component: AdminComponent},
  { path:'sign-up', component: SignUpComponent},
  { path: 'sign-in', component: AdminComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
