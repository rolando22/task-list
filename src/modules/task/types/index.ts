import { InferType } from 'yup';

import type { User } from '@/modules/auth/types';
import type { CreateTaskSchema } from '@/modules/task/schemas';

export interface Task {
  id: string
  title: string 
  description: string
  completed: boolean 
  createdAt?: string
  updatedAt?: string
  userId?: User['id']
}

export interface CreateTaskDTO extends InferType<typeof CreateTaskSchema> { }

export interface TaskFilters {
  completed: '' | 'completed' | 'pending'
}
