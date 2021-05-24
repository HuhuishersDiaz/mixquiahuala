import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css'],
})
export class RegistrosComponent implements OnInit, AfterViewInit {
  Registros$ = new Observable<any>();

  constructor(private authserv: AuthService) {}

  ngOnInit(): void {
    console.log(this.authserv.userData.email);
  }
  ngAfterViewInit() {
    if (this.authserv.userData.email) {
      alert('esto es injuve');
    }
  }
}
