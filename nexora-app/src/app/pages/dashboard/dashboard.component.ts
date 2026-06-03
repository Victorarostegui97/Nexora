import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  resumen = {

    totalProductos: 0,

    stockTotal: 0,

    entradas: 0,

    salidas: 0

  };

  lowStockProducts: any[] = [];
  recentMovements: any[] = [];

  constructor(
    private dashboardService: DashboardService
  ) {

    this.obtenerResumen();
    this.obtenerStockBajo();
    this.obtenerMovimientosRecientes();

  }

  obtenerResumen() {

    this.dashboardService
      .getSummary()
      .subscribe({

        next: (response) => {

          this.resumen = response;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  obtenerStockBajo() {

    this.dashboardService
      .getLowStockProducts()
      .subscribe({

        next: (
          response
        ) => {

          this.lowStockProducts =
            response;

        },

        error: (
          error
        ) => {

          console.error(
            error
          );

        }

      });

  }

  obtenerMovimientosRecientes() {

    this.dashboardService
      .getRecentMovements()
      .subscribe({

        next: (response) => {

          this.recentMovements =
            response;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}