import { ItemRequestDto } from '@application/dtos/request/item.request.dto';
import { Item } from '@domain/models/item';

export class ItemTransformer {
  static createModel(dto: ItemRequestDto): Item {
    const item = new Item();

    item.name = dto.name;
    item.description = dto.description;

    return item;
  }
}
