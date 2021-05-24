import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit {
  item$: Observable<any[]>;
  constructor(private readonly afs: AngularFirestore) {
    this.item$ = afs.collection('servicios').valueChanges();
  }
  ngOnInit(): void {}
}
