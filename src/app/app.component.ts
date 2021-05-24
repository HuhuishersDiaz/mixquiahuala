import { Component, OnInit } from '@angular/core';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loading = false;
  loadingtext = '';
  constructor(private loadService: LoadingService) {}
  title = 'mixquia';
  ngOnInit(): void {
    this.loadService.loading$.subscribe((loading) => {
      console.log(loading);
      this.loading = loading.active;
      this.loadingtext = loading.text || '';
    });
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
