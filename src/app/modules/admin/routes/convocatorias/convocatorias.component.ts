import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { observable, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebasestorageService } from 'src/app/core/services/firebasestorage.service';
import { LoadingService } from 'src/app/core/services/loading.service';

declare var $: any;

@Component({
  selector: 'app-convocatorias',
  templateUrl: './convocatorias.component.html',
  styleUrls: ['./convocatorias.component.css'],
})
export class ConvocatoriasComponent implements OnInit {
  public nombreArchivo: string = '';
  private userData: any;
  emailUser: any;
  constructor(
    private authserv: AuthService,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private loadService: LoadingService
  ) {
    this.userData = this.authserv.isLoggedIn;
  }

  convocatorias$ = new Observable<any>();
  editor!: Editor;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  frmnewConvocatoria = new FormGroup({
    editorContent: new FormControl({
      value: '',
      disabled: false,
    }),
    title: new FormControl(
      {
        value: '',
        disabled: false,
      },
      Validators.required
    ),
    image: new FormControl({ value: '', disabled: false }, Validators.required),
    description: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    endDate: new FormControl('', Validators.required),
  });

  async newConvocatoria() {
    if (!this.frmnewConvocatoria.valid) {
      alert('todos los datos son requeridos');
    } else {
      $('#modConvocatoria').modal('hide');

      let newConvocatoria = this.db.collection('convocatorias').doc().ref;
      let data = this.frmnewConvocatoria.value;
      data.urlImage = this.nombreArchivo;
      data.user = this.authserv.userData.email;
      newConvocatoria.set(data);
    }
  }

  ngOnInit(): void {
    this.emailUser = this.authserv.isLoggedIn;

    this.editor = new Editor();
    const doc = this.db.collection('convocatorias');

    this.convocatorias$ = doc.snapshotChanges();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  public cambioArchivo(event: any) {
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
          const downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe((url: any) => {
            if (url) {
              this.nombreArchivo = url;
              this.loadService.loading$.emit({ active: false });
            }
            console.log(this.nombreArchivo);
          });
        })
      )
      .subscribe((url: any) => {
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

  async delete(id: string) {
    const res = await this.db.collection('convocatorias').doc(id).delete();
    console.log(res);
  }
}
