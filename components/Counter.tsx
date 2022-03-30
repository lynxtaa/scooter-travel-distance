import { animate } from 'popmotion'
import { useEffect, useRef } from 'react'

type Props = {
	children: number
}

export default function Counter({ children }: Props) {
	const spanRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		const span = spanRef.current

		if (!span) {
			return
		}

		span.innerText = '0'

		const { stop } = animate({
			type: 'spring',
			damping: 20,
			stiffness: 100,
			from: 0,
			to: children,
			onUpdate: num => {
				span.innerText = Math.round(num).toLocaleString()
			},
		})

		return function () {
			stop()
			span.innerText = '0'
		}
	}, [children])

	return <span ref={spanRef} />
}
