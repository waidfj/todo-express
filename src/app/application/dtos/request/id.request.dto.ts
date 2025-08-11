import { IsInt, IsNotEmpty, Min } from 'class-validator';

/**
 * @swagger
 * components:
 *   request-dtos:
 *     IdRequestDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The id of the item
 *           example: 1
 *       required:
 *         - id
 */

export class IdRequestDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;

  constructor(content: any) {
    const { id } = content;

    this.id = parseInt(id);
  }
}
