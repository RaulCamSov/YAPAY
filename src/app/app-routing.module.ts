import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { ProductRegistroComponent } from './component/product/product-registro/product-registro.component';
import { ProductListarComponent } from './component/product/product-listar/product-listar.component';
import { ClienteProductListComponent } from './component/product/cliente-product-list/cliente-product-list.component';
import { ProductDetailsComponent } from './component/product/product-details/product-details.component';
import { CustomerListarComponent } from './component/customer/customer-listar/customer-listar.component';
import { CustomerRegistroComponent } from './component/customer/customer-registro/customer-registro.component';
import { MicroemployerListarComponent } from './component/microemployer/microemployer-listar/microemployer-listar.component';
import { MicroemployerRegistroComponent } from './component/microemployer/microemployer-registro/microemployer-registro.component';
import { OrderDetailsComponent } from './component/order/order-details/order-details.component';
import { OrderComponent } from './component/order/order.component';
import { OrderListComponent } from './component/order/order-list/order-list.component';
import { AuthGuardGuard } from './security/auth-guard.guard';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { PaymentTypeComponent } from './component/payment-type/payment-type.component';

//RUTAS que usara el front para los servicios del backend
const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'payment-type', component: PaymentTypeComponent, canActivate: [AuthGuardGuard] },


  {
  path: 'product', component: ProductComponent, canActivate: [AuthGuardGuard] , children: [
    {
      path: 'nuevo', component: ProductRegistroComponent 
    },
    {
      path: 'listado', component: ProductListarComponent
    },
    {
      path: 'cliente-listado', component: ClienteProductListComponent //mostrar la lista de productos para los clientes
    },
    {
      path: 'details/:id', component: ProductDetailsComponent
    },
    {
      path: 'edicion/:id', component: ProductRegistroComponent
    },
  ]
},
{
  path: 'customer', canActivate: [AuthGuardGuard], children: [
    {
      path: 'list', component: CustomerListarComponent
    },
    {
      path: 'nuevo', component: CustomerRegistroComponent
    },
    {
      path: 'edicion/:id', component: CustomerRegistroComponent
    }
  ]
},
{
  path: 'microemployer', canActivate: [AuthGuardGuard], children: [
    {
      path: 'list', component: MicroemployerListarComponent
    },
    {
      path: 'new', component: MicroemployerRegistroComponent
    },
    {
      path: 'edit/:id', component: MicroemployerRegistroComponent
    }
  ]
},
{ 
  path: 'order', component: OrderComponent, canActivate: [AuthGuardGuard], children: [
    { path: 'list', component: OrderListComponent },
    { path: 'details/:id', component: OrderDetailsComponent }
  ]
},

{ path: '', redirectTo: '/login', pathMatch: 'full' },

{
  path: '**', redirectTo: '/login' //redirige cualquier ruta no reconocida a /login
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
