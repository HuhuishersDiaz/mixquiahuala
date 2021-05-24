import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  convocatorias$: Observable<any>;
  constructor(private db: AngularFirestore) {
    const doc = this.db.collection('sliders');

    this.convocatorias$ = doc.valueChanges();
  }

  ngOnInit(): void {}
}
