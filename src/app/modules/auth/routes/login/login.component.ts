import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
// import {  } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {
    console.log(auth.isLoggedIn);
    console.log(auth.userData);
  }

  frmLogin = new FormGroup({
    user: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {}

  async login() {
    console.log(this.frmLogin.valid);

    if (this.frmLogin.valid) {
      // console.log(this.frmLogin.)
      // console.log(
      //   this.frmLogin.get('user')?.value,
      //   this.frmLogin.get('password')?.value
      // );

      await this.auth.SignIn(
        this.frmLogin.get('user')?.value,
        this.frmLogin.get('password')?.value
      );
    }
  }

  newTaller() {}
}
