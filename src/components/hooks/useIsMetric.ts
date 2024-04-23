import type { Dispatch, SetStateAction } from 'react'

import useLocalStorage from './useLocalStorage'

export function useIsMetric(): [boolean, Dispatch<SetStateAction<boolean>>] {
	return useLocalStorage<boolean>('system', true)
}
