type Props = {
	children?: React.ReactNode
}

export default function FormErrorMessage({ children }: Props) {
	return <div className="text-sm mt-1 text-red-300">{children}</div>
}
