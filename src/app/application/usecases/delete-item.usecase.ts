import { NextFunction, Request, Response } from 'express';
import { ItemRepository } from '@infrastructure/repositories/items.repository';
import { IdRequestDto } from '@application/dtos/request/id.request.dto';
import { DtoValidator } from '@application/dtos/validation/dto.validator';
import { NotFoundError } from '@application/errors/not-found.error';
import { BadRequestError } from '@application/errors/bad-request.error';

export class DeleteItemUsecase {
  static async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // managing request
      const idDto = new IdRequestDto(req.params);
      await DtoValidator.validateDto(idDto);
      const { id } = idDto;

      // implementing method
      const result = await ItemRepository.deleteOneById(id);
      if (!result) throw new NotFoundError('No item with this id exists');

      // managing response
      res.status(204).json();
    } catch (error: any) {
      if (error instanceof BadRequestError || error instanceof NotFoundError) return next(error);

      throw new Error(error.message);
    }
  }
}
