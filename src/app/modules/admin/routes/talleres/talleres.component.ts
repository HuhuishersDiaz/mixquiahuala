import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebasestorageService } from 'src/app/core/services/firebasestorage.service';
import { LoadingService } from 'src/app/core/services/loading.service';
declare var $: any;
@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css'],
})
export class TalleresComponent implements OnInit {
  public nombreArchivo: string = '';
  constructor(
    private authserv: AuthService,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private loadService: LoadingService
  ) {}

  talleres$ = new Observable<any>();
  editor!: Editor;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image', 'unlink'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  frmnewTaller = new FormGroup({
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
  });

  async newTaller() {
    if (!this.frmnewTaller.valid) {
      alert('todos los datos son requeridos');
    } else {
      $('#modTalleres').modal('hide');

      let newTaller = this.db.collection('talleres').doc().ref;
      let data = this.frmnewTaller.value;
      data.urlImage = this.nombreArchivo;
      data.user = this.authserv.userData.email;
      newTaller.set(data);
    }
  }

  ngOnInit(): void {
    this.editor = new Editor();
    const doc = this.db.collection('talleres');

    this.talleres$ = doc.valueChanges();
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
}
