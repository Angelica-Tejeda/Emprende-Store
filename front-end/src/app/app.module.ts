import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TiendaComponent } from './tienda/tienda.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { DetallesProfileComponent } from './detalles-profile/detalles-profile.component';
import { ProductComponent } from './product/product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    TiendaComponent,
    LoginComponent,
    NavbarComponent,
    PerfilUsuarioComponent,
    DetallesProfileComponent,
    ProductComponent,
    CreateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
