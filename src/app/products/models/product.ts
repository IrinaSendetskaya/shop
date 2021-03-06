import { Category } from 'src/app/products/models/category';

export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    category: Category;
    isAvailable: boolean;
}
