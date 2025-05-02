import { useState } from 'react';
import { toast } from 'sonner';

import { useTaskStore } from '@/modules/task/hooks/useTaskStore';
import { taskService } from '@/modules/task/services/task.service';

import type { Task } from '@/modules/task/types';

export function useRemoveTask() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
  
	const { removeTaskStore } = useTaskStore();

	const removeTask = async (id: Task['id']) => {
		try {
			setIsLoading(true);
			const task = await taskService.delete(id);
			removeTaskStore(task.id);
			toast.success('Task deleted');
		} catch (error) {
			if (error instanceof Error) toast.error(error.message);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,  
		removeTask,
	};
}
