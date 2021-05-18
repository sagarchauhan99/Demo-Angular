import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.scss']
})
export class UserDashComponent implements OnInit {
public id:any
public currentUser:any
public detailsForm: FormGroup;
public alluser:any;
public searched:any;
public searcheduser:any;
public issearched=false;
public friendlist:any;
public reqlist:any;
public sendreq=[];

  constructor(private http: HttpClient,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder ) { }

    public send=new BehaviorSubject({})
    public collect=<any>this.send.asObservable();

  ngOnInit() {
    this.detailsForm= this.formBuilder.group({
      id:[Number],
      name:[''],
      phoneNumber:[''],
      email:[''],
      password:[''],
      address:[''],
      city:[''],
      state:[''],
      zip:[''],
      imgPath:[''],
      block:["false"],
      friends:[],
      requests:[]
    });
    this.getRoutes()
   this.getAllUsers()
  }
  getRoutes(){
    this.activatedRoute.params.subscribe((data)=>{
      console.log(data,"data  from routes");
      this.id= data.id;
      this.getDetails();
    });
  }

getDetails(){
console.log(this.id);
this.http.get('http://localhost:3000/userDeatils/'+ this.id).subscribe((data)=>{
 console.log(data,'data from server') 
 this.prefetch(data);
 this.currentUser=data;
 this.friendlist=this.currentUser.friends;
 this.reqlist=this.currentUser.requests;
});
}

prefetch(val){
  this.detailsForm.controls['id'].setValue(val.id);
  this.detailsForm.controls['name'].setValue(val.name);
  this.detailsForm.controls['phoneNumber'].setValue(val.phoneNumber);
  this.detailsForm.controls['email'].setValue(val.email);
  this.detailsForm.controls['password'].setValue(val.password);
  this.detailsForm.controls['address'].setValue(val.address);
  this.detailsForm.controls['city'].setValue(val.city);
  this.detailsForm.controls['state'].setValue(val.state);
  this.detailsForm.controls['zip'].setValue(val.zip);
  this.detailsForm.controls['imgPath'].setValue(val.imgPath);
}

getAllUsers(){
  this.http.get('http://localhost:3000/userDeatils').subscribe((data)=>{
    this.alluser=data;
    console.log(this.alluser,'all user data');
  })
}

getSearched(){
  for(let i=0;i<this.alluser.length;i++){
    if(this.searched==this.alluser[i].name || this.searched==this.alluser[i].email){
    this.searcheduser=this.alluser[i];
    console.log(this.searcheduser,'searched user');
    this.issearched=true;
  }
}
}
close(){
  this.issearched=false;
}

accecptReq(index){
  let acc=this.reqlist[index];
  this.reqlist.splice(index,1);
 this.friendlist.push(acc);
 this.currentUser.requests=this.reqlist;
 this.http.put('http://localhost:3000/userDeatils/'+ this.currentUser.id,this.currentUser).subscribe(data=>{

})
}
reject(index){
  this.reqlist.splice(index,1);
}

add(){
  this.sendreq.push(this.currentUser.name);
  this.searcheduser.requests=this.sendreq;
  this.http.put('http://localhost:3000/userDeatils/'+ this.searcheduser.id,this.searcheduser).subscribe(data=>{

  });
}
signOut(){
  localStorage.removeItem('validUser');
  this.route.navigateByUrl('/user-login');
}
}

