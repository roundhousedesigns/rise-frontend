export const publicRoutes = ['/login', '/register', '/lost-password', '/reset-password'];

export const isPublicRoute = (pathname: string): boolean => {
	// Check exact matches
	if (publicRoutes.includes(pathname)) {
		return true;
	}

	// Check dynamic public pages (like /reset-password?key=xxx)
	const basePath = pathname.split('?')[0];
	return publicRoutes.includes(basePath);
};
