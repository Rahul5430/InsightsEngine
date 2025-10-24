import type { EChartsOption } from 'echarts';

// Color palette for automatic assignment
const CHART_COLORS = [
	'#1e293b', // primary
	'#10b981', // green
	'#f97316', // orange
	'#06b6d4', // teal
	'#8b5cf6', // purple
	'#3b82f6', // blue
	'#64748b', // gray
	'#ec4899', // pink
	'#6366f1', // indigo
	'#047857', // dark green
];

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
 * Transform chart data from JSON structure to ECharts option
 */
export function transformChartData(chartData: ChartData): EChartsOption {
	const baseOption: EChartsOption = {
		grid: { left: 50, right: 10, top: 30, bottom: 40 },
		title: {
			text: chartData.title,
			left: 'center',
			textStyle: {
				fontSize: 16,
				fontWeight: 'bold',
			},
		},
	};

	// Handle different chart types
	switch (chartData.type) {
		case 'bar':
			return transformBarChart(chartData, baseOption);
		case 'line':
			return transformLineChart(chartData, baseOption);
		case 'map':
			return transformMapChart(chartData, baseOption);
		case 'waterfall':
			return transformWaterfallChart(chartData, baseOption);
		default:
			return baseOption;
	}
}

function transformBarChart(
	chartData: ChartData,
	baseOption: EChartsOption
): EChartsOption {
	const {
		data,
		xAxisField,
		yAxisField,
		seriesField,
		yAxisUnit,
		yAxisMax,
		markLine,
		stacked,
	} = chartData;

	// Extract unique categories for x-axis
	const categories = [
		...new Set(data.map((item) => item[xAxisField] as string)),
	];

	// If seriesField exists, group data by series
	if (seriesField) {
		const seriesGroups = groupBy(data, seriesField);
		const series = Object.entries(seriesGroups).map(
			([name, seriesData], index) => ({
				name,
				type: 'bar' as const,
				data: categories.map((category) => {
					const item = seriesData.find(
						(d) => d[xAxisField] === category
					);
					return item ? (item[yAxisField] as number) : 0;
				}),
				itemStyle: { color: CHART_COLORS[index % CHART_COLORS.length] },
				barMaxWidth: 30,
				stack: stacked ? 'total' : undefined,
			})
		);

		return {
			...baseOption,
			legend: { top: 0, data: Object.keys(seriesGroups) },
			xAxis: {
				type: 'category',
				data: categories,
			},
			yAxis: {
				type: 'value',
				name: yAxisUnit,
				max: yAxisMax,
				axisLabel: yAxisUnit
					? { formatter: `{value}${yAxisUnit}` }
					: undefined,
			},
			series,
			markLine: markLine
				? {
						symbol: 'none',
						lineStyle: { type: 'dashed', color: '#10b981' },
						data: [{ yAxis: markLine }],
					}
				: undefined,
		};
	} else {
		// Single series bar chart
		const values = categories.map((category) => {
			const item = data.find((d) => d[xAxisField] === category);
			return item ? (item[yAxisField] as number) : 0;
		});

		return {
			...baseOption,
			xAxis: {
				type: 'category',
				data: categories,
			},
			yAxis: {
				type: 'value',
				name: yAxisUnit,
				max: yAxisMax,
				axisLabel: yAxisUnit
					? { formatter: `{value}${yAxisUnit}` }
					: undefined,
			},
			series: [
				{
					type: 'bar',
					data: values,
					itemStyle: { color: CHART_COLORS[0] },
					barMaxWidth: 30,
					label: {
						show: true,
						position: 'top',
						formatter: `{c}${yAxisUnit || ''}`,
					},
				},
			],
			markLine: markLine
				? {
						symbol: 'none',
						lineStyle: { type: 'dashed', color: '#10b981' },
						data: [{ yAxis: markLine }],
					}
				: undefined,
		};
	}
}

function transformLineChart(
	chartData: ChartData,
	baseOption: EChartsOption
): EChartsOption {
	const {
		data,
		xAxisField,
		yAxisField,
		seriesField,
		yAxisUnit,
		yAxisMax,
		smooth,
		areaStyle,
	} = chartData;

	// Extract unique categories for x-axis
	const categories = [
		...new Set(data.map((item) => item[xAxisField] as string)),
	];

	// If seriesField exists, group data by series
	if (seriesField) {
		const seriesGroups = groupBy(data, seriesField);
		const series = Object.entries(seriesGroups).map(
			([name, seriesData], index) => ({
				name,
				type: 'line' as const,
				data: categories.map((category) => {
					const item = seriesData.find(
						(d) => d[xAxisField] === category
					);
					return item ? (item[yAxisField] as number) : 0;
				}),
				itemStyle: { color: CHART_COLORS[index % CHART_COLORS.length] },
				smooth: smooth || false,
				areaStyle: areaStyle
					? { color: CHART_COLORS[index % CHART_COLORS.length] }
					: undefined,
			})
		);

		return {
			...baseOption,
			legend: { top: 0, data: Object.keys(seriesGroups) },
			xAxis: {
				type: 'category',
				data: categories,
			},
			yAxis: {
				type: 'value',
				name: yAxisUnit,
				max: yAxisMax,
				axisLabel: yAxisUnit
					? { formatter: `{value}${yAxisUnit}` }
					: undefined,
			},
			series,
		};
	} else {
		// Single series line chart
		const values = categories.map((category) => {
			const item = data.find((d) => d[xAxisField] === category);
			return item ? (item[yAxisField] as number) : 0;
		});

		return {
			...baseOption,
			xAxis: {
				type: 'category',
				data: categories,
			},
			yAxis: {
				type: 'value',
				name: yAxisUnit,
				max: yAxisMax,
				axisLabel: yAxisUnit
					? { formatter: `{value}${yAxisUnit}` }
					: undefined,
			},
			series: [
				{
					type: 'line',
					data: values,
					itemStyle: { color: CHART_COLORS[0] },
					smooth: smooth || false,
					areaStyle: areaStyle
						? { color: CHART_COLORS[0] }
						: undefined,
				},
			],
		};
	}
}

function transformMapChart(
	chartData: ChartData,
	baseOption: EChartsOption
): EChartsOption {
	const { data, nameField, valueField, mapType } = chartData;

	if (!mapType || !nameField || !valueField) {
		return baseOption;
	}

	const values = data.map((d) => d[valueField] as number);
	const minValue = Math.min(...values);
	const maxValue = Math.max(...values);

	return {
		...baseOption,
		tooltip: { trigger: 'item' },
		visualMap: {
			left: 0,
			min: minValue,
			max: maxValue,
			inRange: {
				color: ['#e2e8f0', '#1e293b'],
			},
		},
		geo: { map: mapType, roam: false },
		series: [
			{
				type: 'map',
				map: mapType,
				data: data.map((item) => ({
					name: item[nameField] as string,
					value: item[valueField] as number,
				})),
			},
		],
	};
}

function transformWaterfallChart(
	chartData: ChartData,
	baseOption: EChartsOption
): EChartsOption {
	const { data, xAxisField, yAxisField, yAxisUnit } = chartData;

	const categories = data.map((item) => item[xAxisField] as string);
	const values = data.map((item) => item[yAxisField] as number);

	return {
		...baseOption,
		xAxis: {
			type: 'category',
			data: categories,
		},
		yAxis: {
			type: 'value',
			name: yAxisUnit,
			axisLabel: yAxisUnit
				? { formatter: `{value}${yAxisUnit}` }
				: undefined,
		},
		series: [
			{
				type: 'bar',
				data: values,
				itemStyle: { color: CHART_COLORS[0] },
				barMaxWidth: 30,
			},
		],
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

// Utility function to group array by key
function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
	return array.reduce(
		(groups, item) => {
			const group = String(item[key]);
			if (!groups[group]) {
				groups[group] = [];
			}
			groups[group].push(item);
			return groups;
		},
		{} as Record<string, T[]>
	);
}

/**
 * Load and parse chart data from JSON file
 */
export async function loadChartData(): Promise<ChartDataConfig> {
	try {
		const response = await fetch('/chart-data-reference.json');
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
