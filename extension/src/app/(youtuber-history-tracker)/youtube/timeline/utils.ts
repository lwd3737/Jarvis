export const formatDate = (publishedAt: string) => {
	const date = new Date(publishedAt);
	return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};
