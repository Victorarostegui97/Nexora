import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:3000/sales';

  getSales() {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }

  createSale(
    sale: any
  ) {

    return this.http.post(
      this.apiUrl,
      sale
    );

  }

}