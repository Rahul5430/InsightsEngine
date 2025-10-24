# Sales Report to Chart Data Conversion

This document explains how to convert real sales report CSV data into chart configurations for the InsightsEngine application.

## Overview

The application now supports real sales report data where business metrics are automatically converted into meaningful chart visualizations. This eliminates the need for technical chart configuration columns.

## Files

- `sales-report.csv` - Real sales report data with business metrics
- `scripts/sales-report-converter.js` - Node.js script that converts sales data to charts
- `public/chart-data-reference.json` - Generated JSON file used by the application

## Sales Report CSV Format

The sales report CSV uses standard business columns:

### Required Columns

- `category` - Business category (brand_performance, revenue_forecast, etc.)
- `region` - Geographic region (Nation, Northeast, Southeast, West, etc.)
- `value` - Primary metric value (revenue, sales, etc.)
- `change_percentage` - Percentage change metric

### Business Data Columns

- `segment` - Business segment (All IDN, Independent, Budget Target, Forecast, etc.)
- `period` - Time period (2024, Q4, etc.)
- `market_share` - Market share percentage
- `growth_rate` - Growth rate percentage
- `revenue` - Revenue amount
- `volume` - Sales volume
- `territory` - Territory information
- `account_type` - Account classification (Enterprise, Independent, etc.)
- `product_line` - Product line (Vaxneuvance, etc.)
- `quarter` - Quarter information
- `year` - Year information

## Automatic Chart Generation

The converter automatically creates charts based on data patterns:

### Brand Performance Category

- **Market Share by Region** (Bar Chart)
    - X-axis: region
    - Y-axis: market_share
    - Data: All IDN segment only
    - Mark line at 85%

- **Market Share Change by Segment** (Bar Chart)
    - X-axis: segment
    - Y-axis: change_percentage
    - Data: Nation region only

- **Revenue Distribution Map** (Map Chart)
    - Geographic regions
    - Revenue values
    - USA map type

- **Growth Rate Trend** (Line Chart)
    - X-axis: region
    - Y-axis: growth_rate
    - Smooth curves

### Revenue Forecast Category

- **Revenue vs Forecast** (Bar Chart)
    - X-axis: region
    - Y-axis: value (in millions)
    - Series: Budget Target vs Forecast

- **Revenue Components** (Stacked Bar Chart)
    - X-axis: segment
    - Y-axis: value (in millions)
    - Stacked by component

- **Forecast Trend** (Line Chart)
    - X-axis: region
    - Y-axis: value (in millions)
    - Series: Budget Target vs Forecast
    - Area style enabled

## KPI Generation

KPIs are automatically calculated from sales data:

- **Net Sales**: Total revenue from All IDN segment
- **Growth Net Sales**: Calculated growth revenue
- **Daily Sales**: Total volume in standard units
- **Call Activity Volume**: Volume-based activity metric

## Usage

### Convert Sales Report to Charts

```bash
# Using npm script
npm run convert

# Or directly with node
node scripts/sales-report-converter.js

# Or use the old CSV converter
npm run convert-csv
```

### Adding New Sales Data

1. Add new rows to `sales-report.csv` with real business data
2. Run the conversion script: `npm run convert`
3. Charts are automatically generated based on data patterns
4. New charts appear in the application

### Adding New Categories

1. Add new `category` values to your sales data
2. Update the `generateChartConfigurations` function in the converter
3. Add chart generation logic for the new category
4. Run the conversion script

## Data Mapping

The converter intelligently maps sales data to chart configurations:

| Sales Column        | Chart Usage                  | Example                            |
| ------------------- | ---------------------------- | ---------------------------------- |
| `category`          | Determines chart grouping    | `brand_performance` → Brand charts |
| `region`            | X-axis for geographic charts | `Northeast` → Bar chart category   |
| `segment`           | Series grouping              | `All IDN` → Data series            |
| `value`             | Primary Y-axis metric        | `485000000` → Chart value          |
| `change_percentage` | Change metrics               | `32` → Growth indicators           |
| `market_share`      | Market share charts          | `94` → Market share bars           |
| `growth_rate`       | Trend analysis               | `15.2` → Line chart points         |
| `revenue`           | Revenue visualizations       | `485000000` → Revenue maps         |

## Chart Types by Data Pattern

### Bar Charts

- **Single Series**: When one segment per region
- **Multi-Series**: When multiple segments per region
- **Stacked**: For component breakdowns

### Line Charts

- **Trend Analysis**: Growth rates over regions
- **Forecast Comparison**: Budget vs Forecast trends
- **Smooth Curves**: For trend visualization

### Map Charts

- **Geographic Distribution**: Revenue by region
- **Performance Mapping**: Market share by territory

## Business Logic

The converter applies business logic to create meaningful visualizations:

1. **Data Filtering**: Automatically filters relevant segments
2. **Unit Conversion**: Converts large numbers to millions
3. **Percentage Calculations**: Calculates growth and change metrics
4. **Geographic Grouping**: Groups data by regions
5. **Time Series**: Handles temporal data patterns

## Example Sales Data

```csv
category,region,segment,period,value,change_percentage,market_share,growth_rate,revenue,volume
brand_performance,Nation,All IDN,2024,485000000,32,94,15.2,485000000,3042
brand_performance,Northeast,All IDN,2024,520000000,28,96,12.8,520000000,3250
revenue_forecast,California,Budget Target,2024,120000000,0,0,0,120000000,750
revenue_forecast,California,Forecast,2024,260000000,117,0,117,260000000,1625
```

## Troubleshooting

### Common Issues

1. **Missing categories**: Ensure `category` column has valid values
2. **No charts generated**: Check that data has required columns
3. **Incorrect chart types**: Verify data patterns match expected formats
4. **Missing series**: Ensure `segment` column has grouping values

### Data Validation

The converter validates:

- Required columns exist
- Numeric values are properly formatted
- Categories are recognized
- Data patterns are consistent

### Debug Mode

Add console.log statements to debug:

```javascript
console.log('Sales data sample:', salesData.slice(0, 3));
console.log('Generated charts:', Object.keys(chartConfigurations));
```

## Best Practices

1. **Consistent Categories**: Use standard category names
2. **Clean Data**: Ensure numeric columns contain valid numbers
3. **Complete Records**: Include all required columns
4. **Regular Updates**: Refresh data regularly for current insights
5. **Data Quality**: Validate data before conversion

## Integration with Application

The converted JSON is automatically used by the application:

1. Charts load from `public/chart-data-reference.json`
2. Data is transformed using `src/lib/chart-data-transformer.ts`
3. Charts are rendered using ECharts components
4. All pages use the same sales-driven data source

## Advanced Configuration

### Custom Chart Generation

To add custom chart types, modify the `generateChartConfigurations` function:

```javascript
// Add custom chart for specific data pattern
if (category === 'custom_category') {
	charts.custom_chart = {
		id: 'custom_chart',
		title: 'Custom Chart Title',
		type: 'bar',
		// ... chart configuration
	};
}
```

### Custom KPI Calculations

Modify the `generateKpiData` function for custom KPIs:

```javascript
const customKPI = salesData
	.filter((row) => row.custom_condition)
	.reduce((sum, row) => sum + row.custom_metric, 0);
```

This approach makes the system truly data-driven, where business users can simply update the sales report CSV and get meaningful chart visualizations automatically generated.
