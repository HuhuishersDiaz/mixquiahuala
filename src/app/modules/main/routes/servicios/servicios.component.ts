import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
})
export class ServiciosComponent implements OnInit {
  // item$: Observable<any[]>;
  constructor(private readonly afs: AngularFirestore) {
    // this.item$ = afs.collection('servicios').valueChanges();
  }

  ngOnInit(): void {}
}
