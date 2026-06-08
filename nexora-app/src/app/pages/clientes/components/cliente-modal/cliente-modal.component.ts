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

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cliente-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './cliente-modal.component.html',
  styleUrl: './cliente-modal.component.scss'
})
export class ClienteModalComponent {

  clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,

    private dialogRef:
      MatDialogRef<ClienteModalComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {

    this.clienteForm = this.fb.group({

      nombre: [
        data?.cliente?.nombre || '',
        Validators.required
      ],

      telefono: [
        data?.cliente?.telefono || '',
        Validators.required
      ],

      correo: [
        data?.cliente?.correo || '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      direccion: [
        data?.cliente?.direccion || '',
        Validators.required
      ]

    });

  }

  guardar() {

    if (
      this.clienteForm.invalid
    ) {

      this.clienteForm.markAllAsTouched();

      return;

    }

    this.dialogRef.close(
      this.clienteForm.value
    );

  }

}