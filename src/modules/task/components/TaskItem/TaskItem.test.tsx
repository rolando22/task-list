import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';

import { TaskItem } from '.';
import { tasksMock } from '@/mocksData/const';

const onMutateDeleteTaskMock = vi.fn();
const onMutateToggleCompletedTaskMock = vi.fn();
const toggleMock = vi.fn();

describe('<TaskItem />', () => {
	beforeEach(() => { 
		render(
			<TaskItem
				{ ...tasksMock[0] }
				onMutateDeleteTask={onMutateDeleteTaskMock}
				onMutateToggleCompletedTask={onMutateToggleCompletedTaskMock}
				toggle={toggleMock}
			/>
		);
	});

	afterEach(() => {
		cleanup();
		vi.clearAllMocks();
	});

	it('should render the TaskItem component', () => {
		const taskItem = screen.getByRole('listitem');
		const title = screen.getByText(tasksMock[0].title);
		const description = screen.getByText(tasksMock[0].description);
		const completeIcon = screen.getByTestId('complete-icon');
		const editIcon = screen.getByTestId('edit-icon');
		const deleteIcon = screen.getByTestId('delete-icon');
    
		expect(taskItem).toBeInTheDocument();
		expect(title).toBeInTheDocument();
		expect(description).toBeInTheDocument();
		expect(completeIcon).toBeInTheDocument();
		expect(editIcon).toBeInTheDocument();
		expect(deleteIcon).toBeInTheDocument();
	});
  
	it('should handle the complete icon click', () => {
		const completeIcon = screen.getByTestId('complete-icon');
    
		act(() => { 
			fireEvent.click(completeIcon);
		});
    
		expect(onMutateToggleCompletedTaskMock).toHaveBeenCalledTimes(1);
	});
  
	it('should handle the edit icon click', () => {
		const editIcon = screen.getByTestId('edit-icon');
    
		act(() => { 
			fireEvent.click(editIcon);
		});
    
		expect(toggleMock).toHaveBeenCalledTimes(1);
		expect(toggleMock).toHaveBeenCalledWith({ taskId: tasksMock[0].id, type: 'edit', open: true });
	});
  
	it('should handle the delete icon click', () => {
		const deleteIcon = screen.getByTestId('delete-icon');

		act(() => {
			fireEvent.click(deleteIcon);
		});
    
		expect(onMutateDeleteTaskMock).toHaveBeenCalledTimes(1);
		expect(onMutateDeleteTaskMock).toHaveBeenCalledWith({ id: tasksMock[0].id });
	});
});
