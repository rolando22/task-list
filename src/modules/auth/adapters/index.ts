import type LoginResponse from '@/mocksData/authLogin.json';

import type { UserState } from '@/types';

export function formaterUser(data: typeof LoginResponse): UserState {
	const { user, token } = data;
	return {
		id: user.id,
		username: user.username,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		image: user.image,
		token,
	};
}
