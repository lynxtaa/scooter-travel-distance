import { animate } from 'popmotion'
import { useEffect, startTransition, useState, useRef, useLayoutEffect } from 'react'

type Props = {
	children: number
}

export default function Counter({ children }: Props) {
	const [value, setValue] = useState(0)

	const latestValue = useRef(value)

	useLayoutEffect(() => {
		latestValue.current = value
	})

	useEffect(() => {
		const { stop } = animate({
			type: 'spring',
			damping: 20,
			stiffness: 100,
			from: latestValue.current,
			to: children,
			onUpdate: num => {
				startTransition(() => {
					setValue(num)
				})
			},
		})

		return stop
	}, [children])

	return <span>{Math.round(value).toLocaleString()}</span>
}
