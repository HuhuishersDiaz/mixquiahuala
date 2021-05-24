import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading$ = new EventEmitter<{ active: boolean; text?: string }>();
  constructor() {}
}
