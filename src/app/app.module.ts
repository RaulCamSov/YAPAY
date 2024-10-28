import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProductComponent } from './component/product/product.component';
import { ProductListarComponent } from './component/product/product-listar/product-listar.component';
import { ProductRegistroComponent } from './component/product/product-registro/product-registro.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ClienteProductListComponent } from './component/product/cliente-product-list/cliente-product-list.component';
import { ProductDetailsComponent } from './component/product/product-details/product-details.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { CustomerComponent } from './component/customer/customer.component';
import { CustomerListarComponent } from './component/customer/customer-listar/customer-listar.component';
import { CustomerRegistroComponent } from './component/customer/customer-registro/customer-registro.component';
import { MicroemployerComponent } from './component/microemployer/microemployer.component';
import { MicroemployerListarComponent } from './component/microemployer/microemployer-listar/microemployer-listar.component';
import { MicroemployerRegistroComponent } from './component/microemployer/microemployer-registro/microemployer-registro.component';
import { OrderComponent } from './component/order/order.component';
import { OrderListComponent } from './component/order/order-list/order-list.component';
import { OrderDetailsComponent } from './component/order/order-details/order-details.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { TokenInterceptor } from './service/token.interceptor';
import { LoginService } from './service/login.service';
import { PaymentTypeComponent } from './component/payment-type/payment-type.component';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListarComponent,
    ProductRegistroComponent,
    NavbarComponent,
    ClienteProductListComponent,
    ProductDetailsComponent,
    CustomerComponent,
    CustomerListarComponent,
    CustomerRegistroComponent,
    MicroemployerComponent,
    MicroemployerListarComponent,
    MicroemployerRegistroComponent,
    OrderComponent,
    OrderListComponent,
    OrderDetailsComponent,
    RegisterComponent,
    LoginComponent,
    PaymentTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatGridListModule,
    MatMenuModule,
    HttpClientModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconButton,
    MatIconModule,
    FormsModule    
  ],
  providers: [    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
