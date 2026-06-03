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
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-producto-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './producto-form-modal.component.html',
  styleUrl: './producto-form-modal.component.scss'
})
export class ProductoFormModalComponent {

  productoForm: FormGroup;

  titulo = 'Agregar Producto';

  categorias = [
    'Perfumes',
    'Ropa',
    'Accesorios',
    'Tecnología'
  ];

  constructor(
  private fb: FormBuilder,
  private dialogRef: MatDialogRef<ProductoFormModalComponent>,

  @Inject(MAT_DIALOG_DATA)
  public data: any
) {

  this.productoForm = this.fb.group({
    nombre: ['', Validators.required],
    precio: ['', Validators.required],
    stock: ['', Validators.required],
    categoria: ['', Validators.required]
  });

  if (this.data) {

    this.titulo = 'Editar Producto';

    this.productoForm.patchValue({
      nombre: this.data.nombre,
      precio: this.data.precio,
      stock: this.data.stock,
      categoria: this.data.categoria
    });

  }

}

  guardar() {

    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    console.log(this.productoForm.value);

    this.dialogRef.close(this.productoForm.value);

  }

  cerrar() {
    this.dialogRef.close();
  }

}