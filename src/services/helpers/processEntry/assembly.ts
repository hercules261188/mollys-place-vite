import { IPost, IPostComment, IPostReply, IUser } from '../../../models';

export const _assembleCreatorObject = ({ id, image, name }: IUser) => ({
	id,
	image,
	name,
});

interface AssemblePostObject {
	content:
		| IPost['content']
		| IPostComment['content']
		| IPostReply['content'];
	creator?: IUser;
}

export const assemblePostObject = ({
	content,
	creator,
}: AssemblePostObject) =>
	({
		content,
		createdAt: Date.now(),
		creator: _assembleCreatorObject(creator!),
	} as IPost);
