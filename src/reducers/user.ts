import type { UserState, UserTypeAction } from '@/types';

const emptyUser: UserState = {
	id: '',
	firstName: '',
	lastName: '',
	email: '',
	username: '',
	image: '',
	token: '',
};

const USER_LOCALSTORAGE_KEY = 'user_task_list_app_v1';

export const userInitialState: UserState = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY) || JSON.stringify(emptyUser));

const userReducerObject = (_state: UserState, action: UserTypeAction) => ({
	['LOGIN']: () => {
		const newState = action.payload;
		localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(newState));
		return newState;
	}, 
	['LOGOUT']: () => {
		localStorage.removeItem(USER_LOCALSTORAGE_KEY);
		return emptyUser;
	},
});

export const userReducer = (state: UserState, action: UserTypeAction) => {
	return userReducerObject(state, action)[action.type]() || state;
};
