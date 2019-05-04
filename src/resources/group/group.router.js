import { Router } from 'express';
import { createGroup, getGroup, updateGroup } from './group.controller';

const router = Router();

// /api/group
router.route('/').post(createGroup);

// /api/group/ID
router.route('/:id').get(getGroup);
router.route('/:id').put(updateGroup);

export const groupRouter = router;
