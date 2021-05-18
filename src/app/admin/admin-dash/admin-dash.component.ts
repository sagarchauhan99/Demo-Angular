import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.scss']
})
export class AdminDashComponent implements OnInit {
   public userlist:any;

   constructor(private http: HttpClient,
   private route: Router) { }

  ngOnInit() {

    this.getData()
  }

getData(){
this.http.get('http://localhost:3000/userDeatils').subscribe((data)=>{
  console.log(data,'data from server');
  this.userlist=data;
});
}

block(index){
  this.userlist[index].block=true;
  this.http.put('http://localhost:3000/userDeatils/'+ this.userlist[index].id,this.userlist[index]).subscribe((data)=>{
  console.log(data);
  })
}

Unblock(index){
  this.userlist[index].block=false;
  this.http.put('http://localhost:3000/userDeatils/'+ this.userlist[index].id,this.userlist[index]).subscribe((data)=>{
    console.log(data);
    })
}

Logout(){
  localStorage.removeItem('validUser');
  this.route.navigateByUrl('adminDash');
}
}
