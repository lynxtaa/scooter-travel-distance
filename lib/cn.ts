import { twMerge } from 'tailwind-merge'

export const cn = (...args: Parameters<typeof twMerge>): string => twMerge(...args)
