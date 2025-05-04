import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';

import { UserProvider } from '@/context';

import { LoginForm } from './index';

const loginUseLoginMock = vi.fn();
const handleSubmitFormikMock = vi.fn();

vi.mock('@/modules/auth/hooks', () => ({
	useLogin: () => ({
		login: loginUseLoginMock,
		isLoading: false,
	}),
}));

vi.mock('formik', () => ({
	useFormik: vi.fn(() => ({
		values: { email: '', password: '' },
		touched: { email: false, password: false },
		errors: { email: '', password: '' },
		handleSubmit: handleSubmitFormikMock,
		handleChange: vi.fn(),
	})),
}));

describe('<LoginForm />', () => { 
	beforeEach(() => { 
		render(
			<UserProvider>
				<LoginForm />
			</UserProvider>
		);
	});
  
	afterEach(() => { 
		vi.clearAllMocks();
		cleanup();
	});

	it('Should render the LoginForm component', () => {
		const title = screen.getByRole('heading', { level: 1, name: /Welcome/i });
		const emailInput = screen.getByLabelText(/Email:/i);
		const passwordInput = screen.getByLabelText(/Password:/i);
		const eyeIcon = screen.getByTestId('eye-icon');
		const submitButton = screen.getByRole('button', { name: /Login/i });
    
		expect(title).toBeInTheDocument();
		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(eyeIcon).toBeInTheDocument();
		expect(submitButton).toBeInTheDocument();
	});
  
	it('Should handle form submission', () => {
		const form = screen.getByRole('form');
		const emailInput = screen.getByLabelText(/Email:/i);
		const passwordInput = screen.getByLabelText(/Password:/i);

		act(() => { 
			fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
			fireEvent.change(passwordInput, { target: { value: 'password123' } });
			fireEvent.submit(form);
		});
    
		expect(handleSubmitFormikMock).toHaveBeenCalledTimes(1);
	});

	it('Should show/hide password', () => {
		const passwordInput = screen.getByLabelText(/Password:/i);
		const togglePasswordButton = screen.getByRole('button', { name: '' });
		const eyeIcon = screen.getByTestId('eye-icon');
		
		expect(passwordInput).toHaveAttribute('type', 'password');
		expect(eyeIcon).toBeInTheDocument();
		
		act(() => {
			fireEvent.click(togglePasswordButton);
		});
		
		const eyeInvisibleIcon = screen.getByTestId('eye-invisible-icon');

		expect(passwordInput).toHaveAttribute('type', 'text');
		expect(eyeIcon).not.toBeInTheDocument();
		expect(eyeInvisibleIcon).toBeInTheDocument();
	});
});
