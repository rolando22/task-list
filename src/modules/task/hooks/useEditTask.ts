import { useState } from 'react';
import { toast } from 'sonner';

import { useUserContext } from '@/context';
import { useUser } from '@/modules/auth/hooks/useUser';
import { useTaskStore } from '@/modules/task/hooks/useTaskStore';
import { taskService } from '@/modules/task/services/task.service';

import type { Task } from '@/modules/task/types';

export function useEditTask() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { user } = useUserContext();
	const { editTaskStore } = useTaskStore();

	const { logout } = useUser();

	const editTask = async (newTask: Task) => {
		try {
			setIsLoading(true);
			const { title, description, completed } = newTask;
			const taskData = await taskService.update(newTask.id, { title, description, completed, userId: user.id });
			editTaskStore(taskData);
			toast.success('Task updated');
		} catch (error) {
			if (error instanceof Error) toast.error(error.message);
			console.log(error);
			logout();
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading, 
		editTask, 
	};
}