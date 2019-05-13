import { Router } from 'express';
import { getUser } from './user.controller';

const router = Router();

// /api/user/ID
router.route('/:id').get(getUser);

export const userRouter = router;
