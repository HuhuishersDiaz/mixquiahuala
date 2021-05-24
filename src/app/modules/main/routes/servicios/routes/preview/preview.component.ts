import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  serviceID: any = null;

  @ViewChild('pdfTable', { static: false })
  pdfTable!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  frmFicha = new FormGroup({
    Imagen: new FormControl(),
    Nombre: new FormControl(),
    Edad: new FormControl(),
    FECHA_DE_EXTRAVÍO: new FormControl(),
    Tipo_de_echo: new FormControl(),
    Lugar_de_loshechos: new FormControl(),
    SENAS_PARTICULARES: new FormControl(),
    COMPLEXIÓN: new FormControl(),
    ESTATURA: new FormControl(),
    TEZ: new FormControl(),
    CARA: new FormControl(),
    FRENTE: new FormControl(),
    NARIZ: new FormControl(),
    BOCA: new FormControl(),
    LABIOS: new FormControl(),
    CEJAS: new FormControl(),
    MENTÓN: new FormControl(),
    COLOR_DE_OJOS: new FormControl(),
    TIPO_Y_COLOR_DE_CABELL: new FormControl(),
    ROPA_QUE_VESTIA: new FormControl(),
    OBSERVACIONES_O_HECHOS: new FormControl(),
  });
  frmRegInjuve = new FormGroup({
    Imagen: new FormControl('', Validators.required),
    Nombre: new FormControl('', Validators.required),
    Apellido_Paterno: new FormControl('', Validators.required),
    Apellido_Materno: new FormControl('', Validators.required),
    Direccion: new FormControl('', Validators.required),
    CURP: new FormControl('', Validators.required),
    Edad: new FormControl('', Validators.required),
    Genero: new FormControl('', Validators.required),
    Telefonico: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.serviceID = routeParams.get('serviceID');
    if (!this.serviceID) {
      this.router.navigate(['/servicios']);
    }
  }

  downloadAsPDF(): void {
    let pWidth = 450;
    let srcWidth = this.pdfTable.nativeElement.scrollWidth;
    let margin = 18; // narrow margin - 1.27 cm (36);
    let scale = (pWidth - margin * 2) / srcWidth;

    const DATA = this.pdfTable.nativeElement;
    const doc: jsPDF = new jsPDF('p', 'px', 'a4');
    doc.html(DATA, {
      x: margin,
      y: margin,
      html2canvas: {
        scale: scale,
      },
      callback: (doc) => {
        doc.output('dataurlnewwindow');
      },
    });
  }

  GenerarFicha() {
    if (!this.frmFicha.valid) {
      alert('todos los datos son requeridos');
      return;
    }
    this.downloadAsPDF();
    console.log(this.frmFicha.value);
    let newFicha = this.db.collection('fichaBusqueda').doc().ref;
    let data = this.frmFicha.value;
    data.image = null;

    newFicha.set(data);
  }
  regInjuve() {
    if (!this.frmRegInjuve.valid) {
      alert('todos los datos son requeridos');
      return;
    }
    alert('Se armaceno la informacion ');
    let newRegistro = this.db.collection('JovenesInjuve').doc().ref;
    let data = this.frmRegInjuve.value;
    data.image = null;

    newRegistro.set(data);
  }
}
