import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import { cn } from '../lib/cn'

type Props = {
	children?: React.ReactNode
	className?: string
	variant?: 'solid' | 'outline' | 'link'
	isDisabled?: boolean
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function Button({
	children,
	className,
	variant = 'solid',
	isDisabled,
	...rest
}: Props) {
	return (
		<button
			className={cn(
				'transition duration-200 ease-in-out font-semibold text-gray-200 rounded leading-tight',
				...(variant === 'solid'
					? [
							'bg-gray-700 border border-gray-700 px-4 py-2 hover:bg-gray-700 focus-visible:border-blue-600',
							!isDisabled && 'hover:bg-gray-600',
					  ]
					: variant === 'outline'
					? [
							'border border-gray-700 px-4 py-2 hover:bg-gray-700 focus-visible:border-blue-600',
					  ]
					: variant === 'link'
					? ['hover:underline']
					: []),
				isDisabled
					? 'cursor-not-allowed opacity-80'
					: 'focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-600',
				className,
			)}
			disabled={isDisabled}
			type="button"
			{...rest}
		>
			{children}
		</button>
	)
}
