import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';
import { RegistrationController } from './controllers/RegistrationController';
import { WorkloadController } from './controllers/ReportController';

const router = Express.Router();

router.use('/', HealthcheckController);

router.post('/registration', RegistrationController);

router.get('/reports/workload', WorkloadController);

export default router;
