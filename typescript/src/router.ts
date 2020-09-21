import Express from 'express';
import globalErrorHandler from './config/globalErrorHandler';
import HealthcheckController from './controllers/HealthcheckController';
import {
  RegistrationController,
  RegistrationControllerValidator,
} from './controllers/RegistrationController';
import { WorkloadController } from './controllers/ReportController';

const router = Express.Router();

router.use('/', HealthcheckController);

router.post(
  '/registration',
  RegistrationControllerValidator(),
  globalErrorHandler,
  RegistrationController
);

router.get('/reports/workload', globalErrorHandler, WorkloadController);

export default router;
