import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const configService = new ConfigService();

    return {
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: this.strToBool(
        configService.get<string>('DB_SYNC', 'false'),
      ),
    };
  }

  private strToBool(boolStr: string): boolean {
    switch (boolStr.toLowerCase().trim()) {
      case 'true':
        return true;
      default:
        return false;
    }
  }
}
