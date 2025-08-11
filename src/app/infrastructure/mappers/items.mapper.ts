import { Item } from '@domain/models/item';

export class ItemMapper {
  static mapToModel(createdItem: any): Item {
    const item = new Item();

    item.id = createdItem.id;
    item.name = createdItem.name;
    item.description = createdItem.description;
    item.created_at = createdItem.created_at;

    return item;
  }

  static mapFromModel(item: Item, id?: number) {
    return id ? [item.name, item.description, id] : [item.name, item.description];
  }
}
