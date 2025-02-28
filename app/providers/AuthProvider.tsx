'use client';

import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

// Define the auth context type
type AuthContextType = {
	isLoggedIn: boolean;
	userId: string | null;
	login: (userId: string) => void;
	logout: () => void;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
	isLoggedIn: false,
	userId: null,
	login: () => {},
	logout: () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
	const [userId, setUserId] = useState<string | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	// Check for existing auth on mount
	useEffect(() => {
		const storedUserId = Cookies.get('userId');
		if (storedUserId) {
			setUserId(storedUserId);
			setIsLoggedIn(true);
		}
	}, []);

	// Public routes that don't require authentication
	const publicRoutes = ['/login', '/register', '/lost-password', '/reset-password', '/partners'];

	// Redirect to login if not authenticated and not on a public route
	useEffect(() => {
		if (!isLoggedIn && !publicRoutes.includes(pathname) && pathname !== '/') {
			router.push('/login');
		}
	}, [isLoggedIn, pathname, router]);

	const login = (newUserId: string) => {
		Cookies.set('userId', newUserId, { expires: 7 }); // 7 days expiry
		setUserId(newUserId);
		setIsLoggedIn(true);
	};

	const logout = () => {
		Cookies.remove('userId');
		setUserId(null);
		setIsLoggedIn(false);
		router.push('/login');
	};

	const value = {
		isLoggedIn,
		userId,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 