import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  create(createClientDto: any) {
    const client = this.clientsRepository.create({

        ...createClientDto,
        fechaCreacion : new Date()

      });

    return this.clientsRepository.save(client);

  }

  findOne(id: number) {

    return this.clientsRepository.findOne({

      where: { id }

    });

  }

  findAll() {

    return this.clientsRepository.find({

      order: {
        fechaCreacion: 'DESC'
      }

    });

  }

  async update( id: number, updateClientDto: any ) {

    await this.clientsRepository.update(
      id,
      updateClientDto
    );

    return this.clientsRepository.findOne({

      where: { id }

    });

  }

  remove(id: number) {

    return this.clientsRepository.delete(id);

  }
}
