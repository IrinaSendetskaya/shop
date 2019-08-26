import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ProductsServicesModule } from "../products-services.module";
import { ProductModel } from "../models/product.model";
import { Category } from "../models/category";

const productList = [
  new ProductModel(1, "phone 2", "sdgdfhd", 12, Category.MOBILE, true),
  new ProductModel(1, "phone 2", "ssgfsgbgdfhd", 123, Category.CAR, true),
  new ProductModel(3, "joy 3", "gdbsdngd", 44, Category.CHILDREN, false)
];
const productListPromise = Promise.resolve(productList);
@Injectable({
  providedIn: ProductsServicesModule
})
export class ProductsService {
  productUrl = "../../assets/mock-data/products.json";

  constructor(private http: HttpClient) {}

  getAllProducts(): Promise<ProductModel[]> {
    return productListPromise;
  }

  getProductById(id: number | string): Promise<ProductModel> {
    return this.getAllProducts()
      .then(products => products.find(product => product.id === +id))
      .catch(() => Promise.reject("Error in getProduct method"));
  }

  createProduct(product: ProductModel): void {
    productList.push(product);
  }

  updateProduct(product: ProductModel): void {
    const i = productList.findIndex(p => p.id === product.id);

    if (i > -1) {
      productList.splice(i, 1, product);
    }
  }

  deleteProduct(product: ProductModel): void {
    const i = productList.findIndex(p => p.id === product.id);

    if (i > -1) {
      productList.splice(i, 1);
    }
  }
}
