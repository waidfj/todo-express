import { Item } from '../../../domain/models/item';

/**
 * @swagger
 * components:
 *   response-dtos:
 *     ItemResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The id assigned to the item
 *         name:
 *           type: string
 *           description: The name that refers to the task
 *         description:
 *           type: string
 *           description: More details about the task
 *       example:
 *         id: 1
 *         name: Brush teeth
 *         description: Brush teeth for 15 minutes
 */

export class ItemResponseDto {
  public id: string;
  public name: string;
  public description: string;
  public created_at: Date;

  private constructor() {}

  static createFromModel(item: Item): ItemResponseDto {
    const responseDto = new ItemResponseDto();

    responseDto.id = item.id;
    responseDto.name = item.name;
    responseDto.description = item.description;
    responseDto.created_at = item.created_at;

    return responseDto;
  }
}
