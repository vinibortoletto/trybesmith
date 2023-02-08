import { Router } from 'express';
import { UserController } from '../controllers';
import { validateUser } from '../middleware';

const router = Router();
const userController = new UserController();

router.post('/', validateUser, userController.create);

export default router;