import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppService } from '../src/app.service';
import { AppController } from '../src/app.controller';
import { AppRepository } from '../src/app.repository';

describe('AppController (integration)', () => {
  let app: INestApplication;
  let appService: AppService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, AppRepository],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // ---------------------/GET status------------------------------------
  it('/GET status', async () => {
    const response = await request(app.getHttpServer())
      .get('/status');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('damaged_system');
  });

  // ---------------------/GET repair-bay------------------------------------

  it('/GET repair-bay', async () => {
    const appRepository = app.get<AppRepository>(AppRepository);
    appRepository.setDamagedSystemPicked('navigation');

    const response = await request(app.getHttpServer())
      .get('/repair-bay');

    expect(response.status).toBe(200);
    expect(response.text).toContain('NAV-01');
  });

  it('/GET repair-bay bad', async () => {
    const appRepository = app.get<AppRepository>(AppRepository);
    appRepository.setDamagedSystemPicked('');
    const response = await request(app.getHttpServer())
      .get('/repair-bay');

    expect(response.status).toBe(400);
    expect(response.text).toContain('No system picked');
  });

  // ------------------------/POST teapot---------------------------------

  it('/POST teapot', async () => {
    const response = await request(app.getHttpServer())
      .post('/teapot');


    expect(response.status).toBe(418);
  });
});
