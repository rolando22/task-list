import { Loader, Modal } from '@/modules/core/components';

export function LoadScreen() {
	return (
		<Modal>
			<div className='bg-black h-screen w-screen opacity-50 flex justify-center items-center'>
				<Loader />
			</div>
		</Modal>
	);
}
