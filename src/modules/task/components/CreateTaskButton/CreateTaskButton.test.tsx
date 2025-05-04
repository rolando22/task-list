import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';

import { CreateTaskButton } from '.';

const toggleMock = vi.fn();

describe('<CreateTaskButton />', () => { 
	beforeEach(() => { 
		render(<CreateTaskButton toggle={toggleMock} />);
	});
  
	afterEach(() => { 
		cleanup();
		vi.clearAllMocks();
	});

	it('should render the button', () => {
		const button = screen.getByText('+');
    
		expect(button).toBeInTheDocument();
	});
	it('should call toggle function when clicked', () => {
		const button = screen.getByText('+');

		act(() => { 
			fireEvent.click(button);
		});

		expect(toggleMock).toHaveBeenCalledTimes(1);
		expect(toggleMock).toHaveBeenCalledWith({ type: 'new', open: true });
	});
});
