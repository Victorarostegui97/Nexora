import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { SalesService } from '../../core/services/sales.service';

import { ProductsService } from '../../core/services/products.service';

import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { VentaModalComponent } from './components/venta-modal/venta-modal.component';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent implements OnInit {

  displayedColumns = [
    'producto',
    'cantidad',
    'total',
    'fecha',
    'estado',
    'acciones'
  ];

  ventas: any[] = [];
  productos: any[] = [];

  constructor(
    private salesService: SalesService,

    private productsService: ProductsService,

    private dialog: MatDialog,

    private snackBar: MatSnackBar
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

          width: '700px',
          maxWidth: '90vw',
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

              this.snackBar.open(
                'Venta registrada correctamente',
                'Cerrar',
                {
                  duration: 3000
                }
              );

            },

            error: (error) => {

              console.error(error);

              this.snackBar.open(
                'Error al registrar la venta',
                'Cerrar',
                {
                  duration: 4000
                }
              );

            }

          });

      });

  }

  anularVenta(id: number) {

    this.salesService
      .cancelSale(id)
      .subscribe({

        next: () => {

          this.obtenerVentas();

          this.snackBar.open(
            'Venta anulada correctamente',
            'Cerrar',
            {
              duration: 3000
            }
          );

        },

        error: (error) => {

          console.error(error);

          this.snackBar.open(
            'Error al anular la venta',
            'Cerrar',
            {
              duration: 3000
            }
          );

        }

      });

  }

}