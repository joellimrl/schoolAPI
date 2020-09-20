import { RequestHandler } from 'express';
import { INTERNAL_SERVER_ERROR, NO_CONTENT } from 'http-status-codes';
import Logger from '../config/logger';
import { RegistrationService } from '../services/RegistrationService';

const LOG = new Logger('RegistrationController.ts');
export const RegistrationController: RequestHandler = async (req, res) => {
  // LOG.info('Registration Controller started');
  // TODO Sanitize input, return 400 otherwise
  try {
    await RegistrationService(req.body);
    return res.sendStatus(NO_CONTENT);
  } catch (e) {
    return res.sendStatus(INTERNAL_SERVER_ERROR);
  }
};
