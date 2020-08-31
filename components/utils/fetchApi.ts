type Options = Omit<RequestInit, 'body'> & {
	body?: Record<string, unknown> | unknown[]
}

export default async function fetchApi<TData extends Record<string, unknown> | unknown[]>(
	url: string,
	options: Options = {},
): Promise<{ data: TData } | { error: Error }> {
	try {
		const { body, ...rest } = options

		const opts: RequestInit = rest

		if (body) {
			opts.body = JSON.stringify(body)
			opts.headers = {
				'Content-Type': 'application/json',
				...rest.headers,
			}
		}

		const response = await fetch(url, opts)

		if (!response.ok) {
			throw new Error(`Fetch Error: Request ${response.url} failed (${response.status})`)
		}

		const data: TData = await response.json()

		return { data }
	} catch (error) {
		return { error }
	}
}
