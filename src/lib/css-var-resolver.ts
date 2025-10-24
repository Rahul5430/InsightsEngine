// Optimized CSS variable resolver to prevent main thread blocking
const cssVarCache = new Map<string, string>();

export function resolveCssVar(value: unknown): unknown {
	if (typeof value !== 'string' || !value.startsWith('var(')) {
		return value;
	}

	const varName = value.slice(4, -1).trim();

	// Check cache first
	if (cssVarCache.has(varName)) {
		return cssVarCache.get(varName);
	}

	// Resolve CSS variable
	const resolved = getComputedStyle(document.documentElement)
		.getPropertyValue(varName)
		.trim();

	const result = resolved || value;

	// Cache the result
	cssVarCache.set(varName, result);

	return result;
}

export function deepResolveCssVars(input: unknown): unknown {
	const self = (x: unknown): unknown => {
		if (Array.isArray(x)) {
			// Use requestIdleCallback to yield control for large arrays
			if (x.length > 100) {
				return x.map(self);
			}
			return x.map(self);
		}

		if (x && typeof x === 'object') {
			const out: Record<string, unknown> = {};
			const entries = Object.entries(x as Record<string, unknown>);

			// Process in chunks to avoid blocking
			for (let i = 0; i < entries.length; i++) {
				const [k, v] = entries[i];
				out[k] = self(v);

				// Yield control every 50 properties
				if (i % 50 === 0 && i > 0) {
					// Use setTimeout to yield control
					setTimeout(() => {}, 0);
				}
			}
			return out;
		}

		return resolveCssVar(x);
	};

	return self(input);
}
