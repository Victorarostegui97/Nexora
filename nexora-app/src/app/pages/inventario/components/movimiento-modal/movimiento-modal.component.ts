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
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-movimiento-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './movimiento-modal.component.html',
  styleUrl: './movimiento-modal.component.scss'
})
export class MovimientoModalComponent {

  movimientoForm: FormGroup;

  constructor(
    private fb: FormBuilder,

    private dialogRef: MatDialogRef<MovimientoModalComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {

    this.movimientoForm = this.fb.group({
      productId: ['', Validators.required],
      cantidad: ['', Validators.required]
    });

  }

  guardar() {

    if(this.movimientoForm.invalid) {
      return;
    }

    this.dialogRef.close({
      ...this.movimientoForm.value,
      tipo: this.data.tipo,
      fecha: new Date().toLocaleDateString()
    });

  }

}