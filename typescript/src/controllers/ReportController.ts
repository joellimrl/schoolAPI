import { RequestHandler } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { WorkloadService } from '../services/ReportServices';
import Logger from '../config/logger';

const LOG = new Logger('RegistrationService.ts');

export const WorkloadController: RequestHandler = async (_req, res) => {
  try {
    LOG.info('START');
    const response = await WorkloadService();
    LOG.info('Workload Report complete');
    LOG.info('END');
    return res.send(response);
  } catch (e) {
    LOG.info('Workload Report failed');
    return res.sendStatus(INTERNAL_SERVER_ERROR);
  }
};
