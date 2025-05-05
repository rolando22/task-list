import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import * as ContextModule from '@/context';
import { TaskList } from '.';
import { tasksMock } from '@/mocksData/const';

const onMutateDeleteTaskMock = vi.fn();
const onMutateToggleCompletedTaskMock = vi.fn();
const toggleMock = vi.fn();

vi.mock('@/context', () => ({
	useTasksContext: () => ({
		tasks: tasksMock,
	}),
}));

describe('<TaskList />', () => {
	const props = {
		isLoading: false,
		onMutateDeleteTask: onMutateDeleteTaskMock,
		onMutateToggleCompletedTask: onMutateToggleCompletedTaskMock,
		toggle: toggleMock,
	};
	beforeEach(() => { 
		render(<TaskList { ...props } />);
	});
  
	afterEach(() => { 
		cleanup();
		vi.clearAllMocks();
	});

	it('should render the TaskList component', () => {
		const taskListContainer = screen.getByRole('list');
		const taskList = screen.getAllByRole('listitem');
    
		expect(taskListContainer).toBeInTheDocument();
		expect(taskList).toHaveLength(tasksMock.length);
	});
  
	it('should render the LoadScreen component while it is loading', () => { 
		cleanup();
		props.isLoading = true;
    
		render(<TaskList {...props} />);

		const loadScreen = screen.getByText('Loading...');

		expect(loadScreen).toBeInTheDocument();
	});
  
	it('should render the message "No tasks available" when there are no tasks', () => { 
		vi.spyOn(ContextModule, 'useTasksContext').mockReturnValue({
			tasks: [],
			dispatch: vi.fn(),
		});
		cleanup();
		props.isLoading = false;

		render(<TaskList {...props} />);

		const noTasksMessage = screen.getByText('No tasks available');

		expect(noTasksMessage).toBeInTheDocument();
	});
});
