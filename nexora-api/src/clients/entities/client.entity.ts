import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity()
export class Client {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  telefono!: string;

  @Column()
  correo!: string;

  @Column()
  direccion!: string;

  @Column()
  fechaCreacion!: Date;

}