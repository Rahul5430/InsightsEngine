'use client';

import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	ChartData,
	ChartOptions,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import * as ChartGeo from 'chartjs-chart-geo';
import { useEffect, useState } from 'react';
import { Bar, Chart, Line } from 'react-chartjs-2';

import type { ChartData as ChartDataType } from './chart-data-transformer';

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	// Geo chart components
	ChartGeo.ChoroplethController,
	ChartGeo.ProjectionScale,
	ChartGeo.ColorScale,
	ChartGeo.GeoFeature
);

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

interface ChartJsProps {
	chartData: ChartDataType;
	height?: number;
}

export function ChartJsChart({ chartData, height = 280 }: ChartJsProps) {
	switch (chartData.type) {
		case 'bar':
			return <ChartJsBarChart chartData={chartData} height={height} />;
		case 'line':
			return <ChartJsLineChart chartData={chartData} height={height} />;
		case 'map':
			return <ChartJsMapChart chartData={chartData} height={height} />;
		case 'waterfall':
			return (
				<ChartJsWaterfallChart chartData={chartData} height={height} />
			);
		default:
			return null;
	}
}

function ChartJsBarChart({ chartData, height }: ChartJsProps) {
	const {
		data,
		xAxisField,
		yAxisField,
		seriesField,
		yAxisUnit,
		yAxisMax,
		stacked,
	} = chartData;

	// Extract unique categories for x-axis
	const categories = [
		...new Set(data.map((item) => item[xAxisField] as string)),
	];

	// Transform data for Chart.js
	let datasets: Array<{
		label: string;
		data: number[];
		backgroundColor: string;
		stack?: string;
	}> = [];

	let seriesKeys: string[] = [];

	if (seriesField) {
		const seriesGroups = groupBy(data, seriesField);
		seriesKeys = Object.keys(seriesGroups);

		datasets = seriesKeys.map((seriesName, index) => ({
			label: seriesName,
			data: categories.map((category) => {
				const item = seriesGroups[seriesName].find(
					(d) => d[xAxisField] === category
				);
				return item ? (item[yAxisField] as number) : 0;
			}),
			backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
			stack: stacked ? 'total' : undefined,
		}));
	} else {
		datasets = [
			{
				label: 'Value',
				data: categories.map((category) => {
					const item = data.find((d) => d[xAxisField] === category);
					return item ? (item[yAxisField] as number) : 0;
				}),
				backgroundColor: CHART_COLORS[0],
			},
		];
	}

	const chartDataForChartJs: ChartData<'bar'> = {
		labels: categories,
		datasets,
	};

	const options: ChartOptions<'bar'> = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				beginAtZero: true,
				max: yAxisMax,
				ticks: {
					callback: function (value) {
						return `${value}${yAxisUnit || ''}`;
					},
				},
			},
		},
		plugins: {
			legend: {
				display: seriesField ? seriesKeys.length > 1 : false,
				position: 'top',
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						return `${context.parsed.y}${yAxisUnit || ''}`;
					},
				},
			},
		},
	};

	return (
		<div style={{ height }}>
			<Bar data={chartDataForChartJs} options={options} />
		</div>
	);
}

function ChartJsLineChart({ chartData, height }: ChartJsProps) {
	const {
		data,
		xAxisField,
		yAxisField,
		seriesField,
		yAxisUnit,
		yAxisMax,
		smooth,
	} = chartData;

	// Extract unique categories for x-axis
	const categories = [
		...new Set(data.map((item) => item[xAxisField] as string)),
	];

	// Transform data for Chart.js
	let datasets: Array<{
		label: string;
		data: number[];
		borderColor: string;
		backgroundColor: string;
		fill: boolean;
		tension?: number;
	}> = [];

	if (seriesField) {
		const seriesGroups = groupBy(data, seriesField);
		const seriesKeys = Object.keys(seriesGroups);

		datasets = seriesKeys.map((seriesName, index) => ({
			label: seriesName,
			data: categories.map((category) => {
				const item = seriesGroups[seriesName].find(
					(d) => d[xAxisField] === category
				);
				return item ? (item[yAxisField] as number) : 0;
			}),
			borderColor: CHART_COLORS[index % CHART_COLORS.length],
			backgroundColor: `${CHART_COLORS[index % CHART_COLORS.length]}33`,
			fill: false,
			tension: smooth ? 0.4 : 0,
		}));
	} else {
		datasets = [
			{
				label: 'Value',
				data: categories.map((category) => {
					const item = data.find((d) => d[xAxisField] === category);
					return item ? (item[yAxisField] as number) : 0;
				}),
				borderColor: CHART_COLORS[0],
				backgroundColor: `${CHART_COLORS[0]}33`,
				fill: false,
				tension: smooth ? 0.4 : 0,
			},
		];
	}

	const chartDataForChartJs: ChartData<'line'> = {
		labels: categories,
		datasets,
	};

	const options: ChartOptions<'line'> = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				beginAtZero: true,
				max: yAxisMax,
				ticks: {
					callback: function (value) {
						return `${value}${yAxisUnit || ''}`;
					},
				},
			},
		},
		plugins: {
			legend: {
				display: seriesField ? datasets.length > 1 : false,
				position: 'top',
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						return `${context.parsed.y}${yAxisUnit || ''}`;
					},
				},
			},
		},
	};

	return (
		<div style={{ height }}>
			<Line data={chartDataForChartJs} options={options} />
		</div>
	);
}

function ChartJsWaterfallChart({ chartData, height }: ChartJsProps) {
	const { data, xAxisField, yAxisField, yAxisUnit } = chartData;

	const chartDataForChartJs: ChartData<'bar'> = {
		labels: data.map((item) => item[xAxisField] as string),
		datasets: [
			{
				label: 'Value',
				data: data.map((item) => item[yAxisField] as number),
				backgroundColor: CHART_COLORS[0],
			},
		],
	};

	const options: ChartOptions<'bar'> = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					callback: function (value) {
						return `${value}${yAxisUnit || ''}`;
					},
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						return `${context.parsed.y}${yAxisUnit || ''}`;
					},
				},
			},
		},
	};

	return (
		<div style={{ height }}>
			<Bar data={chartDataForChartJs} options={options} />
		</div>
	);
}

function ChartJsMapChart({ chartData, height }: ChartJsProps) {
	const [geoData, setGeoData] = useState<Array<Record<string, unknown>>>([]);
	const { nameField, valueField, mapType } = chartData;

	// Load GeoJSON/TopoJSON data for USA map
	useEffect(() => {
		if (mapType === 'USA') {
			import('@/data/USA.json')
				.then((mod) => {
					const usaData = mod.default as Record<string, unknown>;
					// Check if it's topojson format (has objects property)
					if (usaData.objects && usaData.type === 'Topology') {
						// Convert topojson to geojson features
						// Access the "usa" key from objects
						const usaObject = (
							usaData.objects as Record<string, unknown>
						).usa;
						const features =
							(
								ChartGeo.topojson.feature(
									// @ts-expect-error - will be fixed later on
									usaData,
									usaObject
								) as unknown as {
									features: Array<Record<string, unknown>>;
								}
							).features || [];
						setGeoData(features);
					} else {
						// It's already GeoJSON
						const features = (usaData.features || []) as Array<
							Record<string, unknown>
						>;
						setGeoData(features);
					}
				})
				.catch(() => {
					// Silently handle error - map will show loading state
				});
		}
	}, [mapType]);

	// Show loading state if data not ready
	if (!geoData || geoData.length === 0) {
		return (
			<div
				className='flex items-center justify-center bg-slate-50'
				style={{ height }}
			>
				<div className='text-slate-500'>Loading map data...</div>
			</div>
		);
	}

	// Create mapping from name to value
	const valueMap = new Map<string, number>();
	if (nameField && valueField && chartData.data) {
		chartData.data.forEach((item) => {
			const name = item[nameField] as string;
			const value = item[valueField] as number;
			if (name && value !== undefined) {
				valueMap.set(name, value);
			}
		});
	}

	// Transform data for choropleth chart
	const datasets = [
		{
			outline: geoData,
			label: 'Value',
			data: geoData.map((feature) => {
				const properties = feature.properties as
					| { name?: string }
					| undefined;

				const stateName = properties?.name || '';

				return {
					feature: feature,
					value: valueMap.get(stateName) || 0,
				};
			}),
		},
	];

	// Chart data structure
	const chartDataForChartJs = {
		datasets,
	};

	// Chart options
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		showOutline: true,
		showGraticule: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: (
						context: Record<string, unknown> & {
							formattedValue?: string;
						}
					) => {
						const element = context.element as
							| {
									feature?: {
										properties?: { name?: string };
									};
							  }
							| undefined;
						const stateName =
							element?.feature?.properties?.name || 'Unknown';
						const value = context.formattedValue || '0';
						return `${stateName}: ${value}`;
					},
				},
			},
		},
		scales: {
			xy: {
				projection: 'albersUsa',
			} as Record<string, unknown>,
		},
	};

	return (
		<div style={{ height }}>
			<Chart
				type='choropleth'
				data={chartDataForChartJs}
				// @ts-expect-error - choropleth type not fully supported in types
				options={options}
			/>
		</div>
	);
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
