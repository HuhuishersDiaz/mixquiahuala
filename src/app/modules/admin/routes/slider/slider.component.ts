import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/services/loading.service';
declare var $: any;
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  public action: string = 'Agregar';
  private nombreArchivo: string = '';
  private id: string = '';
  public reset: boolean = false;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private loadService: LoadingService
  ) {}

  convocatorias$ = new Observable<any>();

  frmNewSlider = new FormGroup({
    title: new FormControl(
      {
        value: '',
        disabled: false,
      },
      Validators.required
    ),
    image: new FormControl({ value: '', required: true }, Validators.required),
    description: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    link: new FormControl(''),
  });

  ngOnInit(): void {
    const doc = this.db.collection('sliders');

    this.convocatorias$.pipe(map((c) => console.log(c)));
    this.convocatorias$ = doc.snapshotChanges();
  }

  ngOnDestroy(): void {}

  async newSlider() {
    console.log('hola');
    try {
      if (!this.frmNewSlider.valid) {
        alert('todos los datos son requeridos');
      } else {
        this.loadService.loading$.emit({
          active: true,
          text: 'Cargando imagen ...',
        });

        let data = this.frmNewSlider.value;

        // let extension = archivo?.value.split('.').pop();
        if (this.action == 'editar') {
          let newConvocatoria = this.db.collection('sliders').doc(this.id).ref;
          data.urlImage = this.nombreArchivo;
          // let filename = `${newConvocatoria.id}.${extension}`;
          data.image = null;

          newConvocatoria.set(data);
        } else {
          let newConvocatoria = this.db.collection('sliders').doc().ref;

          let url = await this.saveFile()
            .then((c) => c)
            .catch((c) => c);
          data.urlImage = url;
          // let filename = `${newConvocatoria.id}.${extension}`;
          data.image = null;

          newConvocatoria.set(data);
        }

        this.loadService.loading$.emit({ active: false });
        this.frmNewSlider.reset();
        this.reset = true;
        alert('Operación exitosa');
        $('#modSlides').modal('hide');
      }
    } catch (ex) {
      alert(ex);
      this.loadService.loading$.emit({ active: false });
    }
  }

  async saveFile() {
    return new Promise((reject, resolve) => {
      try {
        var n = Date.now();
        const file: File = this.frmNewSlider.get('image')?.value;
        const filePath = `galeria/${n}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`galeria/${n}`, file);
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              const downloadURL = fileRef.getDownloadURL();
              downloadURL.subscribe((url: string) => {
                if (url) {
                  resolve(url);
                }
              });
            })
          )
          .subscribe((url: any) => {
            if (url) {
              console.log(url);
            }
          });
      } catch (ex) {
        reject(ex);
      }
    });
  }
  Edit(id: string, data: any) {
    this.reset = true;

    this.id = id;
    this.action = 'editar';
    this.nombreArchivo = data.urlImage;
    this.frmNewSlider = new FormGroup({
      title: new FormControl(data.title),
      image: new FormControl(),
      description: new FormControl(data.description),
      link: new FormControl(data.link),
    });

    $('#modSlides').modal('show');
  }
  async delete(id: string) {
    const res = await this.db.collection('sliders').doc(id).delete();
    console.log(res);
  }
}
