export interface ChartData {
	id: string;
	title: string;
	type: 'bar' | 'line' | 'map' | 'waterfall';
	category?: string;
	xAxisField: string;
	yAxisField: string;
	yAxisUnit?: string;
	yAxisMax?: number;
	markLine?: number;
	recommended?: boolean;
	stacked?: boolean;
	smooth?: boolean;
	areaStyle?: boolean;
	seriesField?: string;
	mapType?: string;
	valueField?: string;
	nameField?: string;
	data: Array<Record<string, unknown>>;
}

export interface KpiData {
	netSales: { title: string; value: string; trend: string };
	growthNetSales: { title: string; value: string; trend: string };
	dailySales: { title: string; value: string; trend: string };
	callActivityVolume: { title: string; value: string; trend: string };
}

export interface PageSection {
	title: string;
	insightsCount: number;
	charts: string[];
}

export interface PageLayout {
	sections: PageSection[];
}

export interface CollectionsLayout {
	favorites: string[];
	collections: Array<{
		title: string;
		chart: string;
		newCount?: number;
	}>;
}

export interface ChartDataConfig {
	chartConfigurations: Record<string, ChartData>;
	kpiData: KpiData;
	pageLayouts: {
		workspace: PageLayout;
		collections: CollectionsLayout;
	};
}

/**
 * Get chart data by ID from the configuration
 */
export function getChartDataById(
	config: ChartDataConfig,
	chartId: string
): ChartData | null {
	return config.chartConfigurations[chartId] || null;
}

/**
 * Get all charts for a specific page section
 */
export function getChartsForSection(
	config: ChartDataConfig,
	page: 'workspace',
	sectionIndex: number
): ChartData[] {
	const pageLayout = config.pageLayouts[page];
	if (
		!pageLayout ||
		!pageLayout.sections ||
		!pageLayout.sections[sectionIndex]
	) {
		return [];
	}

	const section = pageLayout.sections[sectionIndex];
	return section.charts
		.map((chartId: string) => getChartDataById(config, chartId))
		.filter((chart): chart is ChartData => chart !== null);
}

/**
 * Get KPI data
 */
export function getKpiData(config: ChartDataConfig): KpiData {
	return config.kpiData;
}

/**
 * Load and parse chart data from JSON file
 */
export async function loadChartData(): Promise<ChartDataConfig> {
	try {
		// Keep cached; revalidate with server based on ETag/Last-Modified
		const response = await fetch('/chart-data-reference.json', {
			cache: 'no-cache',
		});
		if (!response.ok) {
			throw new Error('Failed to load chart data');
		}
		return await response.json();
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Error loading chart data:', error);
		throw error;
	}
}
