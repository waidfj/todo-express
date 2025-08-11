import { query } from '@db/index';
import { Item } from '@domain/models/item';
import { ItemMapper } from '@infrastructure/mappers/items.mapper';

export class ItemRepository {
  private constructor() {}

  static async save(item: Item): Promise<Item> {
    const createdItem = await query(
      'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
      ItemMapper.mapFromModel(item),
    );

    return ItemMapper.mapToModel(createdItem.rows[0]);
  }

  static async getAll(): Promise<Array<Item>> {
    const items = await query('SELECT * FROM items');

    return items.rows.map((item) => ItemMapper.mapToModel(item));
  }

  static async getOneById(id: number): Promise<Item | null> {
    const item = await query('SELECT * FROM items WHERE id = $1', [id]);

    if (!item.rowCount) return null;

    return ItemMapper.mapToModel(item.rows[0]);
  }

  static async updateOneById(id: number, item: Item): Promise<Item | null> {
    const updatedItem = await query(
      'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      ItemMapper.mapFromModel(item, id),
    );

    if (!updatedItem.rowCount) return null;

    return ItemMapper.mapToModel(updatedItem.rows[0]);
  }

  static async deleteOneById(id: number): Promise<Boolean> {
    const deletedItems = await query('DELETE FROM items WHERE id = ($1)', [id]);

    if (!deletedItems.rowCount) return false;

    return true;
  }
}
