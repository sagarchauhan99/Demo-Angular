import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashComponent } from './admin/admin-dash/admin-dash.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { UserDashComponent } from './user/user-dash/user-dash.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { VerifiedUserComponent } from './user/verified-user/verified-user.component';

const routes: Routes = [
  {path:'user-login',component: UserLoginComponent},
  {path:'user-signup',component: UserRegisterComponent},
  {path:'verified/:id',component: VerifiedUserComponent},
  {path:'userDash/:id', component: UserDashComponent,canActivateChild:[AuthGuard]},
  {path:'adminDash',component:AdminDashComponent,canActivateChild:[AuthGuard]},
  {path:'admin-login',component:AdminLoginComponent},
  {path:'',component:AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
