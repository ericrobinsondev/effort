import { Router } from 'express';
import {
  createReport,
  updateReport,
  getReport,
  getCurrentReport
} from './report.controller';
import {
  createResponse,
  updateResponse,
  getAllResponses,
  getResponse
} from '../response/response.controller';

const router = Router();

// /api/report
router.route('/').post(createReport);

// /api/report/ID

router.route('/:id').get(getReport);
router.route('/:id').put(updateReport);

// /api/report/ID/response
router.route('/:id/response').post(createResponse);
router.route('/:id/response/:responseID').put(updateResponse);
router.route('/:id/response').get(getAllResponses);
router.route('/:id/response/my').get(getResponse);

export const reportRouter = router;
