import Logger from '../config/logger';
import sequelize from '../config/database';
import { Registration } from '../types/Types';

const LOG = new Logger('RegistrationService.ts');
export const RegistrationService = async (
  body: Registration
): Promise<void> => {
  LOG.info('START');
  try {
    LOG.info('Updating SUBJECTS Table');
    const Subjects = sequelize.models.Subjects;
    // Use findOrCreate to prevent duplicates
    await Subjects.findOrCreate({
      where: {
        teacherName: body.teacher.name,
        teacherEmail: body.teacher.email,
        subjectCode: body.subject.subjectCode,
        classCode: body.class.classCode,
        subjectName: body.subject.name,
        className: body.class.name,
      },
    });

    // If this update fails and throws error, Subjects table will still be updated (to take note)
    LOG.info('Updating STUDENTS Table');
    const { students } = body;
    const Students = sequelize.models.Students;
    for (let i = 0; i < students.length; i++) {
      await Students.findOrCreate({
        where: {
          name: students[i].name,
          email: students[i].email,
          subjectCode: body.subject.subjectCode,
          classCode: body.class.classCode,
        },
      });
    }
    LOG.info('END');
  } catch (e) {
    LOG.error(`Error: ${e}`);
    throw e;
  }
};
