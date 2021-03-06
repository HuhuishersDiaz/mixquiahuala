import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogin$: Observable<any> | undefined;
  constructor(private auth: AuthService) {
    this.isLogin$ = auth.afAuth.authState;
  }

  ngOnInit(): void {}
}
