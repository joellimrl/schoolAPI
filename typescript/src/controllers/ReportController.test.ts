import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { mockResponse, mockRequest } from '../utils/mockUtils';
import * as ReportController from './ReportController';
import * as ReportServices from '../services/ReportServices';

describe('Report Controller Test', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('ReportController', () => {
    const ReportServiceMock = jest.spyOn(ReportServices, 'WorkloadService');

    it('should return Workload JSON response if no errors encountered', async () => {
      const sampleResponse = {
        'Teacher 1': [
          {
            subjectCode: 'ENG',
            subjectName: 'English',
            numberOfClasses: 1,
          },
        ],
      };

      const req = mockRequest();
      const res = mockResponse();
      ReportServiceMock.mockImplementation(() =>
        Promise.resolve(sampleResponse)
      );

      await ReportController.WorkloadController(req, res, null);
      expect(res.send).toBeCalledWith(sampleResponse);
    });

    it('should return INTERNAL_SERVER_ERROR response if there is an error', async () => {
      ReportServiceMock.mockImplementation(() => Promise.reject());

      const req = mockRequest();
      const res = mockResponse();

      await ReportController.WorkloadController(req, res, null);
      expect(res.sendStatus).toBeCalledWith(INTERNAL_SERVER_ERROR);
    });
  });
});
