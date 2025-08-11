import { IdRequestDto } from '@application/dtos/request/id.request.dto';
import { ItemRequestDto } from '@application/dtos/request/item.request.dto';
import { ItemResponseDto } from '@application/dtos/response/item.response.dto';
import { DtoValidator } from '@application/dtos/validation/dto.validator';
import { BadRequestError } from '@application/errors/bad-request.error';
import { NotFoundError } from '@application/errors/not-found.error';
import { ItemTransformer } from '@application/transformers/item.transformer';
import { ItemRepository } from '@infrastructure/repositories/items.repository';
import { NextFunction, Request, Response } from 'express';

export class UpdateItemUsecase {
  static async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // managing request
      const idDto = new IdRequestDto(req.params);
      await DtoValidator.validateDto(idDto);
      const { id } = idDto;

      const requestDto = new ItemRequestDto(req.body);
      await DtoValidator.validateDto(requestDto);
      const item = ItemTransformer.createModel(requestDto);

      // implementing method
      const updatedItem = await ItemRepository.updateOneById(id, item);
      if (!updatedItem) throw new NotFoundError('No item with this id exists');

      // managing response
      const responseDto = ItemResponseDto.createFromModel(updatedItem);
      res.status(200).json(responseDto);
    } catch (error: any) {
      if (error instanceof BadRequestError || error instanceof NotFoundError) return next(error);

      throw new Error(error.message);
    }
  }
}
