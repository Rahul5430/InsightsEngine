export const theme = {
	// Brand palette
	colors: {
		primary: '#1E66F5', // primary blue used across buttons/links
		primaryHover: '#1352cc',
		accent: '#6AA1FF',
		success: '#16A34A',
		warning: '#F59E0B',
		danger: '#DC2626',
		surface: '#FFFFFF',
		surfaceMuted: '#F5F7FF',
		text: '#0F172A',
		textMuted: '#475569',
		border: '#E2E8F0',
		nav: '#0A54C6',
		navEnd: '#6B4DFF',
		badgeBg: '#EDF2FF',
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
    --ie-success:${colors.success};\
    --ie-warning:${colors.warning};\
    --ie-danger:${colors.danger};\
    --ie-surface:${colors.surface};\
    --ie-surface-muted:${colors.surfaceMuted};\
    --ie-text:${colors.text};\
    --ie-text-muted:${colors.textMuted};\
    --ie-border:${colors.border};\
    --ie-nav:${colors.nav};\
    --ie-nav-end:${colors.navEnd};\
    --ie-badge-bg:${colors.badgeBg};\
    --ie-shadow-card:${shadows.card};\
    --ie-shadow-soft:${shadows.soft};\
    --ie-radius-sm:${radii.sm};\
    --ie-radius-md:${radii.md};\
    --ie-radius-lg:${radii.lg};\
    --ie-radius-xl:${radii.xl};\
    --ie-radius-pill:${radii.pill};\
  }`;
}
