import { ProductRepository } from '../repositories/ProductRepository';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async addProduct(name: string, price: number): Promise<{ id: number; name: string; price: number }> {
    // Thực hiện các xử lý nghiệp vụ và gọi phương thức tương ứng trong Repository
    const product = await this.productRepository.addProduct(name, price);
    return product;
  }

  async getProducts(): Promise<{ id: number; name: string; price: number }[]> {
    // Gọi phương thức tương ứng trong Repository để lấy danh sách sản phẩm
    const products = await this.productRepository.getProducts();
    return products;
  }
}
