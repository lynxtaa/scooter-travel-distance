type Props = {
	children?: React.ReactNode
}

export default function InputRightAddon({ children }: Props) {
	return (
		<span className="flex items-center bg-gray-700 px-4 border-r border-gray-700 rounded-r">
			{children}
		</span>
	)
}
