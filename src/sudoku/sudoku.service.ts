import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sudoku } from './sudoku.entity';

@Injectable()
export class SudokuService {
  constructor(
    @InjectRepository(Sudoku)
    private sudokuRepository: Repository<Sudoku>,
  ) {}

  createMany(
    sudokus: { puzzle: string; solution: string }[],
  ): Promise<Sudoku[]> {
    const entities = this.sudokuRepository.create(sudokus);
    return this.sudokuRepository.save(entities);
  }

  findAll(): Promise<Sudoku[]> {
    return this.sudokuRepository.find();
  }

  findOne(id: number): Promise<Sudoku | null> {
    return this.sudokuRepository.findOneBy({ id });
  }

  async findPage(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{
    data: Sudoku[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    const [data, total] = await this.sudokuRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { id: 'DESC' },
    });
    return { data, total, page, pageSize };
  }
  async findRandom(): Promise<Sudoku | null> {
    const total = await this.sudokuRepository.count();
    if (total === 0) return null;
    const randomOffset = Math.floor(Math.random() * total);
    console.log('Total sudokus:', total, 'Random offset:', randomOffset);
    const [randomSudoku] = await this.sudokuRepository.find({
      skip: randomOffset,
      take: 1,
    });
    return randomSudoku || null;
  }

  async update(
    id: number,
    dto: Partial<Pick<Sudoku, 'puzzle' | 'solution'>>,
  ): Promise<Sudoku | null> {
    const sudoku = await this.sudokuRepository.findOneBy({ id });
    if (!sudoku) return null;
    Object.assign(sudoku, dto);
    return this.sudokuRepository.save(sudoku);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.sudokuRepository.delete(id);
    return (result?.affected && result?.affected > 0) || false;
  }
}
