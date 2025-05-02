import { useState } from 'react';
import { useFormik } from 'formik';
import { Eye, EyeInvisible } from '@/modules/core/components/Icons';

import { Loader } from '@/modules/core/components';

import { useUser } from '@/modules/auth/hooks/useUser';
import { LoginSchema } from '@/modules/auth/schemas';

import type { Login } from '@/modules/auth/types';

export function LoginForm() {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const { isLoading, login } = useUser();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		} as Login,
		validationSchema: LoginSchema,
		onSubmit: ({ email, password }) => {
			login({ email, password });
		},
	});

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={`grid justify-center gap-3 h-screen ${isLoading ? 'opacity-70' : ''}`}>
			<h1 className='font-medium text-xl text-center self-center'>Welcome</h1>
			<form className='flex flex-col gap-4 w-80' onSubmit={formik.handleSubmit}>
				<div className='flex flex-col gap-1'>
					<label htmlFor='email' className='font-light text-sm'>Email:</label>
					<input 
						id='email' 
						name='email' 
						className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-white/60 focus:outline-none py-2 px-4' 
						type='text'
						value={formik.values.email}
						onChange={formik.handleChange}
						placeholder='peter@gmail.com' 
					/>
					{formik.touched.email && <span className='text-red-500 text-sm'>{formik.errors.email}</span>}
				</div>
				<div className='flex flex-col gap-1'>
					<label htmlFor='password' className='font-light text-sm'>Password:</label>
					<div className='relative'>
						<input 
							id='password' 
							name='password' 
							className='w-full rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4' 
							type={showPassword ? 'text' : 'password'}
							value={formik.values.password}
							onChange={formik.handleChange}
						/>
						<button className="absolute right-5 top-3" type="button" onClick={toggleShowPassword}>
							{showPassword ? <EyeInvisible className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
						</button>
					</div>
					{formik.touched.password && <span className='text-red-500 text-sm'>{formik.errors.password}</span>}
				</div>
				<button 
					className='bg-black text-white w-full rounded-lg py-3 flex justify-center'
					disabled={isLoading}
				>
					{isLoading ? <Loader /> : 'Login'}
				</button>
			</form>
		</div>
	);
}
