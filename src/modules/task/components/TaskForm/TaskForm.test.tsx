import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';

import { TaskForm } from '.';
import { tasksMock } from '@/mocksData/const';

const onMutateTaskMock = vi.fn();
const toggleMock = vi.fn();
const handlerOnClickToggleModalMock = vi.fn(() => toggleMock());
const handleSubmitFormikMock = vi.fn(() => {
	onMutateTaskMock();
	handlerOnClickToggleModalMock();
});

vi.mock('formik', () => ({
	useFormik: vi.fn(() => {
		const actual = vi.importActual('formik');
		return {
			...actual,
			values: { title: '', description: '' },
			touched: { title: false, description: false },
			errors: { title: '', description: '' },
			handleSubmit: handleSubmitFormikMock,
			handleChange: vi.fn(),
		};
	}),
}));

vi.mock('@/modules/task/hooks', () => ({
	useTaskStore: () => ({
		getTaskStore: vi.fn((taskId) => {
			return tasksMock.find((task) => task.id === taskId);
		}),
	}),
}));

describe('<TaskForm />', () => { 
	beforeEach(() => { 
		render(<TaskForm type="new" onMutateTask={onMutateTaskMock} toggle={toggleMock} />);
	});
  
	afterEach(() => {
		cleanup();
		vi.clearAllMocks();
	});

	it('should render the TaskForm component', () => {
		const title = screen.getByRole('heading', { level: 2 });
		const titleInput = screen.getByPlaceholderText(/Write Task title here/i);
		const descriptionInput = screen.getByPlaceholderText(/Write Task description here/i);
		const cancelButton = screen.getByRole('button', { name: 'Cancel' });
		const submitButton = screen.getByRole('button', { name: 'Save' });
    
		expect(title).toBeInTheDocument();
		expect(titleInput).toBeInTheDocument();
		expect(descriptionInput).toBeInTheDocument();
		expect(cancelButton).toBeInTheDocument();
		expect(submitButton).toBeInTheDocument();
	});
  
	it('should render the TaskForm component with parameter "new"', () => {
		const title = screen.getByRole('heading', { level: 2 });
    
		expect(title).toHaveTextContent('New Task');
	});
  
	it('should render the TaskForm component with parameter "edit"', () => {
		cleanup();
		render(<TaskForm type="edit" taskId={tasksMock[0].id} onMutateTask={onMutateTaskMock} toggle={toggleMock} />);

		const title = screen.getByRole('heading', { level: 2 });
    
		expect(title).toHaveTextContent('Edit Task');
	});

	it('should handle form submission', () => {
		const button = screen.getByRole('button', { name: 'Save' });

		act(() => { 
			fireEvent.submit(button);
		});

		expect(onMutateTaskMock).toHaveBeenCalledTimes(1);
		expect(toggleMock).toHaveBeenCalledTimes(1);
	});
  
	it('should called toggle when click cancel button', () => {
		const button = screen.getByRole('button', { name: 'Cancel' });

		act(() => { 
			fireEvent.click(button);
		});


		expect(toggleMock).toHaveBeenCalledTimes(1);
	});
  
});
