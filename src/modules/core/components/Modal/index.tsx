import React from 'react';

interface Props {
    children: React.ReactNode
}

export function Modal({ children }: Props) {
	return (
		<section className='bg-[rgba(32, 35, 41, 0.8)] flex justify-center items-center text-white fixed top-0 right-0 bottom-0 left-0 z-10'>
			{children}  
		</section>
	);
}
