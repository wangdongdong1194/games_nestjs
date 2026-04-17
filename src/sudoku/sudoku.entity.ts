import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Sudoku {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  puzzle!: string;

  @Column('text')
  solution!: string;
}
