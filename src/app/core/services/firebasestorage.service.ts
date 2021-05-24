import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebasestorageService {
  uploadURL: any;
  constructor(private storage: AngularFireStorage) {}

  //Tarea para subir archivo
  uploadfile(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  getInfoFile(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }
}
