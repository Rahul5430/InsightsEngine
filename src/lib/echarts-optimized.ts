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
import dynamic from 'next/dynamic';

// Register only the components we actually use
echarts.use([
	MapChart,
	GeoComponent,
	TooltipComponent,
	LegendComponent,
	CanvasRenderer,
]);

// Force passive listeners globally to fix performance violations
if (typeof window !== 'undefined') {
	const originalAddEventListener = EventTarget.prototype.addEventListener;
	EventTarget.prototype.addEventListener = function (
		type,
		listener,
		options
	) {
		// Force passive for scroll-blocking events
		if (typeof options === 'object' && options !== null) {
			options.passive = true;
		} else if (options === undefined) {
			options = { passive: true };
		}
		return originalAddEventListener.call(this, type, listener, options);
	};
}

// Configure ECharts for better performance
echarts.registerTheme('insights-engine', {
	// Optimize animations for better performance
	animation: false, // Disable animations to prevent performance issues
	animationDuration: 0,
	animationEasing: 'linear',
	animationDurationUpdate: 0,
	animationEasingUpdate: 'linear',
	// Disable heavy features
	blendMode: 'normal',
	hoverLayerThreshold: 3000,
	// Optimize rendering
	useUTC: true,
	textStyle: {
		fontFamily: 'system-ui, -apple-system, sans-serif',
	},
});

// Lazy load ReactECharts to reduce initial bundle
export const ReactECharts = dynamic(() => import('echarts-for-react'), {
	ssr: false,
});

// Export the core echarts instance
export { echarts };
export type { EChartsOption };

// Utility function to register maps dynamically
export const registerMap = (name: string, geoJson: unknown) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	echarts.registerMap(name, geoJson as any);
};
