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
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import {DividerModule} from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import {TooltipModule} from 'primeng/tooltip';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
import { FinanceComponent } from './finance/finance.component';
import { ProductCardComponent } from './shared/product-card/product-card.component';
import { ForumComponent } from './forum/forum.component';
import { NewQuestionFormComponent } from './new-question-form/new-question-form.component';

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
    FinanceComponent,
    ProductCardComponent,
    ForumComponent,
    NewQuestionFormComponent,
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
    CalendarModule,
    CardModule,
    CarouselModule,
    ConfirmDialogModule,
    DropdownModule,
    GalleriaModule,
    InputMaskModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    MessagesModule,
    PaginatorModule,
    PasswordModule,
    RippleModule,
    ToastModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    DragDropModule,
    DividerModule,
    ChipModule,
    TooltipModule,
    DynamicDialogModule
  ],
  entryComponents: [
    NewQuestionFormComponent
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
