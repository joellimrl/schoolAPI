import { Workload } from 'Types';
import Logger from '../config/logger';
import sequelize from '../config/database';

const LOG = new Logger('RegistrationService.ts');
export const WorkloadService = async (): Promise<Workload> => {
  try {
    const Subjects = sequelize.models.Subjects;
    const subjects = await Subjects.findAll();

    const response: Workload = {};
    // Transform data to required output format
    subjects.forEach((entry) => {
      const teacherName = entry.getDataValue('teacherName');
      const subjectName = entry.getDataValue('subjectName');
      const subjectCode = entry.getDataValue('subjectCode');

      if (response[teacherName]) {
        const index = response[teacherName].findIndex(
          (element) => element.subjectCode === subjectCode
        );
        if (index > -1) {
          response[teacherName][index].numberOfClasses += 1;
        } else {
          response[teacherName].push({
            subjectCode: subjectCode,
            subjectName: subjectName,
            numberOfClasses: 1,
          });
        }
      } else {
        response[teacherName] = [
          {
            subjectCode: subjectCode,
            subjectName: subjectName,
            numberOfClasses: 1,
          },
        ];
      }
    });
    return response;
  } catch (e) {
    LOG.error(`Error: ${e}`);
    throw e;
  }
};
