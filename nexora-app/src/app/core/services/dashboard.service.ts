import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:3000/dashboard';

  getSummary() {

    return this.http.get<any>(
      `${this.apiUrl}/summary`
    );

  }

  getLowStockProducts() {

    return this.http.get<any[]>(
      `${this.apiUrl}/low-stock`
    );

  }

  getRecentMovements() {

    return this.http.get<any[]>(
      `${this.apiUrl}/recent-movements`
    );

  }

}