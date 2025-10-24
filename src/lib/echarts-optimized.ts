// Optimized ECharts imports to reduce bundle size
import type { EChartsOption } from 'echarts';
import { MapChart } from 'echarts/charts';
import {
	GeoComponent,
	LegendComponent,
	TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { lazy } from 'react';

// Register only the components we actually use
echarts.use([
	MapChart,
	GeoComponent,
	TooltipComponent,
	LegendComponent,
	CanvasRenderer,
]);

// Lazy load ReactECharts to reduce initial bundle
export const ReactECharts = lazy(() =>
	import('echarts-for-react').then((module) => ({ default: module.default }))
);

// Export the core echarts instance
export { echarts };
export type { EChartsOption };

// Utility function to register maps dynamically
export const registerMap = (name: string, geoJson: unknown) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	echarts.registerMap(name, geoJson as any);
};
