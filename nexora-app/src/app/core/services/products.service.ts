import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/products';

  getProducts() {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }

  createProduct(producto: any) {

    return this.http.post(
      this.apiUrl,
      producto
    );

  }

  deleteProduct(id: number) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

  updateProduct(
    id: number,
    producto: any
  ) {

    return this.http.patch(
      `${this.apiUrl}/${id}`,
      producto
    );

  }

}