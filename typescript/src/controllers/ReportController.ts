import { RequestHandler } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { WorkloadService } from '../services/ReportServices';

export const WorkloadController: RequestHandler = async (_req, res) => {
  try {
    const response = await WorkloadService();
    return res.send(response);
  } catch (e) {
    return res.sendStatus(INTERNAL_SERVER_ERROR);
  }
};
