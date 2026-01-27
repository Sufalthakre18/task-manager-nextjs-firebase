export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  userId: string;
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}