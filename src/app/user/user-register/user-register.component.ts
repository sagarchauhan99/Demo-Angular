import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
 public signupForm: FormGroup;
 public imgPath:any;
 public url:any;
 public id:any;
 public imageb64:string;
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { 
    
  }

  ngOnInit() {
    this.signupForm= this.formBuilder.group({
      id:[Number],
      name:[''],
      phoneNumber:[Number],
      email:[''],
      password:[''],
      address:[''],
      city:[''],
      state:[''],
      zip:[''],
      imgPath:[''],
      block:["false"],
      friends:[''],
      requests:['']
    });
  }

  onSubmit(){
    console.log(this.signupForm.value,'valuee');
    this.http.post('http://localhost:3000/userDeatils',this.signupForm.value)
        .subscribe((data)=>{ 
          console.log(data,'data from post service');
          this.id=this.signupForm.controls['id'].value;
          this.route.navigateByUrl('/verified/' + this.id);
        });

  }


  upload(){
//    this.imgPath=this.signupForm.controls['imgPath'].value;
//    this.url=this.sanitizer.bypassSecurityTrustUrl(this.imgPath);
//     console.log(this.url,'img url');
let input :any = document.getElementById('image');
input.onchange = () => {
  var file = input.files[0],
    reader = new FileReader();

  reader.onloadend = () => {        
    this.imageb64 = reader.result.toString();
  };

  reader.readAsDataURL(file);
};
  }
 
}
