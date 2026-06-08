import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:3000/clients';

  getClients() {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }

  createClient(
    cliente: any
  ) {

    return this.http.post(
      this.apiUrl,
      cliente
    );

  }

  updateClient(
    id: number,
    cliente: any
  ) {

    return this.http.patch(
      `${this.apiUrl}/${id}`,
      cliente
    );

  }

  deleteClient(
    id: number
  ) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

}