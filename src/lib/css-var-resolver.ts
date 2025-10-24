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

	// Resolve CSS variable safely
	let result = value;
	try {
		const resolved = getComputedStyle(document.documentElement)
			.getPropertyValue(varName)
			.trim();

		// If resolved value is empty or invalid, use a fallback
		if (!resolved || resolved === '') {
			// Provide sensible fallbacks for common chart colors
			if (
				varName.includes('chart-light-gray') ||
				varName.includes('light-gray')
			) {
				result = '#f8fafc';
			} else if (
				varName.includes('chart-dark-gray') ||
				varName.includes('dark-gray')
			) {
				result = '#64748b';
			} else if (
				varName.includes('chart-blue') ||
				varName.includes('blue')
			) {
				result = '#3b82f6';
			} else if (
				varName.includes('chart-green') ||
				varName.includes('green')
			) {
				result = '#10b981';
			} else if (
				varName.includes('chart-red') ||
				varName.includes('red')
			) {
				result = '#ef4444';
			} else {
				// Generic fallback for unknown variables
				result = '#000000';
			}
		} else {
			result = resolved;
		}
	} catch {
		// Fallback to original value if getComputedStyle fails
		result = value;
	}

	// Cache the result
	cssVarCache.set(varName, result);

	return result;
}

export function deepResolveCssVars(input: unknown): unknown {
	const self = (x: unknown): unknown => {
		if (Array.isArray(x)) {
			return x.map(self);
		}

		if (x && typeof x === 'object') {
			const out: Record<string, unknown> = {};
			const entries = Object.entries(x as Record<string, unknown>);

			// Process all entries at once - CSS var resolution is fast
			for (const [k, v] of entries) {
				out[k] = self(v);
			}
			return out;
		}

		return resolveCssVar(x);
	};

	return self(input);
}
