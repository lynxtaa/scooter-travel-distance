import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...args: Parameters<typeof clsx>): string => twMerge(clsx(...args))
