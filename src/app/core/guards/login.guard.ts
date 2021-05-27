import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authServ: AuthService, private route: Router) {}
  canActivate(): boolean {
    if (this.authServ.isLoggedIn) {
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}
