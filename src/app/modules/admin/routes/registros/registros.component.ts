import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css'],
})
export class RegistrosComponent implements OnInit, AfterViewInit {
  Registros$ = new Observable<any>();
  public emailUser: any;

  constructor(private authserv: AuthService, private db: AngularFirestore) {}

  ngOnInit(): void {
    this.emailUser = this.authserv.isLoggedIn;
  }
  ngAfterViewInit() {
    this.emailUser = this.authserv.isLoggedIn;
    if (this.emailUser.email === 'imm@mixquiahuala.com') {
      const doc = this.db.collection('fichaBusqueda');

      this.Registros$ = doc.snapshotChanges();
    } else {
      const doc = this.db.collection('JovenesInjuve');

      this.Registros$ = doc.snapshotChanges();
    }
  }
  async delete(id: string) {
    console.log(id);
    if (this.emailUser.email === 'imm@mixquiahuala.com') {
      const res = await this.db.collection('fichaBusqueda').doc(id).delete();
    } else {
      const res = await this.db.collection('JovenesInjuve').doc(id).delete();
    }
  }
}
