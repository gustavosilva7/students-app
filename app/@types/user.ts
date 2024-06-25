type User = {
  id: number;
  name: string;
  email: string;
  role_id: number;
  image: string;
  active: boolean;
  student_profile?: Student;
};

type Student = {
  id: number;
  class: number;
  serie: number;
};
