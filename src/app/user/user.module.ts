import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VerifiedUserComponent } from './verified-user/verified-user.component';
import { UserDashComponent } from './user-dash/user-dash.component';

@NgModule({
  declarations: [UserLoginComponent,UserRegisterComponent, VerifiedUserComponent, UserDashComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    UserLoginComponent,
    UserRegisterComponent,
    VerifiedUserComponent
  ]
})
export class UserModule { }
