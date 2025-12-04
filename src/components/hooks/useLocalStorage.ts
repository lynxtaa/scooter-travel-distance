import { useState, useCallback, useLayoutEffect } from 'react'

export default function useLocalStorage<T>(
	key: string,
	defaultValue: T,
): [T, (value: T) => void] {
	const [value, setValue] = useState<T>(defaultValue)

	useLayoutEffect(() => {
		try {
			const saved = localStorage.getItem(key)
			if (saved !== null) {
				// eslint-disable-next-line react-hooks/set-state-in-effect
				setValue(JSON.parse(saved).value as T)
			}
		} catch {
			// ignore
		}
	}, [key])

	const onChange = useCallback(
		(value: T) => {
			localStorage.setItem(key, JSON.stringify({ value }))
			setValue(value)
		},
		[key],
	)

	return [value, onChange]
}
