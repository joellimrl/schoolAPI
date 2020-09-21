import { RequestHandler } from 'express';
import { body, ValidationChain, validationResult } from 'express-validator';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
} from 'http-status-codes';
import Logger from '../config/logger';
import { RegistrationService } from '../services/RegistrationService';

const LOG = new Logger('RegistrationController.ts');
export const RegistrationController: RequestHandler = async (req, res) => {
  LOG.info('START');

  // Sanitize input
  const errors = validationResult(req);
  console.log('RegistrationController:RequestHandler -> errors', errors);
  if (!errors.isEmpty()) {
    LOG.error('Validation failed');
    return res.status(BAD_REQUEST).json({ errors: errors.array() });
  }
  LOG.info('Validation passed');

  try {
    await RegistrationService(req.body);
    LOG.info('Registration complete');
    LOG.info('END');
    return res.sendStatus(NO_CONTENT);
  } catch (e) {
    LOG.error('Registration failed');
    return res.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export const RegistrationControllerValidator = (): Array<ValidationChain> => {
  return [
    body('teacher.name').isString(),
    body('teacher.email').isEmail(),
    body('students').isArray(),
    body('students.*.name').isString(),
    body('students.*.email').isEmail(),
    body('subject.subjectCode').isString(),
    body('subject.name').isString(),
    body('class.classCode').isString(),
    body('class.name').isString(),
  ];
};
