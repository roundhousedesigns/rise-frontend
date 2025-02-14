// This file ensures Wrangler recognizes the Functions directory
export const onRequest = async (context) => {
	return await context.next();
};
