export const theme = {
	// Brand palette
	colors: {
		primary: '#EB7100', // orange primary
		primaryHover: '#A05100', // darker orange for hover
		accent: '#4A90E2', // complementary blue accent
		secondary: '#2E8B87', // complementary teal secondary
		success: '#2E8B87', // teal for success
		warning: '#A05100', // darker orange for warning
		danger: '#E74C3C', // softer red for danger
		surface: '#FEFEFE', // off-white surface
		surfaceMuted: '#F8F9FA', // very light gray muted surface
		text: '#2C3E50', // dark blue-gray text
		textMuted: '#7F8C8D', // medium gray muted text
		border: '#BDC3C7', // light gray border
		nav: '#EB7100', // orange nav
		navEnd: '#D2691E', // darker orange nav end for gradient
		badgeBg: '#E8F4FD', // light blue badge background
		info: '#4A90E2', // blue for info states
		// Chart colors
		chartGreen: '#22c55e', // green for charts
		chartBlue: '#60a5fa', // blue for charts
		chartLightBlue: '#93c5fd', // light blue for charts
		chartPurple: '#a5b4fc', // purple for charts
		chartOrange: '#f97316', // orange for charts
		chartTeal: '#10b981', // teal for charts
		chartGray: '#94a3b8', // gray for charts
		chartDarkBlue: '#3b82f6', // dark blue for charts
		chartLightGray: '#cfe0ff', // light gray for charts
		chartDarkGreen: '#16a34a', // dark green for charts
	},
	shadows: {
		card: '0 8px 24px rgba(2, 6, 23, 0.06)',
		soft: '0 2px 10px rgba(2, 6, 23, 0.04)',
	},
	radii: {
		sm: '8px',
		md: '12px',
		lg: '16px',
		xl: '20px',
		pill: '9999px',
	},
	gradients: {
		hero: 'linear-gradient(90deg, var(--ie-nav) 0%, var(--ie-nav-end) 100%)',
	},
} as const;

export function injectThemeVariables(): string {
	const { colors, shadows, radii } = theme;
	return `:root{\
    --ie-primary:${colors.primary};\
    --ie-primary-hover:${colors.primaryHover};\
    --ie-accent:${colors.accent};\
    --ie-secondary:${colors.secondary};\
    --ie-success:${colors.success};\
    --ie-warning:${colors.warning};\
    --ie-danger:${colors.danger};\
    --ie-info:${colors.info};\
    --ie-surface:${colors.surface};\
    --ie-surface-muted:${colors.surfaceMuted};\
    --ie-text:${colors.text};\
    --ie-text-muted:${colors.textMuted};\
    --ie-border:${colors.border};\
    --ie-nav:${colors.nav};\
    --ie-nav-end:${colors.navEnd};\
    --ie-badge-bg:${colors.badgeBg};\
    --ie-chart-green:${colors.chartGreen};\
    --ie-chart-blue:${colors.chartBlue};\
    --ie-chart-light-blue:${colors.chartLightBlue};\
    --ie-chart-purple:${colors.chartPurple};\
    --ie-chart-orange:${colors.chartOrange};\
    --ie-chart-teal:${colors.chartTeal};\
    --ie-chart-gray:${colors.chartGray};\
    --ie-chart-dark-blue:${colors.chartDarkBlue};\
    --ie-chart-light-gray:${colors.chartLightGray};\
    --ie-chart-dark-green:${colors.chartDarkGreen};\
    --ie-shadow-card:${shadows.card};\
    --ie-shadow-soft:${shadows.soft};\
    --ie-radius-sm:${radii.sm};\
    --ie-radius-md:${radii.md};\
    --ie-radius-lg:${radii.lg};\
    --ie-radius-xl:${radii.xl};\
    --ie-radius-pill:${radii.pill};\
  }`;
}
