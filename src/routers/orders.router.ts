import { Router } from 'express';
import { OrderController } from '../controllers';

const router = Router();
const orderController = new OrderController();

router.get('/', orderController.findAll);

export default router;