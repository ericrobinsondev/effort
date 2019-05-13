import { Router } from 'express';
import {
  createGroup,
  getGroup,
  updateGroup,
  getGroupWeek
} from './group.controller';

const router = Router();

// /api/group
router.route('/').post(createGroup);

// /api/group/ID
router.route('/:id').get(getGroup);
router.route('/:id').put(updateGroup);
router.route('/:id/report/').get(getGroupWeek);
router.route('/:id/report/:reportId').get(getGroupWeek);

export const groupRouter = router;
