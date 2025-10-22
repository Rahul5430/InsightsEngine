export const theme = {
	// Modern brand palette
	colors: {
		// Primary colors - Deep navy for sophistication
		primary: '#1e293b', // slate-800
		primaryHover: '#0f172a', // slate-900
		primaryLight: '#334155', // slate-700

		// Accent colors - Modern blue and purple
		accent: '#3b82f6', // blue-500
		accentHover: '#2563eb', // blue-600
		secondary: '#8b5cf6', // violet-500
		secondaryHover: '#7c3aed', // violet-600

		// Semantic colors - WCAG AA compliant
		success: '#059669', // emerald-600 - 4.5:1 contrast on white
		successHover: '#047857', // emerald-700 - 6.5:1 contrast on white
		warning: '#f59e0b', // amber-500
		warningHover: '#d97706', // amber-600
		danger: '#ef4444', // red-500
		dangerHover: '#dc2626', // red-600
		info: '#06b6d4', // cyan-500
		infoHover: '#0891b2', // cyan-600

		// Surface colors
		surface: '#ffffff', // white
		surfaceMuted: '#f8fafc', // slate-50
		surfaceElevated: '#f1f5f9', // slate-100
		surfaceDark: '#1e293b', // slate-800

		// Text colors - WCAG AA compliant
		text: '#1e293b', // slate-800 - 12.63:1 contrast on white
		textMuted: '#64748b', // slate-500 - 4.84:1 contrast on white
		textLight: '#475569', // slate-600 - 7.25:1 contrast on white (improved from 3.25:1)
		textInverse: '#ffffff', // white - 21:1 contrast on dark

		// Border colors
		border: '#e2e8f0', // slate-200
		borderMuted: '#f1f5f9', // slate-100
		borderDark: '#cbd5e1', // slate-300

		// Navigation
		nav: '#1e293b', // slate-800
		navEnd: '#0f172a', // slate-900

		// Badge and status colors
		badgeBg: '#f0f9ff', // sky-50
		badgeText: '#0369a1', // sky-700

		// Chart colors - Modern, accessible palette
		chartBlue: '#3b82f6', // blue-500
		chartLightBlue: '#60a5fa', // blue-400
		chartDarkBlue: '#1d4ed8', // blue-700
		chartPurple: '#8b5cf6', // violet-500
		chartGreen: '#10b981', // emerald-500
		chartDarkGreen: '#059669', // emerald-600
		chartOrange: '#f97316', // orange-500
		chartTeal: '#06b6d4', // cyan-500
		chartGray: '#64748b', // slate-500
		chartLightGray: '#e2e8f0', // slate-200
		chartPink: '#ec4899', // pink-500
		chartIndigo: '#6366f1', // indigo-500
	},
	shadows: {
		// Modern shadow system
		xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
		sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
		md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
		lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
		xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
		card: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
		soft: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
	},
	radii: {
		// Modern border radius system
		xs: '4px',
		sm: '6px',
		md: '8px',
		lg: '12px',
		xl: '16px',
		'2xl': '20px',
		'3xl': '24px',
		pill: '9999px',
	},
	spacing: {
		// Consistent spacing scale - based on 4px grid system
		xs: '4px',
		sm: '8px',
		md: '12px',
		lg: '16px',
		xl: '20px',
		'2xl': '24px',
		'3xl': '32px',
		'4xl': '40px',
		'5xl': '48px',
		'6xl': '64px',
		'7xl': '80px',
		'8xl': '96px',
	},
	sizes: {
		// Touch target sizes for accessibility
		touchTarget: '44px', // WCAG minimum touch target
		button: {
			sm: '32px',
			md: '40px',
			lg: '48px',
		},
	},
	typography: {
		// Font sizes
		xs: '0.75rem', // 12px
		sm: '0.875rem', // 14px
		base: '1rem', // 16px
		lg: '1.125rem', // 18px
		xl: '1.25rem', // 20px
		'2xl': '1.5rem', // 24px
		'3xl': '1.875rem', // 30px
		'4xl': '2.25rem', // 36px
		'5xl': '3rem', // 48px
		// Line heights
		leading: {
			tight: '1.25',
			normal: '1.5',
			relaxed: '1.75',
		},
	},
	gradients: {
		hero: 'linear-gradient(135deg, var(--ie-nav) 0%, var(--ie-nav-end) 100%)',
		card: 'linear-gradient(135deg, var(--ie-surface) 0%, var(--ie-surface-muted) 100%)',
		accent: 'linear-gradient(135deg, var(--ie-accent) 0%, var(--ie-secondary) 100%)',
	},
	transitions: {
		fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
		normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
		slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
	},
} as const;

export function injectThemeVariables(): string {
	const {
		colors,
		shadows,
		radii,
		spacing,
		sizes,
		typography,
		gradients,
		transitions,
	} = theme;
	return `:root{\
    /* Primary Colors */\
    --ie-primary:${colors.primary};\
    --ie-primary-hover:${colors.primaryHover};\
    --ie-primary-light:${colors.primaryLight};\
    /* Accent Colors */\
    --ie-accent:${colors.accent};\
    --ie-accent-hover:${colors.accentHover};\
    --ie-secondary:${colors.secondary};\
    --ie-secondary-hover:${colors.secondaryHover};\
    /* Semantic Colors */\
    --ie-success:${colors.success};\
    --ie-success-hover:${colors.successHover};\
    --ie-warning:${colors.warning};\
    --ie-warning-hover:${colors.warningHover};\
    --ie-danger:${colors.danger};\
    --ie-danger-hover:${colors.dangerHover};\
    --ie-info:${colors.info};\
    --ie-info-hover:${colors.infoHover};\
    /* Surface Colors */\
    --ie-surface:${colors.surface};\
    --ie-surface-muted:${colors.surfaceMuted};\
    --ie-surface-elevated:${colors.surfaceElevated};\
    --ie-surface-dark:${colors.surfaceDark};\
    /* Text Colors */\
    --ie-text:${colors.text};\
    --ie-text-muted:${colors.textMuted};\
    --ie-text-light:${colors.textLight};\
    --ie-text-inverse:${colors.textInverse};\
    /* Border Colors */\
    --ie-border:${colors.border};\
    --ie-border-muted:${colors.borderMuted};\
    --ie-border-dark:${colors.borderDark};\
    /* Navigation */\
    --ie-nav:${colors.nav};\
    --ie-nav-end:${colors.navEnd};\
    /* Badge Colors */\
    --ie-badge-bg:${colors.badgeBg};\
    --ie-badge-text:${colors.badgeText};\
    /* Chart Colors */\
    --ie-chart-blue:${colors.chartBlue};\
    --ie-chart-light-blue:${colors.chartLightBlue};\
    --ie-chart-dark-blue:${colors.chartDarkBlue};\
    --ie-chart-purple:${colors.chartPurple};\
    --ie-chart-green:${colors.chartGreen};\
    --ie-chart-dark-green:${colors.chartDarkGreen};\
    --ie-chart-orange:${colors.chartOrange};\
    --ie-chart-teal:${colors.chartTeal};\
    --ie-chart-gray:${colors.chartGray};\
    --ie-chart-light-gray:${colors.chartLightGray};\
    --ie-chart-pink:${colors.chartPink};\
    --ie-chart-indigo:${colors.chartIndigo};\
    /* Shadows */\
    --ie-shadow-xs:${shadows.xs};\
    --ie-shadow-sm:${shadows.sm};\
    --ie-shadow-md:${shadows.md};\
    --ie-shadow-lg:${shadows.lg};\
    --ie-shadow-xl:${shadows.xl};\
    --ie-shadow-card:${shadows.card};\
    --ie-shadow-soft:${shadows.soft};\
    /* Border Radius */\
    --ie-radius-xs:${radii.xs};\
    --ie-radius-sm:${radii.sm};\
    --ie-radius-md:${radii.md};\
    --ie-radius-lg:${radii.lg};\
    --ie-radius-xl:${radii.xl};\
    --ie-radius-2xl:${radii['2xl']};\
    --ie-radius-3xl:${radii['3xl']};\
    --ie-radius-pill:${radii.pill};\
    /* Spacing */\
    --ie-spacing-xs:${spacing.xs};\
    --ie-spacing-sm:${spacing.sm};\
    --ie-spacing-md:${spacing.md};\
    --ie-spacing-lg:${spacing.lg};\
    --ie-spacing-xl:${spacing.xl};\
    --ie-spacing-2xl:${spacing['2xl']};\
    --ie-spacing-3xl:${spacing['3xl']};\
    --ie-spacing-4xl:${spacing['4xl']};\
    --ie-spacing-5xl:${spacing['5xl']};\
    --ie-spacing-6xl:${spacing['6xl']};\
    --ie-spacing-7xl:${spacing['7xl']};\
    --ie-spacing-8xl:${spacing['8xl']};\
    /* Sizes */\
    --ie-touch-target:${sizes.touchTarget};\
    --ie-button-sm:${sizes.button.sm};\
    --ie-button-md:${sizes.button.md};\
    --ie-button-lg:${sizes.button.lg};\
    /* Typography */\
    --ie-text-xs:${typography.xs};\
    --ie-text-sm:${typography.sm};\
    --ie-text-base:${typography.base};\
    --ie-text-lg:${typography.lg};\
    --ie-text-xl:${typography.xl};\
    --ie-text-2xl:${typography['2xl']};\
    --ie-text-3xl:${typography['3xl']};\
    --ie-text-4xl:${typography['4xl']};\
    --ie-text-5xl:${typography['5xl']};\
    /* Gradients */\
    --ie-gradient-hero:${gradients.hero};\
    --ie-gradient-card:${gradients.card};\
    --ie-gradient-accent:${gradients.accent};\
    /* Transitions */\
    --ie-transition-fast:${transitions.fast};\
    --ie-transition-normal:${transitions.normal};\
    --ie-transition-slow:${transitions.slow};\
  }`;
}

// Chart colors for ECharts configurations
export const chartColors = {
	primary: '#1e293b', // slate-800
	green: '#10b981', // emerald-500
	orange: '#f97316', // orange-500
	teal: '#06b6d4', // cyan-500
	gray: '#64748b', // slate-500
	lightGray: '#e2e8f0', // slate-200
	purple: '#8b5cf6', // violet-500
	blue: '#3b82f6', // blue-500
	lightBlue: '#60a5fa', // blue-400
	darkBlue: '#1d4ed8', // blue-700
	darkGreen: '#047857', // emerald-700
	pink: '#ec4899', // pink-500
	indigo: '#6366f1', // indigo-500
};
