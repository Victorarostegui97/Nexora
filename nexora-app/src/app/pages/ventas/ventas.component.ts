import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { SalesService } from '../../core/services/sales.service';

import { ProductsService } from '../../core/services/products.service';

import { MatDialog } from '@angular/material/dialog';

import { VentaModalComponent } from './components/venta-modal/venta-modal.component';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent implements OnInit {

  displayedColumns = [
    'fecha',
    'producto',
    'cantidad',
    'total'
  ];

  ventas: any[] = [];
  productos: any[] = [];

  constructor(
    private salesService: SalesService,

    private productsService: ProductsService,

    private dialog: MatDialog
  ) {}

  ngOnInit() {

    this.obtenerVentas();

    this.obtenerProductos();

  }

  obtenerVentas() {

    this.salesService
      .getSales()
      .subscribe({

        next: (response) => {

          this.ventas = response;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  obtenerProductos() {

    this.productsService
      .getProducts()
      .subscribe({

        next: (response) => {

          this.productos = response;

        }

      });

  }

  abrirVenta() {

    const dialogRef =
      this.dialog.open(
        VentaModalComponent,
        {

          width: '500px',

          data: {

            productos:
              this.productos

          }

        }
      );

    dialogRef
      .afterClosed()
      .subscribe(result => {

        if (!result) {
          return;
        }

        this.salesService
          .createSale(result)
          .subscribe({

            next: () => {

              this.obtenerVentas();

            },

            error: (error) => {

              console.error(
                error
              );

            }

          });

      });

  }

}