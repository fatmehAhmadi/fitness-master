import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  loadingState = new Subject<boolean>();
  constructor() {}
}
