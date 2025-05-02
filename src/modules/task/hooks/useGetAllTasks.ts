import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { useTaskStore } from '@/modules/task/hooks/useTaskStore';
import { taskService } from '@/modules/task/services/task.service';

import type { TaskFilters } from '@/modules/task/types';

export function useGetAllTasks() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
  
	const { setTasksStore } = useTaskStore();
  
	const getTasks = useCallback(({ completed = '' }: Partial<TaskFilters>) => {
		(async () => {
			try {
				setIsLoading(true);
				const tasksData = await taskService.getByUser({ completed });
				setTasksStore(tasksData);
			} catch (error) {
				if (error instanceof Error) toast.error(error.message);
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return {
		isLoading, 
		getTasks,
	};
}
