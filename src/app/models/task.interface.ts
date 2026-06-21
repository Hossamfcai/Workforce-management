export interface Task {
  id: string;
  name: string;
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assignedEmployeeId: string;
}
