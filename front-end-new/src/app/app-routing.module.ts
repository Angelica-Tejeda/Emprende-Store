import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { FinanceComponent } from './finance/finance.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management/management.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ProductComponent } from './product/product.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { StoreComponent } from './store/store.component';
import { ForumComponent } from './forum/forum.component';
import { QuestionViewComponent } from './question-view/question-view.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'finance', component: FinanceComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'management', component: ManagementComponent },
  { path: 'product/:publId', component: ProductComponent },
  { path: 'product/edit/:publId', component: ProductEditComponent },
  { path: 'profile/:userId', component: ProfileComponent },
  { path: 'search/:busqueda', component: SearchComponent },
  { path: 'store', component: StoreComponent },
  { path: 'question/:id', component: QuestionViewComponent },
  { path: '**', component: NotFoundPageComponent },
];

const routerOptions: ExtraOptions = {
  anchorScrolling: "enabled",
  scrollOffset: [0, 66],
  scrollPositionRestoration: 'enabled',
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
