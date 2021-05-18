import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Cotter from 'cotter';
@Component({
  selector: 'app-verified-user',
  templateUrl: './verified-user.component.html',
  styleUrls: ['./verified-user.component.scss']
})
export class VerifiedUserComponent implements OnInit {
public id:any
success=false
payload=null
payloadString=null;

  constructor( private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
      this.activatedRoute.params.subscribe((data)=>{
        console.log(data,"data  from routes");
        this.id= data.id;
      });
    
    var cotter = new Cotter("833b379e-4798-4ee5-99f8-2f4836dcffcd"); // 👈 Specify your API KEY ID here
    cotter
      .signInWithLink()
      .showEmailForm()
      .then((payload: object) => {
        this.success = true;
        this.payload = payload;
        this.payloadString = JSON.stringify(payload, null, 4);
        this.route.navigateByUrl('/userDash/'+ this.id);
        
      })
      .catch((err: any) => console.log(err));
      
      
  }


  }


