import { INTERNAL_SERVER_ERROR, NO_CONTENT } from 'http-status-codes';
import { mockResponse, mockRequest } from '../utils/mockUtils';
import * as RegController from './RegistrationController';
import * as RegServices from '../services/RegistrationService';

describe('Registration Controller Test', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('RegistrationController', () => {
    const RegServiceMock = jest.spyOn(RegServices, 'RegistrationService');

    it('should return NO_CONTENT response if no errors encountered', async () => {
      RegServiceMock.mockImplementation(() => Promise.resolve());
      const sampleRequest = {
        teacher: {
          name: 'Teacher 1',
          email: 'teacher1@gmail.com',
        },
        students: [
          {
            name: 'Student 1',
            email: 'student1@gmail.com',
          },
          {
            name: 'Student 2',
            email: 'student2@gmail.com',
          },
        ],
        subject: {
          subjectCode: 'ENG',
          name: 'English',
        },
        class: {
          classCode: 'P1-1',
          name: 'P1 Integrity',
        },
      };

      const req = mockRequest();
      req.params = sampleRequest;

      const res = mockResponse();

      await RegController.RegistrationController(req, res, null);
      expect(res.sendStatus).toBeCalledWith(NO_CONTENT);
    });

    it('should return INTERNAL_SERVER_ERROR response if there is an error', async () => {
      RegServiceMock.mockImplementation(() => Promise.reject());

      const req = mockRequest();
      const res = mockResponse();

      await RegController.RegistrationController(req, res, null);
      expect(res.sendStatus).toBeCalledWith(INTERNAL_SERVER_ERROR);
    });
  });
});
