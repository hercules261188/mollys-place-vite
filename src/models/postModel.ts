import { IUser } from './userModel';

export interface IPostImageDimensions {
	height: number;
	width: number;
}

interface IPostImage {
	data: string;
	dimensions?: IPostImageDimensions;
	name: string;
}

export interface IPostRecipe {
	description: string;
	directions: string;
	image: IPostImage;
	ingredients: string[];
	name: string;
}

interface IPostVideo {
	id: string;
	image: string;
	title: string;
}

interface IPostContent {
	image?: IPostImage;
	recipe?: IPostRecipe;
	text?: string;
	video?: IPostVideo;
}

export interface IPostReply {
	content: string;
	createdAt: number;
	creator: IUser;
	id?: string;
	updatedAt?: number;
}

export type PostReplies = {
	[id: string]: IPostReply;
};

export interface IPostComment {
	content: string;
	createdAt: number;
	creator: IUser;
	id?: string;
	replies?: PostReplies;
	updatedAt?: number;
}

export type PostComments = {
	[id: string]: IPostComment;
};

export enum PostFilterTypes {
	GAMING = `gaming`,
	GENERAL = `general`,
	KIDS = `kids`,
	RECIPE = `recipe`,

	PUBLIC = `public`,
	USER = `user`,
}

interface IPostFilters {
	[x: string]: boolean;
}

export interface IPost {
	background?: string;
	comments?: PostComments;
	content: IPostContent;
	createdAt: number;
	creator: IUser;
	filters: IPostFilters;
	id?: string;
	updatedAt?: number;
}
