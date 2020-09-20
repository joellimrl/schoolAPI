import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Logger from '../config/logger';

const LOG = new Logger('DBUtils.ts');
export const DBUtils = async (): Promise<void> => {
  try {
    // const Teachers = sequelize.define('Teachers', {
    //   name: {
    //     type: DataTypes.STRING,
    //   },
    //   email: {
    //     type: DataTypes.STRING,
    //   },
    // });

    // Define STUDENTS table in DB
    // Each row contains a student entry
    // There can be multiple entries for the same student due to multiple subjects
    sequelize.define('Students', {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      subjectCode: {
        type: DataTypes.STRING,
      },
      classCode: {
        type: DataTypes.STRING,
      },
    });

    // Define SUBJECTS table in DB
    // Each row contains a subject and the related class along with teacher.
    // There can be multiple teachers for each subject
    sequelize.define('Subjects', {
      teacherName: {
        type: DataTypes.STRING,
      },
      teacherEmail: {
        type: DataTypes.STRING,
      },
      subjectCode: {
        type: DataTypes.STRING,
      },
      classCode: {
        type: DataTypes.STRING,
      },
      subjectName: {
        type: DataTypes.STRING,
      },
      className: {
        type: DataTypes.STRING,
      },
    });

    await sequelize.sync();
    LOG.info('All models were synchronized successfully.');
  } catch (e) {
    LOG.error(`Unable to sync: ${e}`);
  }
};
