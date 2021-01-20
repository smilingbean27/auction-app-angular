import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http'; 
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule} from '@angular/material/list';
import { MatCardModule} from '@angular/material/card';
import { MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatCheckboxModule} from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './base/admin/admin.component';
import { DashboardComponent } from './base/dashboard/dashboard.component';
import { BaseComponent } from './base/base.component';
import { LoginGuard } from './_services/login.guard';
import {  AdminDataService } from './_services/admin-data.service';
import { AuctionFormComponent } from './base/dashboard/auction-form/auction-form.component';
import { ProductDetailComponent } from './base/product-detail/product-detail.component';
import { ProductsListComponent } from './base/products-list/products-list.component';
import { ProductListItemComponent } from './base/products-list/product-list-item/product-list-item.component';
import { PageNotFoundComponent } from './base/page-not-found/page-not-found.component';
import { HeaderComponent } from './base/header/header.component';
import { TimerComponent } from './base/timer/timer.component';
import { EditProductComponent } from './base/product-detail/edit-product/edit-product.component';
import { UserDashboardComponent } from './base/user-dashboard/user-dashboard.component';
import { IpService } from './_services/ip.service';
import { SignUpComponent } from './base/sign-up/sign-up.component';
import { UserLoginGuard } from './_services/user-login.guard';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DashboardComponent,
    BaseComponent,
    AuctionFormComponent,
    ProductDetailComponent,
    ProductsListComponent,
    ProductListItemComponent,
    PageNotFoundComponent,
    HeaderComponent,
    TimerComponent,
    EditProductComponent,
    UserDashboardComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    HttpClientModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  providers: [AdminDataService, LoginGuard, IpService, UserLoginGuard ],
  bootstrap: [AppComponent],

})
export class AppModule { }
