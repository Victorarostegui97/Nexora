import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private http = inject(
    HttpClient
  );

  private apiUrl =
    'http://localhost:3000/inventory';

  getMovimientos() {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }

  createMovimiento(
    movimiento: any
  ) {

    return this.http.post(
      this.apiUrl, movimiento
    );

  }

}