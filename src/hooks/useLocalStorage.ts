import { useState, useEffect } from 'react'

export default function useLocalStorage<T>(key: string, defaultValue?: T) {
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

	return [value, setValue] as const
}
