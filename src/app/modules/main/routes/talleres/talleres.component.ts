import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css'],
})
export class TalleresComponent implements OnInit {
  item$: Observable<any[]>;
  constructor(private readonly afs: AngularFirestore) {
    this.item$ = afs.collection('talleres').valueChanges();
  }
  ngOnInit(): void {}
}
