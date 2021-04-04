import { useState, useEffect, Dispatch, SetStateAction } from 'react'

export default function useLocalStorage<T>(
	key: string,
	defaultValue?: T,
): [T, Dispatch<SetStateAction<T>>] {
	const [value, setValue] = useState<T>(() => {
		try {
			const saved = localStorage.getItem(key)
			return saved ? JSON.parse(saved).value : defaultValue
		} catch (err) {
			return defaultValue
		}
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify({ value }))
	}, [key, value])

	return [value, setValue]
}
