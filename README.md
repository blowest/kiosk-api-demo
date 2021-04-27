# Nest.js - TypeORM

## TypeORM Integration

* Installation command
```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

 * ormconfig.json
```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "test",
  "password": "test",
  "database": "hello_typeorm",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
```

> WARNING<br>
> Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.

* app.module.ts
```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot()],
})
export class AppModule {}
```
> WARNING <br>
> Static glob paths (e.g., dist/**/*.entity{ .ts,.js}) won't work properly with webpack.





