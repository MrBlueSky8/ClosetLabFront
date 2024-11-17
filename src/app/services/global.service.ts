import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private idSesion: number = 0;

  constructor() { }

  setMyidSesion(value: number): void {
    this.idSesion = value;
  }

  getMyidSesion(): number {
    return this.idSesion;
  }
}
