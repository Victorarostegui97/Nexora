import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-venta-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './venta-modal.component.html',
  styleUrl: './venta-modal.component.scss'
})
export class VentaModalComponent {

  ventaForm: FormGroup;
  productoSeleccionado: any = null;
  puedeGuardar = false;
  total = 0;

  constructor(
    private fb: FormBuilder,

    private snackBar: MatSnackBar,

    private dialogRef: MatDialogRef<VentaModalComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ){

    this.ventaForm = this.fb.group({

      productId: [
        '',
        Validators.required
      ],

      cantidad: [
        '',
        Validators.required
      ]

    });

    this.ventaForm
    .get('productId')
    ?.valueChanges
    .subscribe(id => {

      this.productoSeleccionado =
        this.data.productos.find(
          (p: any) => p.id === id
        );

      this.calcularTotal();

    });

  this.ventaForm
    .get('cantidad')
    ?.valueChanges
    .subscribe(() => {

      this.calcularTotal();

    });

  }

  calcularTotal() {

    if (!this.productoSeleccionado) {

      this.total = 0;
      this.puedeGuardar = false;

      return;

    }

    const cantidadControl =
      this.ventaForm.get('cantidad');

    const cantidad =
      Number(
        cantidadControl?.value
      ) || 0;

    const precio =
      Number(
        this.productoSeleccionado.precio
      ) || 0;

    this.total =
      cantidad * precio;

    this.puedeGuardar =
      cantidad > 0 &&
      cantidad <= this.productoSeleccionado.stock;

  }

  guardar() {

    if (
      this.ventaForm.invalid
    ) {

      this.ventaForm.markAllAsTouched();

      return;

    }

    if (
      this.productoSeleccionado &&
      this.ventaForm.value.cantidad >
      this.productoSeleccionado.stock
    ) {

      this.snackBar.open(
        'Stock insuficiente',
        'Cerrar',
        {
          duration: 3000
        }
      );

      return;

    }

    this.dialogRef.close(
      this.ventaForm.value
    );

  }

}