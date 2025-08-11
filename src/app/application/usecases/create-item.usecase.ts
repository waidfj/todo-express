import { ItemRequestDto } from '@application/dtos/request/item.request.dto';
import { ItemResponseDto } from '@application/dtos/response/item.response.dto';
import { DtoValidator } from '@application/dtos/validation/dto.validator';
import { BadRequestError } from '@application/errors/bad-request.error';
import { ItemTransformer } from '@application/transformers/item.transformer';
import { ItemRepository } from '@infrastructure/repositories/items.repository';
import { NextFunction, Request, Response } from 'express';

export class CreateItemUsecase {
  static async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // managing request
      const requestDto = new ItemRequestDto(req.body);
      await DtoValidator.validateDto(requestDto);

      const item = ItemTransformer.createModel(requestDto);

      // implementing method
      const savedItem = await ItemRepository.save(item);

      // managing response
      const responseDto = ItemResponseDto.createFromModel(savedItem);
      res.status(201).json(responseDto);
    } catch (error: any) {
      if (error instanceof BadRequestError) return next(error);

      throw new Error(error.message);
    }
  }
}
