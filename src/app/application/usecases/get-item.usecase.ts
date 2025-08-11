import { IdRequestDto } from '@application/dtos/request/id.request.dto';
import { ItemResponseDto } from '@application/dtos/response/item.response.dto';
import { DtoValidator } from '@application/dtos/validation/dto.validator';
import { BadRequestError } from '@application/errors/bad-request.error';
import { NotFoundError } from '@application/errors/not-found.error';
import { ItemRepository } from '@infrastructure/repositories/items.repository';
import { NextFunction, Request, Response } from 'express';

export class GetItemUsecase {
  static async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // managing request
      const idDto = new IdRequestDto(req.params);
      await DtoValidator.validateDto(idDto);
      const { id } = idDto;

      // implementing method
      const item = await ItemRepository.getOneById(id);
      if (!item) throw new NotFoundError('No item with this id exists');

      // managing response
      const responseDtos = ItemResponseDto.createFromModel(item);
      res.status(200).json(responseDtos);
    } catch (error: any) {
      if (error instanceof BadRequestError || error instanceof NotFoundError) return next(error);

      throw new Error(error.message);
    }
  }
}
