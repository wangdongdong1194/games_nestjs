import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { SudokuModule } from './sudoku/sudoku.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite3',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SudokuModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
