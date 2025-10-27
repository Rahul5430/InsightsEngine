import type { EChartsOption } from 'echarts';

// Color palette for automatic assignment - vibrant, accessible colors
const CHART_COLORS = [
	'#3b82f6', // blue
	'#10b981', // green
	'#f59e0b', // amber
	'#ef4444', // red
	'#8b5cf6', // violet
	'#06b6d4', // cyan
	'#f97316', // orange
	'#ec4899', // pink
	'#14b8a6', // teal
	'#a855f7', // purple
	'#22c55e', // emerald
	'#6366f1', // indigo
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
		grid: { left: 60, right: 20, top: 20, bottom: 50 },
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
			legend: {
				top: 5,
				left: 'center',
				itemGap: 20,
				textStyle: { fontSize: 11 },
				data: Object.keys(seriesGroups),
			},
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
				areaStyle: areaStyle ? { opacity: 0.3 } : undefined,
			})
		);

		return {
			...baseOption,
			legend: {
				top: 5,
				left: 'center',
				itemGap: 20,
				textStyle: { fontSize: 11 },
				data: Object.keys(seriesGroups),
			},
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

	const values = data
		.map((d) => d[valueField] as number)
		.filter((v) => v != null);

	// Handle edge cases where all values are 0 or null
	if (values.length === 0 || values.every((v) => v === 0)) {
		const minValue = 0;
		const maxValue = 100; // Default max for empty data
		return {
			...baseOption,
			tooltip: { trigger: 'item' },
			visualMap: {
				left: 0,
				min: minValue,
				max: maxValue,
				inRange: {
					color: ['#e2e8f0', '#3b82f6', '#1e40af'],
				},
				textStyle: { color: '#64748b' },
			},
			geo: {
				map: mapType,
				roam: false,
				itemStyle: { borderColor: '#cbd5e1' },
			},
			series: [
				{
					type: 'map',
					map: mapType,
					data: data.map((item) => ({
						name: item[nameField] as string,
						value: (item[valueField] || 0) as number,
					})),
					itemStyle: { areaColor: '#f1f5f9' },
				},
			],
		};
	}

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
				color: ['#dbeafe', '#93c5fd', '#3b82f6', '#2563eb', '#1e40af'], // Light to dark blue gradient
			},
			textStyle: { color: '#64748b' },
			calculable: false,
		},
		geo: {
			map: mapType,
			roam: false,
			layoutCenter: ['50%', '50%'],
			layoutSize: '100%',
			zoom: 1,
			itemStyle: {
				borderColor: '#cbd5e1',
				borderWidth: 1,
				areaColor: '#f1f5f9', // Default color for states without data
			},
			emphasis: {
				itemStyle: {
					areaColor: '#3b82f6',
					borderColor: '#1e40af',
					borderWidth: 2,
				},
				label: {
					show: true,
					fontSize: 12,
					fontWeight: 'bold',
					color: '#1e293b',
				},
			},
		},
		series: [
			{
				type: 'map',
				map: mapType,
				data: data.map((item) => ({
					name: item[nameField] as string,
					value: (item[valueField] || 0) as number,
				})),
				label: {
					show: false,
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 12,
						fontWeight: 'bold',
					},
					itemStyle: {
						areaColor: '#3b82f6',
						borderColor: '#1e40af',
						borderWidth: 2,
					},
				},
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
