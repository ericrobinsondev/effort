import { Router } from 'express';
import { createMinistry, updateMinistry } from './ministry.controller';

const router = Router();

// /api/ministry
router.route('/').post(createMinistry);

// /api/ministry/ID
router.route('/:id').put(updateMinistry);

export const ministryRouter = router;
