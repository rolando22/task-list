import * as yup from 'yup';

export const LoginSchema = yup.object({
	email: yup.string().email('Invalid email format').required('Email is required'),
	password: yup.string().required('Password is required'),
});
