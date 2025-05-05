import type { Task } from '@/modules/task/types';
import type { UserState } from '@/types';

export const userMock: UserState = {
	id: 'user1',
	firstName: 'John',
	lastName: 'Doe',
	email: 'john.doe@example.com',
	username: 'johndoe',
	image: 'https://example.com/images/johndoe.png',
	token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
};

export const tasksMock: Task[] = [
	{
		id: '1',
		title: 'Buy groceries',
		description: 'Milk, Bread, Eggs, and Fruits',
		completed: false,
		createdAt: '2025-05-01T10:00:00Z',
		updatedAt: '2025-05-02T12:00:00Z',
		userId: 'user1',
	},
	{
		id: '2',
		title: 'Complete project report',
		description: 'Finalize and submit the project report by EOD',
		completed: true,
		createdAt: '2025-04-28T08:30:00Z',
		updatedAt: '2025-04-30T15:45:00Z',
		userId: 'user2',
	},
	{
		id: '3',
		title: 'Schedule meeting with team',
		description: 'Discuss project milestones and deadlines',
		completed: false,
		createdAt: '2025-05-03T09:15:00Z',
		updatedAt: '2025-05-03T09:15:00Z',
		userId: 'user1',
	},
];
