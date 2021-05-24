import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { Observable } from 'rxjs';
import { FirebasestorageService } from 'src/app/core/services/firebasestorage.service';
declare var $: any;
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
})
export class ServiciosComponent implements OnInit {
  public nombreArchivo: string = '';
  constructor(
    private firebaseStorage: FirebasestorageService,
    private db: AngularFirestore
  ) {}

  servicios$ = new Observable<any>();
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

  frmnewService = new FormGroup({
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

  async newService() {
    if (!this.frmnewService.valid) {
      alert('todos los datos son requeridos');
    } else {
      $('#modNewService').modal('hide');

      let archivo = this.frmnewService.get('image');
      // let extension = archivo?.value.split('.').pop();
      let newService = this.db.collection('servicios').doc().ref;
      // let filename = `${newService.id}.${extension}`;
      let data = this.frmnewService.value;
      let referencia = this.firebaseStorage.getInfoFile(this.nombreArchivo);

      let tarea = this.firebaseStorage.uploadfile(this.nombreArchivo, archivo);

      referencia.getDownloadURL().subscribe((URL) => {
        data.urlImage = URL;
        console.log(URL);
        newService.set(data);
      });
    }
  }

  ngOnInit(): void {
    this.editor = new Editor();
    const doc = this.db.collection('servicios');

    this.servicios$ = doc.valueChanges();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  public cambioArchivo(event: any) {
    this.nombreArchivo = event.target.files[0].name;
  }
}
