import React, { createContext, useContext, useReducer } from 'react';

import { userInitialState, userReducer } from '@/reducers';

import type { UserState, UserTypeAction } from '@/types';

interface ContextProps {
	user: UserState,
	dispatch: React.Dispatch<UserTypeAction>
}

export const UserContext = createContext<ContextProps>({ 
	user: userInitialState, 
} as ContextProps);

interface Props {
	children: React.ReactNode
}

export function UserProvider({ children }: Props) {
	const [user, dispatch] = useReducer(userReducer, userInitialState);

	return (
		<UserContext.Provider value={{
			user, 
			dispatch,
		}}>
			{children}
		</UserContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext() {
	const userContext = useContext(UserContext);

	if (userContext === undefined) throw new Error('useUserContext must be used within a UserProvider');

	return userContext;
}
