// src/app/pages/currency-converter.component.ts
import { Component, signal } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  imports: [NgIf, NgFor, AsyncPipe, FormsModule],
})
export class CurrencyConverterComponent {
  currencies = signal<{ [key: string]: string }>({}); //Se define todo el estado que el componente necesita. 
  from = signal('USD');
  to = signal('EUR');
  amount = signal(1);
  result = signal<number | null>(null);
  loading = signal(false);

  constructor(private currencyService: CurrencyService) { //cuando se crea el componente se solicita a la Api para obetener todas las monedas disponibles y guardarlas en currencies. 
    this.currencyService.getCurrencies().subscribe(data => {
      this.currencies.set(data);
    });
  }

  convert() {
    this.loading.set(true); //Aquí se está cargando la solicitud
    this.currencyService.getRates(this.amount(), this.from(), this.to()).subscribe({ //Llama el servicio con los valores actuales
      next: (data: any) => {
        this.result.set(data.rates[this.to()]);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
