import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import * as crypto from 'crypto';
import { SudokuService } from './sudoku.service';

@Controller('api/sudoku')
export class SudokuController {
  private readonly sign: string;
  constructor(private readonly sudokuService: SudokuService) {
    this.sign = crypto.createHash('md5').update('sudoku').digest('hex');
    console.log('生成的 sign:', this.sign);
  }

  @Post('new')
  async create(@Body() ks: { puzzle: string; solution: string }[]) {
    console.log('批量创建参数:', ks);
    for (const k of ks) {
      if (!k.puzzle || !k.solution) {
        throw new Error('每个数独必须包含 puzzle 和 solution 字段');
      }
      if (k.puzzle.length !== 81 || k.solution.length !== 81) {
        throw new Error('puzzle 和 solution 字段必须是长度为 81 的字符串');
      }
    }
    return this.sudokuService.createMany(ks);
  }

  @Get('page')
  async findPage(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
    @Query('sign') sign = '',
  ) {
    console.log('分页查询参数:', { page, pageSize, sign });
    if (sign !== this.sign) {
      throw new Error('无效的 sign 参数');
    }
    return this.sudokuService.findPage(Number(page), Number(pageSize));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('sign') sign = '') {
    console.log('查询单个数独参数:', { id, sign });
    if (sign !== this.sign) {
      throw new Error('无效的 sign 参数');
    }
    return this.sudokuService.findOne(Number(id));
  }

  @Get()
  async findOneRandom() {
    return this.sudokuService.findRandom();
  }

  @Post('update/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<{ puzzle: string; solution: string }>,
    @Query('sign') sign = '',
  ) {
    console.log('更新数独参数:', { id, ...dto, sign });
    if (sign !== this.sign) {
      throw new Error('无效的 sign 参数');
    }
    if (!dto.puzzle && !dto.solution) {
      throw new Error('至少提供 puzzle 或 solution 字段进行更新');
    }
    if (dto.puzzle && dto.puzzle.length !== 81) {
      throw new Error('puzzle 字段必须是长度为 81 的字符串');
    }
    if (dto.solution && dto.solution.length !== 81) {
      throw new Error('solution 字段必须是长度为 81 的字符串');
    }
    return this.sudokuService.update(Number(id), dto);
  }

  @Get('del/:id')
  async remove(
    @Param() params: { id: string; sign: string },
    @Query('sign') sign = '',
  ) {
    console.log('删除数独参数:', { id: params.id, sign: params.sign });
    if (sign !== this.sign) {
      throw new Error('无效的 sign 参数');
    }
    return this.sudokuService.remove(Number(params.id));
  }
}
