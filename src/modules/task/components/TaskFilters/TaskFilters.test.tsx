import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';

import { TaskFilters } from '.';

const onFilterCompletedMock = vi.fn();

vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return {
		...actual,
		useSearchParams: () => {
			const setSearchParams = vi.fn();
			const searchParams = new URLSearchParams();
			searchParams.get = vi.fn(() => '');
			return [searchParams, setSearchParams];
		},
	};
});

describe('<TaskCounter />', () => {
	beforeEach(() => { 
		render(<TaskFilters onFilterCompleted={onFilterCompletedMock} />);
	});

	afterEach(() => { 
		cleanup();
		vi.clearAllMocks();
	});

	it('should render the TaskFilters component', () => {
		const allButton = screen.getByText('All');
		const completedButton = screen.getByText('Completed');
		const pendingButton = screen.getByText('Pending');
    
		expect(allButton).toBeInTheDocument();
		expect(completedButton).toBeInTheDocument();
		expect(pendingButton).toBeInTheDocument();
	});
  
	it('should called the filter function with the correct value', () => {
		const allButton = screen.getByText('All');
		const completedButton = screen.getByText('Completed');
		const pendingButton = screen.getByText('Pending');

		act(() => { 
			fireEvent.click(allButton);
			fireEvent.click(completedButton);
			fireEvent.click(pendingButton);
		});

		expect(onFilterCompletedMock).toHaveBeenNthCalledWith(1, '');
		expect(onFilterCompletedMock).toHaveBeenNthCalledWith(2, 'completed');
		expect(onFilterCompletedMock).toHaveBeenNthCalledWith(3, 'pending');
	});
});
