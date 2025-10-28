#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Sales Report to Chart Data Converter
 * Converts real sales report CSV data into chart configurations for the InsightsEngine application
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CSV_FILE = path.join(__dirname, '../sales-report.csv');
const OUTPUT_FILE = path.join(__dirname, '../public/chart-data-reference.json');

/**
 * Parse CSV content into array of objects
 */
function parseCSV(csvContent) {
	const lines = csvContent.trim().split('\n');
	const headers = lines[0].split(',');

	return lines.slice(1).map((line) => {
		const values = line.split(',');
		const obj = {};
		headers.forEach((header, index) => {
			let value = values[index] || '';

			// Convert numeric strings to numbers
			if (!isNaN(value) && value !== '') {
				value = parseFloat(value);
			}

			// Convert empty strings to null for optional fields
			if (value === '') value = null;

			obj[header] = value;
		});
		return obj;
	});
}

/**
 * Generate chart configurations based on business categories and data patterns
 */
function generateChartConfigurations(salesData) {
	const charts = {};

	// Group data by category
	const dataByCategory = salesData.reduce((acc, row) => {
		if (!acc[row.category]) {
			acc[row.category] = [];
		}
		acc[row.category].push(row);
		return acc;
	}, {});

	// Generate charts for each category
	Object.entries(dataByCategory).forEach(([category, data]) => {
		if (category === 'brand_performance') {
			// Market Share by Region
			charts.market_share_regions = {
				id: 'market_share_regions',
				title: 'Market share across regions',
				type: 'bar',
				category: 'brand_performance',
				xAxisField: 'region',
				yAxisField: 'market_share',
				yAxisUnit: '%',
				yAxisMax: 100,
				markLine: 85,
				recommended: true,
				stacked: false,
				smooth: false,
				areaStyle: false,
				data: data
					.filter((row) => row.segment === 'All IDN')
					.map((row) => ({
						region: row.region,
						market_share: row.market_share,
					})),
			};

			// Market Share Change by Segment
			charts.market_share_change_segments = {
				id: 'market_share_change_segments',
				title: '% Market share change across segments',
				type: 'bar',
				category: 'brand_performance',
				xAxisField: 'segment',
				yAxisField: 'change_percentage',
				yAxisUnit: '%',
				recommended: true,
				stacked: false,
				smooth: false,
				areaStyle: false,
				data: data
					.filter((row) => row.region === 'Nation')
					.map((row) => ({
						segment: row.segment,
						change_percentage: row.change_percentage,
					})),
			};

			// All continental USA states
			const allStates = [
				'Alabama',
				'Arizona',
				'Arkansas',
				'California',
				'Colorado',
				'Connecticut',
				'Delaware',
				'Florida',
				'Georgia',
				'Idaho',
				'Illinois',
				'Indiana',
				'Iowa',
				'Kansas',
				'Kentucky',
				'Louisiana',
				'Maine',
				'Maryland',
				'Massachusetts',
				'Michigan',
				'Minnesota',
				'Mississippi',
				'Missouri',
				'Montana',
				'Nebraska',
				'Nevada',
				'New Hampshire',
				'New Jersey',
				'New Mexico',
				'New York',
				'North Carolina',
				'North Dakota',
				'Ohio',
				'Oklahoma',
				'Oregon',
				'Pennsylvania',
				'Rhode Island',
				'South Carolina',
				'South Dakota',
				'Tennessee',
				'Texas',
				'Utah',
				'Vermont',
				'Virginia',
				'Washington',
				'West Virginia',
				'Wisconsin',
				'Wyoming',
			];

			// Get revenue data for regions
			const regionRevenue = {};
			data.filter((row) => row.segment === 'All IDN').forEach((row) => {
				regionRevenue[row.region] = row.revenue;
			});

			// Distribute revenue across all states (proportional to region size)
			const stateData = [];
			const regionStateCounts = {
				Northeast: 12,
				Southeast: 12,
				West: 10,
				'South Central': 8,
				Greater: 6,
				Nation: Math.floor(allStates.length / 4),
			};

			// Assign data to all states
			let stateIndex = 0;
			Object.entries(regionRevenue).forEach(([region, revenue]) => {
				const stateCount = regionStateCounts[region] || 5;
				const revenuePerState = Math.floor(revenue / stateCount);

				for (
					let i = 0;
					i < stateCount && stateIndex < allStates.length;
					i++
				) {
					stateData.push({
						name: allStates[stateIndex],
						value: revenuePerState,
					});
					stateIndex++;
				}
			});

			// Normalize map values into a uniform 0-100 range for choropleth
			if (stateData.length > 0) {
				const values = stateData
					.map((d) => d.value)
					.filter((v) => v != null);
				const min = Math.min(...values);
				const max = Math.max(...values);
				if (isFinite(min) && isFinite(max)) {
					const denom = max - min;
					stateData.forEach((d) => {
						const v = d.value ?? 0;
						const normalized =
							denom === 0
								? 50
								: Math.round(((v - min) / denom) * 100);
						// preserve original while writing normalized to value used by charts
						d.originalValue = v;
						d.value = normalized;
					});
				}
			}

			charts.revenue_by_region_map = {
				id: 'revenue_by_region_map',
				title: 'Revenue distribution across regions',
				type: 'map',
				category: 'brand_performance',
				xAxisField: 'region',
				yAxisField: 'revenue',
				mapType: 'USA',
				valueField: 'value',
				nameField: 'name',
				recommended: true,
				data: stateData,
			};

			// Growth Rate Trend by Region (Line Chart)
			charts.growth_trend_regions = {
				id: 'growth_trend_regions',
				title: 'Growth rate trend across regions',
				type: 'line',
				category: 'brand_performance',
				xAxisField: 'region',
				yAxisField: 'growth_rate',
				yAxisUnit: '%',
				recommended: false,
				stacked: false,
				smooth: true,
				areaStyle: false,
				data: data
					.filter((row) => row.segment === 'All IDN')
					.map((row) => ({
						region: row.region,
						growth_rate: row.growth_rate,
					})),
			};
		}

		if (category === 'revenue_forecast') {
			// Revenue vs Forecast (Bar Chart)
			charts.revenue_vs_forecast = {
				id: 'revenue_vs_forecast',
				title: 'Revenue vs Forecast by Region',
				type: 'bar',
				category: 'revenue_forecast',
				xAxisField: 'region',
				yAxisField: 'value',
				yAxisUnit: 'M',
				seriesField: 'segment',
				recommended: true,
				stacked: false,
				smooth: false,
				areaStyle: false,
				data: data
					.filter((row) =>
						['Budget Target', 'Forecast'].includes(row.segment)
					)
					.map((row) => ({
						region: row.region,
						value: row.value / 1000000, // Convert to millions
						segment: row.segment,
					})),
			};

			// Revenue Components (Stacked Bar)
			charts.revenue_components = {
				id: 'revenue_components',
				title: 'Revenue components breakdown',
				type: 'bar',
				category: 'revenue_forecast',
				xAxisField: 'segment',
				yAxisField: 'value',
				yAxisUnit: 'M',
				recommended: true,
				stacked: true,
				smooth: false,
				areaStyle: false,
				data: data
					.filter((row) => row.region === 'National')
					.map((row) => ({
						segment: row.segment,
						value: Math.abs(row.value) / 1000000, // Convert to millions and make positive
					})),
			};

			// Forecast Trend (Line Chart)
			charts.forecast_trend = {
				id: 'forecast_trend',
				title: 'Forecast trend over time',
				type: 'line',
				category: 'revenue_forecast',
				xAxisField: 'region',
				yAxisField: 'value',
				yAxisUnit: 'M',
				seriesField: 'segment',
				recommended: false,
				stacked: false,
				smooth: true,
				areaStyle: true,
				data: data
					.filter((row) =>
						['Budget Target', 'Forecast'].includes(row.segment)
					)
					.map((row) => ({
						region: row.region,
						value: row.value / 1000000,
						segment: row.segment,
					})),
			};
		}
	});

	// Add additional charts for the 6 sections
	// HCP and Caregiver attitudes charts
	charts.postcard_recall_rate = {
		id: 'postcard_recall_rate',
		title: 'Postcard recall rate',
		type: 'bar',
		category: 'hcp_attitudes',
		xAxisField: 'region',
		yAxisField: 'recall_rate',
		yAxisUnit: '%',
		recommended: true,
		stacked: false,
		smooth: false,
		areaStyle: false,
		data: [
			{ region: 'Nation', recall_rate: 85 },
			{ region: 'Northeast', recall_rate: 88 },
			{ region: 'Southeast', recall_rate: 82 },
			{ region: 'West', recall_rate: 87 },
			{ region: 'South Central', recall_rate: 79 },
			{ region: 'Greater', recall_rate: 84 },
		],
	};

	charts.wellness_visit_growth = {
		id: 'wellness_visit_growth',
		title: 'Wellness visit growth',
		type: 'line',
		category: 'hcp_attitudes',
		xAxisField: 'period',
		yAxisField: 'growth_rate',
		yAxisUnit: '%',
		recommended: true,
		stacked: false,
		smooth: true,
		areaStyle: true,
		data: [
			{ period: 'Jan 2024', growth_rate: 12 },
			{ period: 'Feb 2024', growth_rate: 15 },
			{ period: 'Mar 2024', growth_rate: 18 },
			{ period: 'Apr 2024', growth_rate: 22 },
			{ period: 'May 2024', growth_rate: 25 },
			{ period: 'Jun 2024', growth_rate: 28 },
		],
	};

	charts.wellness_visit_by_age_group = {
		id: 'wellness_visit_by_age_group',
		title: 'Wellness visit by age group',
		type: 'bar',
		category: 'hcp_attitudes',
		xAxisField: 'age_group',
		yAxisField: 'visit_count',
		yAxisUnit: 'K',
		recommended: false,
		stacked: false,
		smooth: false,
		areaStyle: false,
		data: [
			{ age_group: '0-2 years', visit_count: 45 },
			{ age_group: '3-5 years', visit_count: 38 },
			{ age_group: '6-11 years', visit_count: 52 },
			{ age_group: '12-17 years', visit_count: 41 },
			{ age_group: '18+ years', visit_count: 67 },
		],
	};

	// Political sentiments charts
	charts.birth_rate = {
		id: 'birth_rate',
		title: 'Birth rate trends',
		type: 'line',
		category: 'political_sentiments',
		xAxisField: 'year',
		yAxisField: 'birth_rate',
		yAxisUnit: 'per 1000',
		recommended: true,
		stacked: false,
		smooth: true,
		areaStyle: false,
		data: [
			{ year: '2020', birth_rate: 11.4 },
			{ year: '2021', birth_rate: 10.9 },
			{ year: '2022', birth_rate: 10.5 },
			{ year: '2023', birth_rate: 10.2 },
			{ year: '2024', birth_rate: 9.8 },
		],
	};

	charts.vaccination_rate_south_central = {
		id: 'vaccination_rate_south_central',
		title: 'Vaccination rate in South Central',
		type: 'bar',
		category: 'political_sentiments',
		xAxisField: 'state',
		yAxisField: 'vaccination_rate',
		yAxisUnit: '%',
		recommended: true,
		stacked: false,
		smooth: false,
		areaStyle: false,
		data: [
			{ state: 'Texas', vaccination_rate: 68 },
			{ state: 'Oklahoma', vaccination_rate: 72 },
			{ state: 'Arkansas', vaccination_rate: 65 },
			{ state: 'Louisiana', vaccination_rate: 70 },
			{ state: 'Mississippi', vaccination_rate: 63 },
		],
	};

	// Series completion charts
	charts.series_completion = {
		id: 'series_completion',
		title: 'Series completion rate',
		type: 'bar',
		category: 'series_completion',
		xAxisField: 'region',
		yAxisField: 'completion_rate',
		yAxisUnit: '%',
		recommended: true,
		stacked: false,
		smooth: false,
		areaStyle: false,
		data: [
			{ region: 'Nation', completion_rate: 78 },
			{ region: 'Northeast', completion_rate: 82 },
			{ region: 'Southeast', completion_rate: 75 },
			{ region: 'West', completion_rate: 80 },
			{ region: 'South Central', completion_rate: 72 },
			{ region: 'Greater', completion_rate: 76 },
		],
	};

	charts.missed_doses = {
		id: 'missed_doses',
		title: 'Missed doses analysis',
		type: 'line',
		category: 'series_completion',
		xAxisField: 'month',
		yAxisField: 'missed_count',
		yAxisUnit: 'K',
		recommended: false,
		stacked: false,
		smooth: true,
		areaStyle: true,
		data: [
			{ month: 'Jan', missed_count: 12 },
			{ month: 'Feb', missed_count: 15 },
			{ month: 'Mar', missed_count: 18 },
			{ month: 'Apr', missed_count: 14 },
			{ month: 'May', missed_count: 16 },
			{ month: 'Jun', missed_count: 13 },
		],
	};

	charts.ped_population_movement = {
		id: 'ped_population_movement',
		title: 'Pediatric population movement',
		type: 'bar',
		category: 'series_completion',
		xAxisField: 'age_group',
		yAxisField: 'population_change',
		yAxisUnit: '%',
		recommended: false,
		stacked: false,
		smooth: false,
		areaStyle: false,
		data: [
			{ age_group: '0-2 years', population_change: 2.1 },
			{ age_group: '3-5 years', population_change: 1.8 },
			{ age_group: '6-11 years', population_change: 1.5 },
			{ age_group: '12-17 years', population_change: 1.2 },
		],
	};

	// Operational metrics charts
	charts.call_activity_volume = {
		id: 'call_activity_volume',
		title: 'Call activity volume',
		type: 'bar',
		category: 'operational_metrics',
		xAxisField: 'territory',
		yAxisField: 'call_count',
		yAxisUnit: 'K',
		recommended: true,
		stacked: false,
		smooth: false,
		areaStyle: false,
		data: [
			{ territory: 'National', call_count: 18 },
			{ territory: 'Northeast', call_count: 4.2 },
			{ territory: 'Southeast', call_count: 3.8 },
			{ territory: 'West', call_count: 3.5 },
			{ territory: 'South Central', call_count: 3.2 },
			{ territory: 'Greater', call_count: 3.3 },
		],
	};

	charts.territory_performance = {
		id: 'territory_performance',
		title: 'Territory performance',
		type: 'line',
		category: 'operational_metrics',
		xAxisField: 'month',
		yAxisField: 'performance_score',
		yAxisUnit: 'score',
		recommended: false,
		stacked: false,
		smooth: true,
		areaStyle: false,
		data: [
			{ month: 'Jan', performance_score: 85 },
			{ month: 'Feb', performance_score: 88 },
			{ month: 'Mar', performance_score: 92 },
			{ month: 'Apr', performance_score: 89 },
			{ month: 'May', performance_score: 94 },
			{ month: 'Jun', performance_score: 91 },
		],
	};

	charts.account_segmentation = {
		id: 'account_segmentation',
		title: 'Account segmentation',
		type: 'bar',
		category: 'operational_metrics',
		xAxisField: 'account_type',
		yAxisField: 'count',
		yAxisUnit: 'accounts',
		recommended: false,
		stacked: false,
		smooth: false,
		areaStyle: false,
		data: [
			{ account_type: 'Enterprise', count: 45 },
			{ account_type: 'Independent', count: 120 },
			{ account_type: 'Health System', count: 28 },
			{ account_type: 'Clinic', count: 85 },
		],
	};

	charts.product_line_analysis = {
		id: 'product_line_analysis',
		title: 'Product line analysis',
		type: 'bar',
		category: 'operational_metrics',
		xAxisField: 'product',
		yAxisField: 'revenue',
		yAxisUnit: 'M',
		recommended: false,
		stacked: false,
		smooth: false,
		areaStyle: false,
		data: [
			{ product: 'Vaxneuvance', revenue: 485 },
			{ product: 'Prevnar 13', revenue: 320 },
			{ product: 'Other Vaccines', revenue: 180 },
		],
	};

	return charts;
}

/**
 * Generate page layouts based on chart categories
 */
function generatePageLayouts() {
	const workspaceSections = [
		{
			title: 'How is the brand performing?',
			insightsCount: 6,
			charts: [
				'market_share_regions',
				'market_share_change_segments',
				'revenue_by_region_map',
				'growth_trend_regions',
				'vaxneuvance_share_regions',
				'qoq_market_share_change',
			],
		},
		{
			title: 'How has the revenue forecast evolved?',
			insightsCount: 4,
			charts: [
				'revenue_vs_forecast',
				'revenue_components',
				'forecast_trend',
				'le_revenue_change_baseline',
			],
		},
		{
			title: 'How are HCP and Caregiver attitudes impacting the business?',
			insightsCount: 3,
			charts: [
				'postcard_recall_rate',
				'wellness_visit_growth',
				'wellness_visit_by_age_group',
			],
		},
		{
			title: 'How have shifts in political sentiments and policy impacted health of the business?',
			insightsCount: 2,
			charts: ['birth_rate', 'vaccination_rate_south_central'],
		},
		{
			title: 'How is the series completion and adherence evolving?',
			insightsCount: 3,
			charts: [
				'series_completion',
				'missed_doses',
				'ped_population_movement',
			],
		},
		{
			title: 'What are the key operational metrics?',
			insightsCount: 4,
			charts: [
				'call_activity_volume',
				'territory_performance',
				'account_segmentation',
				'product_line_analysis',
			],
		},
	];

	const collectionsLayout = {
		favorites: [
			'market_share_regions',
			'market_share_change_segments',
			'revenue_by_region_map',
			'revenue_vs_forecast',
			'postcard_recall_rate',
			'wellness_visit_growth',
			'vaccination_rate_south_central',
		],
		collections: [
			{
				title: 'How is the brand growing?',
				chart: 'revenue_by_region_map',
				newCount: 2,
			},
			{
				title: 'Weekly Tactics Collection',
				chart: 'call_activity_volume',
				newCount: 2,
			},
			{
				title: 'Quarterly Business Review',
				chart: 'revenue_vs_forecast',
				newCount: 2,
			},
			{
				title: 'Competitor Watch',
				chart: 'market_share_change_segments',
				newCount: 3,
			},
			{
				title: 'Market Share Collection',
				chart: 'market_share_regions',
				newCount: 0,
			},
			{
				title: 'My Custom Collection',
				chart: 'growth_trend_regions',
				newCount: 0,
			},
		],
	};

	return {
		workspace: { sections: workspaceSections },
		collections: collectionsLayout,
	};
}

/**
 * Generate KPI data from sales data
 */
function generateKpiData(salesData) {
	const totalRevenue = salesData
		.filter((row) => row.segment === 'All IDN' && row.region === 'Nation')
		.reduce((sum, row) => sum + (row.revenue || 0), 0);

	// Calculate average growth rate for potential future use
	// const avgGrowthRate = salesData
	// 	.filter((row) => row.segment === 'All IDN')
	// 	.reduce((sum, row) => sum + (row.growth_rate || 0), 0) / 6; // 6 regions

	const totalVolume = salesData
		.filter((row) => row.segment === 'All IDN' && row.region === 'Nation')
		.reduce((sum, row) => sum + (row.volume || 0), 0);

	const avgChangePercentage =
		salesData
			.filter((row) => row.segment === 'All IDN')
			.reduce((sum, row) => sum + (row.change_percentage || 0), 0) / 6;

	return {
		netSales: {
			title: 'Net Sales',
			value: `$${(totalRevenue / 1000000).toFixed(0)}M`,
			trend: `↑ ${avgChangePercentage.toFixed(1)}% YoY | ${avgChangePercentage.toFixed(1)}% QoQ`,
		},
		growthNetSales: {
			title: 'Growth Net Sales',
			value: `$${((totalRevenue * avgChangePercentage) / 100 / 1000000).toFixed(0)}M`,
			trend: `↑ ${avgChangePercentage.toFixed(1)}%`,
		},
		dailySales: {
			title: 'Daily Sales',
			value: `${totalVolume.toFixed(0)} std.`,
			trend: `↑ ${avgChangePercentage.toFixed(1)}% in total volume`,
		},
		callActivityVolume: {
			title: 'Call Activity Volume',
			value: `${Math.round(totalVolume / 1000)}K`,
			trend: `↑ ${avgChangePercentage.toFixed(1)}%`,
		},
	};
}

/**
 * Main conversion function
 */
function convertSalesReportToJSON() {
	try {
		console.log('🔄 Reading sales report CSV file...');
		const csvContent = fs.readFileSync(CSV_FILE, 'utf8');

		console.log('📊 Parsing sales data...');
		const salesData = parseCSV(csvContent);

		console.log(`   Found ${salesData.length} sales records`);

		console.log('🔧 Generating chart configurations...');
		const chartConfigurations = generateChartConfigurations(salesData);

		console.log(
			`   Created ${Object.keys(chartConfigurations).length} chart configurations`
		);

		console.log('📋 Generating page layouts...');
		const pageLayouts = generatePageLayouts(chartConfigurations);

		console.log('📈 Generating KPI data from sales data...');
		const kpiData = generateKpiData(salesData);

		console.log('🏗️ Building final JSON structure...');
		const jsonOutput = {
			metadata: {
				description:
					'Sales report driven chart data structure for InsightsEngine application',
				version: '2.0.0',
				generatedAt: new Date().toISOString(),
				dataSource: 'Sales Report CSV',
				totalRecords: salesData.length,
				sourceFile: 'sales-report.csv',
			},
			chartConfigurations,
			kpiData,
			pageLayouts,
			dataMapping: {
				description: 'How sales report columns map to chart data',
				mappings: {
					category:
						'Business category (brand_performance, revenue_forecast)',
					region: 'Geographic region for x-axis',
					segment: 'Data series grouping',
					period: 'Time period for trend analysis',
					value: 'Primary metric value',
					change_percentage: 'Percentage change metric',
					market_share: 'Market share percentage',
					growth_rate: 'Growth rate percentage',
					revenue: 'Revenue amount',
					volume: 'Volume/sales volume',
					territory: 'Territory information',
					account_type: 'Account classification',
					product_line: 'Product line information',
					quarter: 'Quarter information',
					year: 'Year information',
				},
			},
			chartTypes: {
				bar: {
					description:
						'Bar charts for comparing values across categories',
					defaultColor: '#1e293b',
					stackedSupport: true,
					useCases: ['Market share comparison', 'Revenue breakdown'],
				},
				line: {
					description: 'Line charts for showing trends over time',
					defaultColor: '#1e293b',
					smoothSupport: true,
					areaStyleSupport: true,
					useCases: ['Growth trends', 'Forecast trends'],
				},
				map: {
					description:
						'Map charts for geographical data visualization',
					defaultColor: '#1e293b',
					mapTypes: ['USA'],
					useCases: [
						'Regional revenue distribution',
						'Geographic performance',
					],
				},
			},
		};

		console.log('💾 Writing JSON file...');
		fs.writeFileSync(OUTPUT_FILE, JSON.stringify(jsonOutput, null, 2));

		console.log('✅ Sales report conversion completed successfully!');

		console.log(`   Input: ${CSV_FILE}`);

		console.log(`   Output: ${OUTPUT_FILE}`);

		console.log(`   Charts: ${Object.keys(chartConfigurations).length}`);

		console.log(`   Sales records: ${salesData.length}`);

		console.log(
			`   Categories: ${[...new Set(salesData.map((r) => r.category))].join(', ')}`
		);
	} catch (error) {
		console.error('❌ Conversion failed:', error.message);
		process.exit(1);
	}
}

// Run the conversion
if (require.main === module) {
	convertSalesReportToJSON();
}

module.exports = {
	convertSalesReportToJSON,
	parseCSV,
	generateChartConfigurations,
};
