import { query } from '../config/database';

export class ProductRepository {

  async addProduct(name: string, price: number): Promise<{ id: number; name: string; price: number }> {
    const procedure = 'CALL AddProduct(?, ?)';
    const values = [name, price];
    
    try {
      const results = await query(procedure, values);
      const insertedId = results[0][0].insertedId;
      const insertedProduct = { id: insertedId, name, price };
      return insertedProduct;
    } catch (error) {
      throw error;
    }
  }

  async getProducts(): Promise<{ id: number; name: string; price: number }[]> {
    const results = await query('SELECT * FROM danh_muc');
    return results;
  }
}
