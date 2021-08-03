export interface IUser {
	createdAt: number;
	id?: string;
	image?: string;
	name: string;
	role: string;
	updatedAt?: number;
}

export interface IUserCredentials {
	email: string;
	password: string;
}
