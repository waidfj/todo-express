import { IsNotEmpty, IsString } from 'class-validator';

/**
 * @swagger
 * components:
 *   request-dtos:
 *     ItemRequestDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name that refers to the task
 *         description:
 *           type: string
 *           description: More details about the task
 *       example:
 *         name: Brush teeth
 *         description: Bruch teeth for 15 minutes
 */

export class ItemRequestDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  constructor(body: any) {
    const { name, description } = body;

    this.name = name;
    this.description = description;
  }
}
