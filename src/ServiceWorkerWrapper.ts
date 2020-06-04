import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import * as serviceWorker from './serviceWorker'

export default function ServiceWorkerWrapper() {
	const [showReload, setShowReload] = useState(false)
	const { t } = useTranslation()

	const waitingWorkerRef = useRef<ServiceWorker | null>()

	useEffect(() => {
		serviceWorker.register({
			onUpdate(registration) {
				waitingWorkerRef.current = registration.waiting
				setShowReload(true)
			},
		})
	}, [])

	useEffect(() => {
		if (showReload && window.confirm(t('A new version is available! Reload?'))) {
			waitingWorkerRef.current?.postMessage({ type: 'SKIP_WAITING' })
			setShowReload(false)
			window.location.reload(true)
		}
	}, [showReload, t])

	return null
}
