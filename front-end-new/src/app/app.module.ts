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
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import {AvatarModule} from 'primeng/avatar';

import { AppComponent } from './app.component';
import { FinanceComponent } from './finance/finance.component';
import { ForumComponent } from './forum/forum.component';
import { FootbarComponent } from './shared/footbar/footbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management/management.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NewQuestionFormComponent } from './new-question-form/new-question-form.component';
import { NotAllowedComponent } from './shared/not-allowed/not-allowed.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ProductComponent } from './product/product.component';
import { ProductCardComponent } from './shared/product-card/product-card.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { StoreComponent } from './store/store.component';
import { UnexpectedErrorComponent } from './shared/unexpected-error/unexpected-error.component';
import { QuestionViewComponent } from './question-view/question-view.component';

@NgModule({
  declarations: [
    AppComponent,
    FinanceComponent,
    ForumComponent,
    FootbarComponent,
    HomeComponent,
    LoginComponent,
    ManagementComponent,
    NavbarComponent,
    NewQuestionFormComponent,
    NotAllowedComponent,
    NotFoundComponent,
    NotFoundPageComponent,
    ProductComponent,
    ProductCardComponent,
    ProductEditComponent,
    ProfileComponent,
    SearchComponent,
    StoreComponent,
    UnexpectedErrorComponent,
    QuestionViewComponent,
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
    ChipModule,
    ConfirmDialogModule,
    DividerModule,
    DropdownModule,
    DynamicDialogModule,
    GalleriaModule,
    InputMaskModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    MessagesModule,
    PaginatorModule,
    PasswordModule,
    RippleModule,
    SelectButtonModule,
    ToastModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TooltipModule,
    AvatarModule
  ],
  entryComponents: [NewQuestionFormComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
