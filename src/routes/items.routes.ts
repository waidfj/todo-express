import { ItemsController } from '@infrastructure/controllers/items.controller';
import { Router } from 'express';

const itemsRouter = Router();

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create new item.
 *     description: Add a new item to the todo list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/request-dtos/ItemRequestDto'
 *     responses:
 *       '201':
 *         description: Item was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response-dtos/ItemResponseDto'
 *       '400':
 *         description: Bad request, some data might be wrong
 *       '500':
 *         description: Internal server error
 */
itemsRouter.post('/', ItemsController.create);

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get items.
 *     description: Get all items stored in the list.
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/response-dtos/ItemResponseDto'
 *       '500':
 *         description: Internal server error
 */
itemsRouter.get('/', ItemsController.getAll);

// fix documentation

/**
 * @swagger
 * /items/:id:
 *   get:
 *     summary: Get an item.
 *     description: Get an item stored in the list by its id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Item ID
 *         schema:
 *           $ref: '#/components/request-dtos/IdRequestDto'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response-dtos/ItemResponseDto'
 *       '400':
 *         description: Something is wrong in the request
 *       '404':
 *         description: Item was not found
 *       '500':
 *         description: Internal server error
 */
itemsRouter.get('/:id', ItemsController.getOne);

/**
 * @swagger
 * /items:
 *   put:
 *     summary: Update an item.
 *     description: Update an item stored in the list by its id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Item ID
 *         schema:
 *           $ref: '#/components/request-dtos/IdRequestDto'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/request-dtos/ItemRequestDto'
 *     responses:
 *       '200':
 *         description: Item was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response-dtos/ItemResponseDto'
 *       '400':
 *         description: Something is wrong with the request
 *       '404':
 *         description: Item was not found
 *       '500':
 *         description: Internal server error
 */
itemsRouter.put('/:id', ItemsController.updateOne);

/**
 * @swagger
 * /items:
 *   delete:
 *     summary: Delete an item.
 *     description: Delete an item stored in the list by its id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Item ID
 *         schema:
 *           $ref: '#/components/request-dtos/IdRequestDto'
 *     responses:
 *       '204':
 *         description: Item was deleted successfully
 *       '400':
 *         descriptioin: Something is wrong in the request
 *       '404':
 *         description: Item was not found
 *       '500':
 *         description: Internal server error
 */
itemsRouter.delete('/:id', ItemsController.delete);

export default itemsRouter;
