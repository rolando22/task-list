import React from 'react';
import { Check, Delete, Edit } from '@/modules/core/components';

interface IconType {
	'check': (color: string) => React.ReactNode,
	'delete': (color: string) => React.ReactNode
	'edit': (color: string) => React.ReactNode
}

const iconTypes: IconType = {
	'check': (color: string) => <Check fill={color} />,
	'delete': (color: string) => <Delete fill={color} />,
	'edit': (color: string) => <Edit fill={color} />,
};

interface TaskIconProps {
	type: 'check' | 'delete' | 'edit'
	color: string
	onClick: () => void
}

export function TaskIcon({ type, color, onClick }: TaskIconProps) {
	return (
		<span
			className={`
				cursor-pointer flex justify-center items-center h-12 w-12 text-2xl font-bold 
				${type === 'check' ? 'absolute left-1' : ''}
				${type === 'delete' ? 'absolute top-[-24px] right-0' : ''}
				${type === 'edit' ? 'absolute top-[-24px] right-12' : ''}
			`}
			onClick={onClick}
		>
			{iconTypes[type](color)}
		</span>
	);
}

interface CompleteIconProps {
	completed: boolean
	onComplete: () => void
}

export function CompleteIcon({ completed, onComplete }: CompleteIconProps) {
	return (
		<TaskIcon 
			type='check'
			color={`${completed ? '#47c2be' : '#5e6b78'}`}
			onClick={onComplete}
		/>
	);
}

interface DeleteIconProps {
	onDelete: () => void
}

export function DeleteIcon({ onDelete }: DeleteIconProps) {
	return (
		<TaskIcon 
			type='delete'
			color='#5e6b78'
			onClick={onDelete}
		/>
	);
}

interface EditIconProps {
	onEdit: () => void
}

export function EditIcon({ onEdit }: EditIconProps) {
	return (
		<TaskIcon
			type='edit'
			color='#5e6b78'
			onClick={onEdit}
		/>
	);
}
