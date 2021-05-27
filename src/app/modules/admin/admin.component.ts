import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public emailUser: any;

  constructor(private authserv: AuthService) {}

  ngOnInit(): void {
    this.emailUser = this.authserv.isLoggedIn;
  }
}
