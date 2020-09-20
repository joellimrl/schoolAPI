// Type for Registration API Request
export interface Registration {
  teacher: Teacher;
  students: Student[];
  subject: Subject;
  class: Class;
}

interface Class {
  classCode: string;
  name: string;
}

interface Subject {
  subjectCode: string;
  name: string;
}

interface Teacher {
  name: string;
  email: string;
}

interface Student {
  name: string;
  email: string;
}

// Type for Workload API response
export interface Workload {
  [key: string]: Array<SubjectCount>;
}

interface SubjectCount {
  subjectCode: string;
  subjectName: string;
  numberOfClasses: number;
}
