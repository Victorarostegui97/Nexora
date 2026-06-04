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
    MatButtonModule
  ],
  templateUrl: './venta-modal.component.html',
  styleUrl: './venta-modal.component.scss'
})
export class VentaModalComponent {

  ventaForm: FormGroup;

  constructor(
    private fb: FormBuilder,

    private dialogRef:
      MatDialogRef<VentaModalComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {

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

  }

  guardar() {

    if (
      this.ventaForm.invalid
    ) {

      this.ventaForm.markAllAsTouched();

      return;

    }

    this.dialogRef.close(
      this.ventaForm.value
    );

  }

}