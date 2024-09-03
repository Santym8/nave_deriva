import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { StatusDto } from './dto/status_dto';

@Injectable()
export class AppService {


  constructor(
    private readonly appRepository: AppRepository,
  ) { }

  getRandomSystem(): StatusDto {
    const systems = this.appRepository.getSystems();
    const randomsystem = systems[Math.floor(Math.random() * systems.length)];
    this.appRepository.setDamagedSystemPicked(randomsystem);
    return { damaged_system: randomsystem };
  }

  getSystemCode(): String {
    const damaged_system = this.appRepository.getDamagedSystemPicked();

    if (!damaged_system) {
      throw new HttpException('No system picked', HttpStatus.BAD_REQUEST);
    }

    return this.appRepository.getSystemCode(damaged_system);
  }

}
