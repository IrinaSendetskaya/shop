import { Product } from "./product";
import { Category } from "./category";

export class ProductModel implements Product {
  constructor(
    public id?: number,
    public name: string = "",
    public description: string = "",
    public price: number = 0,
    public category: Category = Category.CAT,
    public isAvailable: boolean = true
  ) {
    this.id = id || 1;
  }
}
