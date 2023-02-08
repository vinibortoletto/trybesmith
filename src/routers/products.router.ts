import { Router } from 'express';
import { ProductController } from '../controllers';
import { validateProducts } from '../middleware';

const router = Router();
const productController = new ProductController();

router.post('/', validateProducts, productController.create);
router.get('/', productController.findAll);

export default router;