import { Controller, Get, Header, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { StatusDto } from './dto/status_dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("status")
  @Header('Content-Type', 'application/json')
  getStatus(): StatusDto {
    return this.appService.getRandomSystem();
  }


  @Get("/repair-bay")
  @Header('Content-Type', 'text/html')
  getSystemCode(): String {
    const systemCode = this.appService.getSystemCode();

    return `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Repair</title>
      </head>
      <body>
          <div class="anchor-point">${systemCode}</div>
      </body>
      </html>
    `;
  }

  @Post('/teapot')
  @Header('Content-Type', 'application/json')
  teapot(): String {
    throw new HttpException('I am a teapot', HttpStatus.I_AM_A_TEAPOT);
  }
}
