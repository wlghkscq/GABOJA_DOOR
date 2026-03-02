import productsData from '../data/products.json';
import advantagesData from '../data/advantages.json';
import { Product, Advantage } from '../types';

class ProductService {
  private products: Product[] = productsData as Product[];
  private advantages: Advantage[] = advantagesData as Advantage[];

  // 조회 (Read)
  getProducts(): Product[] {
    return this.products;
  }

  getAdvantages(): Advantage[] {
    return this.advantages;
  }

  // 추가 (Create)
  addProduct(product: Product): void {
    this.products.push(product);
    console.log('Product added locally. To persist, update products.json.');
  }

  // 수정 (Update)
  updateProduct(id: string, updatedProduct: Partial<Product>): void {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
    }
  }

  // 삭제 (Delete)
  deleteProduct(id: string): void {
    this.products = this.products.filter(p => p.id !== id);
  }
}

export const productService = new ProductService();
