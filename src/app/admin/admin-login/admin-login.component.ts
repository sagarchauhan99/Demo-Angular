import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
public username:any
public password:any
public admindata:any
  constructor( private http: HttpClient,
    private route:Router,
    ) { }

  ngOnInit() {
  }
Login(){
this.http.get('http://localhost:3000/adminDetails').subscribe((data)=>{
  console.log(data,'admin details');
  this.admindata=data;
  if(this.username==this.admindata[0].username && this.password==this.admindata[0].password)
  {
    localStorage.setItem("validUser","pass");
    console.log('correct details')
    this.route.navigateByUrl('adminDash');
  }else{
    console.log('incorrect details');
    this.route.navigateByUrl('');
  }
});
}
}
