import clsx from 'clsx'
import { overrideTailwindClasses } from 'tailwind-override'

export const cn = (...args: Parameters<typeof clsx>): string =>
	overrideTailwindClasses(clsx(...args))
