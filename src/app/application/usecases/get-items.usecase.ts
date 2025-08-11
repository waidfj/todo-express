import { ItemResponseDto } from '@application/dtos/response/item.response.dto';
import { ItemRepository } from '@infrastructure/repositories/items.repository';
import { NextFunction, Request, Response } from 'express';

export class GetItemsUsecase {
  static async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    // implementing method
    const items = await ItemRepository.getAll();

    // managing response
    const responseDtos = items.map((item) => ItemResponseDto.createFromModel(item));
    res.status(200).json(responseDtos);
  }
}
