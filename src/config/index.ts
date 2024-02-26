import express from 'express';
import bodyParser from 'body-parser';
import { ProductController } from '../controllers/ProductController';

const app = express();
const port = 3000;

app.use(bodyParser.json());

const productController = new ProductController();

app.post('/api/products', (req, res) => productController.addProduct(req, res));

// ... (các import và cấu hình khác)

app.get('/api/products', (req, res) => productController.getProducts(req, res));

// ... (các đoạn mã khác)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
