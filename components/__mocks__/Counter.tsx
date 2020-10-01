import React from 'react'

type Props = {
	children: number
}

export default function Counter({ children }: Props) {
	return <span>{Math.round(children).toLocaleString()}</span>
}
