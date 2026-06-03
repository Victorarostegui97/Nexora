import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ProductoFormModalComponent } from './components/producto-form-modal/producto-form-modal.component';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {

  constructor(
  private dialog: MatDialog,
  private snackBar: MatSnackBar,
  private productsService: ProductsService
  ) {

  this.obtenerProductos();

}

  displayedColumns: string[] = [
    'nombre',
    'stock',
    'precio',
    'acciones'
  ];

  productos: any[] = [];

  productosOriginal = [...this.productos];

  obtenerProductos() {

    this.productsService
      .getProducts()
      .subscribe({
      
        next: (response) => {

          this.productos = response;

          this.productosOriginal = [...response];

        },

        error: (error) => {
          console.error(error);
        }

      });

  }

  abrirModalProducto() {

  const dialogRef = this.dialog.open(
    ProductoFormModalComponent,
    {
      width: '500px'
    }
  );

  dialogRef.afterClosed().subscribe(result => {

    if(result) {

      this.productsService
        .createProduct(result)
        .subscribe({

          next: () => {

            this.obtenerProductos();

            this.snackBar.open(
              'Producto agregado correctamente',
              'Cerrar',
              {
                duration: 3000
              }
            );

          },

          error: (error) => {

            console.error(error);

          }

        });

    }

  });

}

buscarProducto(event: Event) {

  const valor = (event.target as HTMLInputElement)
    .value
    .toLowerCase();

  this.productos = this.productosOriginal.filter(
    producto =>
      producto.nombre.toLowerCase().includes(valor)
  );

}

eliminarProducto(id: number) {

  const confirmar = confirm(
    '¿Deseas eliminar este producto?'
  );

  if(!confirmar) return;

  this.productsService
    .deleteProduct(id)
    .subscribe({

      next: () => {

        this.obtenerProductos();

        this.snackBar.open(
          'Producto eliminado',
          'Cerrar',
          {
            duration: 3000
          }
        );

      },

      error: (error) => {
        console.error(error);
      }

    });

}

editarProducto(producto: any) {

  const dialogRef = this.dialog.open(
    ProductoFormModalComponent,
    {
      width: '500px',
      data: producto
    }
  );

  dialogRef.afterClosed().subscribe(result => {

    if(result) {

      this.productsService
        .updateProduct(producto.id, result)
        .subscribe({

          next: () => {

            this.obtenerProductos();

            this.snackBar.open(
              'Producto actualizado',
              'Cerrar',
              {
                duration: 3000
              }
            );

          },

          error: (error) => {
            console.error(error);
          }

        });

    }

  });

}

}