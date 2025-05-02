import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import type { IconBaseProps } from 'react-icons';

interface Props {
  fill: string
}

export function Check({ fill }: Props) {
	return (
		<svg 
			viewBox='0 0 405.272 405.272 '
			className='w-6 h-6 hover:fill-[#47c2be]' 
			fill={fill}
		>
			<path d='M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836 c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064 c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z'/>
		</svg>
	);
}

export function Delete({ fill }: Props) {
	return (
		<svg 
			viewBox='0 0 348.333 348.334' 
			className='w-6 h-6 hover:fill-red-500' 
			fill={fill}
		>
			<path d='M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85 c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563 c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85 l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554 L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z'/>
		</svg>

	);
}

export function Edit({ fill }: Props) {
	return (
		<svg
			viewBox='0 0 24 24'
			className='w-6 h-6 hover:fill-[#61DAFA]'
			fill={fill}
			xmlns='https://www.w3.org/2000/svg'
		>
			<path
				d='M0 18.9993V24H5.00069L19.756 9.24459L14.7553 4.2439L0 18.9993Z '
			/>
			<path
				d='M23.6099 3.5038L20.4961 0.390054C19.9761 -0.130018 19.1293 -0.130018 18.6092 0.390054L16.1689 2.83039L21.1695 7.83108L23.6099 5.39074C24.13 4.87067 24.13 4.02387 23.6099 3.5038Z'
			/>
		</svg>
	);
}

interface PropsAiICons extends IconBaseProps {}

export function Eye(props: PropsAiICons) {
	return (
		<AiFillEye {...props} />
	);
}

export function EyeInvisible(props: PropsAiICons) {
	return (
		<AiFillEyeInvisible {...props} />
	);
}
