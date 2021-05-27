import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebasestorageService } from 'src/app/core/services/firebasestorage.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { AuthService } from 'src/app/core/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'],
})
export class GaleriaComponent implements OnInit {
  public loading = true;

  public nombreArchivo: string = '';
  // title = 'cloudsSorage';
  selectedFile: File | undefined;
  fb: any;
  public emailUser: any;
  downloadURL: Observable<string> | undefined;

  constructor(
    private firebaseStorage: FirebasestorageService,
    private db: AngularFirestore,
    private authserv: AuthService,
    private storage: AngularFireStorage,
    private loadService: LoadingService
  ) {}

  Galeria$ = new Observable<any>();

  frmnewImageGaleri = new FormGroup({
    title: new FormControl(
      {
        value: '',
        disabled: false,
      },
      Validators.required
    ),
    image: new FormControl({ value: '', disabled: false }, Validators.required),
  });

  async newImageGaleri() {
    if (!this.frmnewImageGaleri.valid) {
      alert('todos los datos son requeridos');
    } else {
      $('#modNewGaleri').modal('hide');

      let newImageGaleri = this.db.collection('galeria').doc().ref;

      let data = this.frmnewImageGaleri.value;
      data.urlImage = this.fb;
      data.user = this.emailUser.email;
      newImageGaleri.set(data);
    }
  }

  ngOnInit(): void {
    this.emailUser = this.authserv.isLoggedIn;
    const doc = this.db.collection('galeria');
    this.Galeria$ = doc.snapshotChanges();
  }

  ngOnDestroy(): void {}

  cambioArchivo(event: any) {
    this.loadService.loading$.emit({
      active: true,
      text: 'Cargando imagen ...',
    });
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `galeria/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`galeria/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
              this.loadService.loading$.emit({ active: false });
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }

  filter(user: string): boolean {
    if (this.emailUser.email == user) {
      return false;
    } else {
      return true;
    }
  }
  delete(id: string) {
    const res = this.db.collection('galeria').doc(id).delete();
    console.log(res);
  }
}
