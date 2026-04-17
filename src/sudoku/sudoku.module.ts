import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sudoku } from './sudoku.entity';
import { SudokuService } from './sudoku.service';
import { SudokuController } from './sudoku.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sudoku])],
  providers: [SudokuService],
  controllers: [SudokuController],
})
export class SudokuModule {}
