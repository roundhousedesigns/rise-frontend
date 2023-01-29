import { useState, useEffect, useRef } from 'react';

/**
 * Custom hooks.
 */

/**
 * Use Local Storage Hook.
 *
 * Works the same as useState, but using localStorage.
 *
 * @see {@link https://github.com/mikejolley/morrics-magical-cauldron/blob/main/src/hooks/use-local-storage.js}
 *
 * @param {string} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */
export const useLocalStorage = (
	key: string,
	defaultValue: any = '',
	{
		serialize = JSON.stringify,
		deserialize = JSON.parse,
	}: {
		serialize?: (val: any) => string;
		deserialize?: (val: string) => any;
	} = {}
) => {
	const [state, setState] = useState(() => {
		const valueInLocalStorage = window.localStorage.getItem(key);
		if (valueInLocalStorage) {
			return deserialize(valueInLocalStorage);
		}
		return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
	});

	const prevKeyRef = useRef(key);

	useEffect(() => {
		const prevKey = prevKeyRef.current;
		if (prevKey !== key) {
			window.localStorage.removeItem(prevKey);
		}
		prevKeyRef.current = key;
		window.localStorage.setItem(key, serialize(state));
	}, [key, state, serialize]);

	return [state, setState];
};
