import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FootbarComponent } from './shared/footbar/footbar.component';
import { StoreComponent } from './store/store.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';
import { ManagementComponent } from './management/management.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { NotAllowedComponent } from './shared/not-allowed/not-allowed.component';
import { UnexpectedErrorComponent } from './shared/unexpected-error/unexpected-error.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FootbarComponent,
    StoreComponent,
    LoginComponent,
    SearchComponent,
    ProfileComponent,
    ProductComponent,
    ManagementComponent,
    NotFoundComponent,
    NotFoundPageComponent,
    NotAllowedComponent,
    UnexpectedErrorComponent,
    ProductEditComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AccordionModule,
    AutoCompleteModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    ConfirmDialogModule,
    DropdownModule,
    GalleriaModule,
    InputTextareaModule,
    InputTextModule,
    MessagesModule,
    PasswordModule,
    RippleModule,
    ToastModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
