import { useSpring, animated, config } from 'react-spring'

type Props = {
	children: number
}

export default function Counter({ children }: Props) {
	const { number } = useSpring({
		from: { number: 0 },
		number: children,
		config: { ...config.default, clamp: true },
	})

	return (
		<animated.span>
			{number.interpolate((value: number) => Math.round(value).toLocaleString())}
		</animated.span>
	)
}
