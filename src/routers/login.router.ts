import { Router } from 'express';
import { UserController } from '../controllers';
import { validateLogin } from '../middleware';

const router = Router();
const userController = new UserController();

router.post('/', validateLogin, userController.login);

export default router;