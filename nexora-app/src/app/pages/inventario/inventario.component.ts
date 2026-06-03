import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MovimientoModalComponent } from './components/movimiento-modal/movimiento-modal.component';

import { InventoryService } from '../../core/services/inventory.service';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent {

  displayedColumns = [
    'producto',
    'tipo',
    'cantidad',
    'fecha'
  ];

  movimientos: any[] = [];

  productos: any[] = [];

  constructor(
  private dialog: MatDialog,
  private inventoryService: InventoryService,
  private productsService: ProductsService
  ) {

    this.obtenerMovimientos();
    this.obtenerProductos();

  }

  obtenerMovimientos() {

  this.inventoryService
    .getMovimientos()
    .subscribe({

      next: (
        response
      ) => {

        this.movimientos =
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

  obtenerProductos() {

  this.productsService
    .getProducts()
    .subscribe({

      next: (response) => {

        this.productos = response;

        console.log('Productos:', response);

      },

      error: (error) => {

        console.error(error);

      }

    });

}

  abrirMovimiento(tipo: string) {

    const dialogRef = this.dialog.open(
      MovimientoModalComponent,
      {
        width: '500px',
        data: {
          tipo,
          productos: this.productos
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      if(result) {

        this.inventoryService
        .createMovimiento({

          productId:
            result.producto,

          tipo:
            result.tipo,

          cantidad:
            result.cantidad

        })
        .subscribe({

          next: () => {

            this.obtenerMovimientos();

          },

          error: (
            error
          ) => {

            console.error(
              error
            );

          }

        });

        const producto = this.productos.find(
          p => p.nombre === result.producto
        );

        if(producto) {

          if(result.tipo === 'Entrada') {
            producto.stock += result.cantidad;
          }

          if(result.tipo === 'Salida') {
            producto.stock -= result.cantidad;
          }

        }

        this.movimientos = [...this.movimientos];

      }

    });

  }

}