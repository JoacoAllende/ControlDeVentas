import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  activo : Boolean = false;
  
  API_URI = 'localhost:3000';

  constructor() { }
}
