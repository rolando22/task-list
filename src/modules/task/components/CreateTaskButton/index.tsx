import type { ToggleModal } from '@/modules/core/types';

interface Props {
	toggle: (newState: ToggleModal) => void
}

export function CreateTaskButton({ toggle }: Props) {

	const handlerOnClickToggle = () => toggle({ type: 'new', open: true });

	return (
		<button 
			className='bg-[#47c2be] hover:bg-opacity-80 border-none rounded-full cursor-pointer text-5xl font-bold text-[#fafafa] flex justify-center items-center h-16 w-16 pb-3'
			onClick={handlerOnClickToggle}
		>
      +
		</button>
	);
}