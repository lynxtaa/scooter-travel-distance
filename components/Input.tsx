import { InputHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react'

import { cn } from '../lib/cn'

type Props = {
	children?: React.ReactNode
	className?: string
	isInvalid?: boolean
	isDisabled?: boolean
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = forwardRef<HTMLInputElement, Props>(
	({ children, className, isInvalid, isDisabled, ...rest }, ref) => (
		<input
			ref={ref}
			readOnly={isDisabled}
			className={cn(
				'transition duration-200 ease-in-out border-whiteAlpha-300 bg-gray-800 rounded-md placeholder-whiteAlpha-500',
				isDisabled
					? 'focus:border-whiteAlpha-300 cursor-default opacity-80'
					: 'hover:border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400',
				!isDisabled &&
					isInvalid &&
					'border-red-300 ring-2 ring-red-300 hover:border-red-300',
				className,
			)}
			{...rest}
		/>
	),
)

export default Input
