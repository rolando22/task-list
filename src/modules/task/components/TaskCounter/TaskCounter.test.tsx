import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';

import { TaskCounter } from '.';
import { tasksMock, userMock } from '@/mocksData/const';

const logoutMock = vi.fn();

vi.mock('@/context', () => ({
	useTasksContext: () => ({
		tasks: tasksMock,
	}),
	useUserContext: () => ({
		user: userMock,
	}),
}));

vi.mock('@/modules/auth/hooks/useLogout', () => ({
	useLogout: () => ({
		logout: logoutMock,
	}),
}));

describe('<TaskCounter />', () => {
	beforeEach(() => { 
		render(<TaskCounter />);
	});

	afterEach(() => { 
		cleanup();
		vi.clearAllMocks();
	});

	it('should render the TaskCounter component', () => {
		const userImage = screen.getByRole('img', { name: userMock.username });
		const userName = screen.getByText(userMock.username);
		const button = screen.getByRole('button', { name: /logout/i });
		const header = screen.getByText(/You have completed/i);
    
		expect(userImage).toBeInTheDocument();
		expect(userName).toBeInTheDocument();
		expect(button).toBeInTheDocument();
		expect(header).toBeInTheDocument();
	});
  
	it('should display the correct task counts', () => {
		const completed = tasksMock.reduce((total, task) => task.completed ? total += 1 : total, 0);
		const taskCompleted = screen.getByText(completed);
		const taskTotal = screen.getByText(tasksMock.length);

		expect(taskCompleted).toBeInTheDocument();
		expect(taskTotal).toBeInTheDocument();
	});
  
	it('should call the logout function when clicked', () => {
		const button = screen.getByRole('button', { name: /logout/i });

		act(() => { 
			fireEvent.click(button);
		});

		expect(logoutMock).toHaveBeenCalledTimes(1);
	});
  
	it('should display the user image and username', () => {
		const userImage = screen.getByRole('img', { name: userMock.username });
		const userName = screen.getByText(userMock.username);
    
		expect(userImage).toHaveAttribute('src', userMock.image);
		expect(userImage).toHaveAttribute('alt', userMock.username);
		expect(userName.textContent).toBe(userMock.username);
	});
});
