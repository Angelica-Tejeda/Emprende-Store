import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TiendaComponent } from './tienda/tienda.component';
import { LoginComponent } from './login/login.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { DetallesProfileComponent } from './detalles-profile/detalles-profile.component';
import { ProductComponent } from './product/product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { BusquedaProductComponent } from './busqueda-product/busqueda-product.component';
const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'store', component: TiendaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'userProfile/:id', component: PerfilUsuarioComponent },
  { path: 'detallesProfile', component: DetallesProfileComponent },
  { path: 'product', component: ProductComponent },
  { path: 'create-product', component: CreateProductComponent },
  {path: 'search', component: BusquedaProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
