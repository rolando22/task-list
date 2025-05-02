import { useState } from 'react';
import { toast } from 'sonner';

import { useUserContext } from '@/context';
import { useTaskStore } from '@/modules/task/hooks/useTaskStore';
import { taskService } from '@/modules/task/services/task.service';

export function useAddTask() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
  
	const { user } = useUserContext();
	const { addTaskStore } = useTaskStore();

	const addTask = async (title: string, description: string) => {
		try {
			setIsLoading(true);
			const taskData = await taskService.create({ title, description, completed: false, userId: user.id });
			addTaskStore(taskData);
			toast.success('Task created');
		} catch (error) {
			if (error instanceof Error) toast.error(error.message);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading, 
		addTask, 
	};
}
