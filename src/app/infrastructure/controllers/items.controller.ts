import { CreateItemUsecase } from '@application/usecases/create-item.usecase';
import { DeleteItemUsecase } from '@application/usecases/delete-item.usecase';
import { GetItemUsecase } from '@application/usecases/get-item.usecase';
import { GetItemsUsecase } from '@application/usecases/get-items.usecase';
import { UpdateItemUsecase } from '@application/usecases/update-item.usecase';
import { NextFunction, Request, Response } from 'express';

export class ItemsController {
  static async create(req: Request, res: Response, next: NextFunction) {
    await CreateItemUsecase.execute(req, res, next);
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    await GetItemsUsecase.execute(req, res, next);
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    await GetItemUsecase.execute(req, res, next);
  }

  static async updateOne(req: Request, res: Response, next: NextFunction) {
    await UpdateItemUsecase.execute(req, res, next);
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    await DeleteItemUsecase.execute(req, res, next);
  }
}
