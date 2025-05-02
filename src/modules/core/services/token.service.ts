let token = '';

export const tokenService = {
	set: (newToken: string) => {
		token = newToken;
	},
	get: () => token,
};
