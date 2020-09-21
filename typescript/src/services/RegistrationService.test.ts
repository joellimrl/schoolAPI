import * as RegServices from './RegistrationService';
import sequelize from '../config/database';

jest.mock('../config/database', () => {
  return {
    __esModule: true,
    default: {
      models: {
        Subjects: { findOrCreate: jest.fn() },
        Students: { findOrCreate: jest.fn() },
      },
    },
  };
});

describe('Registration Services Test', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('RegistrationServices', () => {
    const Subjects = sequelize.models.Subjects;
    const Students = sequelize.models.Students;
    const subjectsMock = jest.spyOn(Subjects, 'findOrCreate');
    const studentsMock = jest.spyOn(Students, 'findOrCreate');

    const sampleBody = {
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
    it('should complete updating database if no errors encountered', async () => {
      subjectsMock.mockImplementation(() => Promise.resolve(null));
      studentsMock.mockImplementation(() => Promise.resolve(null));

      await RegServices.RegistrationService(sampleBody);
      expect(studentsMock).toHaveBeenCalled();
      expect(subjectsMock).toHaveBeenCalled();
    });

    it('should throw error if there is an error in updating database', async () => {
      subjectsMock.mockImplementation(() =>
        Promise.reject(new Error('Database update failed'))
      );
      studentsMock.mockImplementation(() => Promise.resolve(null));

      try {
        await RegServices.RegistrationService(sampleBody);
      } catch (e) {
        expect(e.message).toBe('Database update failed');
      }
    });
  });
});
