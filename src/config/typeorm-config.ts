import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Top2020',
  database: 'task_management',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
};
