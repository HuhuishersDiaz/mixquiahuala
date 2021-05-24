import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-convocatorias',
  templateUrl: './convocatorias.component.html',
  styleUrls: ['./convocatorias.component.css'],
})
export class ConvocatoriasComponent implements OnInit {
  item$: Observable<any[]>;
  constructor(private readonly afs: AngularFirestore) {
    this.item$ = afs.collection('convocatorias').valueChanges();
  }

  ngOnInit(): void {
    console.log(this.item$);
  }
}
