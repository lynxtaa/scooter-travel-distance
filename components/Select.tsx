import {
	type SelectHTMLAttributes,
	type DetailedHTMLProps,
	forwardRef,
	type ForwardedRef,
} from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
	children?: React.ReactNode
	className?: string
	isInvalid?: boolean
} & DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

function Select(
	{ children, className, isInvalid = false, ...rest }: Props,
	ref: ForwardedRef<HTMLSelectElement>,
) {
	return (
		<select
			ref={ref}
			className={twMerge(
				'transition duration-200 ease-in-out border-whiteAlpha-300 bg-gray-800 rounded-md hover:border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400',
				isInvalid && 'border-red-300 ring-2 ring-red-300 hover:border-red-300',
				className,
			)}
			{...rest}
		>
			{children}
		</select>
	)
}

export default forwardRef(Select)
