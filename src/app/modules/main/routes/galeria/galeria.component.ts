import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'],
})
export class GaleriaComponent implements OnInit {
  galery$: Observable<any[]>;
  constructor(private readonly afs: AngularFirestore) {
    this.galery$ = afs.collection('galeria').valueChanges();
  }

  ngOnInit(): void {
    $(window).on('load', function () {
      var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
      });

      // Initiate venobox (lightbox feature used in portofilo)
      $(document).ready(function () {
        $('.venobox').venobox();
      });
    });
  }
}
