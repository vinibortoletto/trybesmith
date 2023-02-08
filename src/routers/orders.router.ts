import { Router } from 'express';
import { OrderController } from '../controllers';
import { validateOrder, validateToken } from '../middleware';

const router = Router();
const orderController = new OrderController();

router.get('/', orderController.findAll);
router.post('/', validateToken, validateOrder, orderController.create);

export default router;