import { ReactNode } from 'react';
const { VITE_DEV_MODE } = import.meta.env;

export default function DevMode({ children }: { children: ReactNode }): JSX.Element | null {
	return VITE_DEV_MODE ? <>{children}</> : <></>;
}
