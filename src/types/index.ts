import type { User } from '@/modules/auth/types';
import type { Task } from '@/modules/task/types';

export type TasksState = Task[];

export type TasksTypeAction = 
  | { type: 'SET_TASKS', payload: TasksState }
  | { type: 'ADD_TASK', payload: Task }
  | { type: 'EDIT_TASK', payload: Task }
  | { type: 'REMOVE_TASK', payload: Task['id'] }
  | { type: 'RESET_TASKS', payload: null }
    

export interface UserState extends User {
  token: string
}

export type UserTypeAction = 
  | { type: 'LOGIN', payload: UserState }
  | { type: 'LOGOUT', payload: null }
