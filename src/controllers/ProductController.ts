import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  async addProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, price } = req.body;
      const result = await this.productService.addProduct(name, price);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
