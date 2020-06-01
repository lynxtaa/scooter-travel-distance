import React from 'react'

import styles from './Link.module.css'

type Props = {
	isExternal?: boolean
	children: React.ReactNode
	href: string
} & React.PropsWithoutRef<JSX.IntrinsicElements['a']>

export default function Link({ isExternal, children, ...rest }: Props) {
	const externalProps = isExternal
		? { target: '_blank', rel: 'noopener noreferrer' }
		: undefined

	return (
		<a {...externalProps} {...rest} className={styles.link}>
			{children}
		</a>
	)
}
