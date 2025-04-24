// src/app/services/currency.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //No olvidar que este es el servicio que permite hacer peticiones GET,POST, etc.

@Injectable({ providedIn: 'root' }) //Angular provee automáticamente este servicio a toda la aplicación 
export class CurrencyService {
  private readonly API_URL = 'https://api.frankfurter.app'; //Constante privada que representa la URL del API que se va a usar.

  constructor(private http: HttpClient) {} //Aquí se inyecta el servicio para poder hacer las peticiones

  getRates(amount: number, from: string, to: string) { //Se reciben 3 parámetros
    return this.http.get(`${this.API_URL}/latest?amount=${amount}&from=${from}&to=${to}`);
  }

  getCurrencies() {
    return this.http.get<{ [key: string]: string }>(`${this.API_URL}/currencies`);
  }
}
