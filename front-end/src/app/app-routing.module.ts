import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TiendaComponent } from './tienda/tienda.component';
import { LoginComponent } from './login/login.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { DetallesProfileComponent } from './detalles-profile/detalles-profile.component';
import { ProductComponent } from './product/product.component';
const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'store', component: TiendaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'userProfile', component: PerfilUsuarioComponent },
  { path: 'detallesProfile', component: DetallesProfileComponent },
  { path: 'product', component: ProductComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
