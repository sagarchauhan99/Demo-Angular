import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild { 
  constructor(private router: Router){}
  canActivateChild(){
    if(localStorage.getItem("validUser")){ 
     return true;
   }else{
     this.router.navigateByUrl('');
     return false;
   }
    }
}
