import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  public id:any
  public email:any
  public password:any
  public loginForm: FormGroup;
  public userdetails:any;

  constructor(
  private formBuilder: FormBuilder,
  private http: HttpClient,
  private router: Router  
  ) { 
   
  }

  ngOnInit() {
  }

onSubmit(){
  this.http.get('http://localhost:3000/userDeatils' ).subscribe((data)=>{
    console.log(data,'data from server');
    this.userdetails=data;
    for(let i=0;i<this.userdetails.length;i++)
  if( this.email==this.userdetails[i].email && this.password==this.userdetails[i].password)
  {
    console.log('valid user');
    localStorage.setItem("validUser","pass");
    this.router.navigateByUrl('userDash/'+ this.userdetails[i].id);
  }else{
  console.log('invalid user')
//  this.router.navigateByUrl('');
  }
  });
}

reDirect(){
  this.router.navigateByUrl('/user-signup');
}
}
