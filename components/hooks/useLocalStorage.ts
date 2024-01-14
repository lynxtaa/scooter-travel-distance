import { useState, useEffect, type Dispatch, type SetStateAction } from 'react'

export default function useLocalStorage<T>(
	key: string,
	defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] {
	const [value, setValue] = useState<T>(() => {
		try {
			const saved = localStorage.getItem(key)
			return saved !== null ? (JSON.parse(saved).value as T) : defaultValue
		} catch {
			return defaultValue
		}
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify({ value }))
	}, [key, value])

	return [value, setValue]
}
