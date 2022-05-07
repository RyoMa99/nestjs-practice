import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './decorator/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('jwt')
  getHelloWithJwt(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('unjwt')
  getHelloWithNoJwt(): string {
    return this.appService.getHello();
  }
}
