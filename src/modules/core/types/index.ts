import type { Task } from '@/modules/task/types';

export interface ToggleModal {
  taskId?: Task['id']
  type: 'new' | 'edit'
  open: boolean
}
