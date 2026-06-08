import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import { ClientsService } from '../../core/services/clients.service';

import { ClienteModalComponent } from './components/cliente-modal/cliente-modal.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {

  displayedColumns = [
    'nombre',
    'telefono',
    'correo',
    'direccion',
    'acciones'
  ];

  clientes: any[] = [];

  constructor(
    private clientsService: ClientsService,

    private dialog: MatDialog,

    private snackBar: MatSnackBar
  ) {

    this.obtenerClientes();

  }

  obtenerClientes() {

    this.clientsService
      .getClients()
      .subscribe({

        next: (response) => {

          this.clientes = response;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  abrirModal(cliente?: any) {

    const dialogRef =
      this.dialog.open(
        ClienteModalComponent,
        {
          width: '600px',
          data: { cliente }
        }
      );

    dialogRef
      .afterClosed()
      .subscribe(result => {

        if (!result) {
          return;
        }

        if (cliente) {

          this.editarCliente(
            cliente.id,
            result
          );

        } else {

          this.crearCliente(
            result
          );

        }

      });

  }

  crearCliente(cliente: any) {

    this.clientsService
      .createClient(cliente)
      .subscribe({

        next: () => {

          this.obtenerClientes();

          this.snackBar.open(
            'Cliente creado correctamente',
            'Cerrar',
            {
              duration: 3000
            }
          );

        }

      });

  }

  editarCliente(
    id: number,
    cliente: any
  ) {

    this.clientsService
      .updateClient(
        id,
        cliente
      )
      .subscribe({

        next: () => {

          this.obtenerClientes();

          this.snackBar.open(
            'Cliente actualizado',
            'Cerrar',
            {
              duration: 3000
            }
          );

        }

      });

  }

  eliminarCliente(
    id: number
  ) {

    if (
      !confirm(
        '¿Eliminar cliente?'
      )
    ) {
      return;
    }

    this.clientsService
      .deleteClient(id)
      .subscribe({

        next: () => {

          this.obtenerClientes();

          this.snackBar.open(
            'Cliente eliminado',
            'Cerrar',
            {
              duration: 3000
            }
          );

        }

      });

  }

}