import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { TailorsComponent } from './components/tailors/tailors.component';
import { AddTailorComponent } from './components/add-tailor/add-tailor.component';
import { EditTailorComponent } from './components/edit-tailor/edit-tailor.component';
import { TailorDetailsComponent } from './components/tailor-details/tailor-details.component';
import { TailorDetailComponent } from './components/tailor-detail/tailor-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'tailors', component: TailorsComponent, canActivate: [AuthGuard]},
  {path: 'tailor/add', component: AddTailorComponent, canActivate: [AuthGuard]},
  {path: 'tailor/edit/:id', component: EditTailorComponent, canActivate: [AuthGuard]},
  {path: 'tailor/:id', component: TailorDetailsComponent, canActivate: [AuthGuard]},
  {path: 'tailor', component: TailorDetailComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
