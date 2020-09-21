import * as ReportServices from './ReportServices';
import sequelize from '../config/database';
import SequelizeMock from 'sequelize-mock';

const DBConnectionMock = new SequelizeMock();

jest.mock('../config/database', () => {
  return {
    __esModule: true,
    default: {
      models: {
        Subjects: { findAll: jest.fn() },
        Students: { findAll: jest.fn() },
      },
    },
  };
});

describe('Report Services Test', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('ReportServices', () => {
    const Subjects = sequelize.models.Subjects;
    const subjectsMock = jest.spyOn(Subjects, 'findAll');
    const SubjectsDBMock = DBConnectionMock.define(
      'Subjects',
      {
        teacherName: 'Teacher 1',
        teacherEmail: 'teacher1@gmail.com',
        subjectCode: 'ENG',
        classCode: 'P1-1',
        subjectName: 'English',
        className: 'P1 Integrity',
      },
      {
        instanceMethods: {
          getDataValue: function (value: string) {
            return this.get(value);
          },
        },
      }
    );

    const sampleResponse = {
      'Teacher 1': [
        {
          subjectCode: 'ENG',
          subjectName: 'English',
          numberOfClasses: 1,
        },
      ],
    };

    it('should complete updating database if no errors encountered', async () => {
      subjectsMock.mockImplementation(() =>
        Promise.resolve(SubjectsDBMock.findAll())
      );

      const response = await ReportServices.WorkloadService();
      expect(response).toStrictEqual(sampleResponse);
    });

    it('should throw error if there is an error in updating database', async () => {
      subjectsMock.mockImplementation(() =>
        Promise.reject(new Error('Database query failed'))
      );

      try {
        await ReportServices.WorkloadService();
      } catch (e) {
        expect(e.message).toBe('Database query failed');
      }
    });
  });
});
