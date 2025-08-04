import { cn } from '@/lib/utils';

// src/widgets/widgetRegistry.tsx
export type WidgetKey = 'weather' | 'chart' | 'text';

export const widgetRegistry = {
	weather: {
		id: 'weather',
		name: 'Weather Widget',
		description: 'Shows current weather info.',
		image: '@/../src/assets/weather.jpg',
		defaultW: 4,
		defaultH: 2,
		component: () => (
			<div className={cn('rounded-sm p-4 shadow-sm border transition-colors', 'bg-white text-black border-gray-200', 'dark:bg-gray-900 dark:text-white dark:border-gray-700')}>
				Weather Info
			</div>
		),
	},
	chart: {
		id: 'chart',
		name: 'Chart Widget',
		description: 'Displays analytics in chart form.',
		image: '@/../src/assets/chart.jpg',
		defaultW: 6,
		defaultH: 3,
		component: () => (
			<div className={cn('rounded-md p-4 shadow-sm border transition-colors', 'bg-white text-black border-gray-200', 'dark:bg-gray-900 dark:text-white dark:border-gray-700')}>
				Chart
			</div>
		),
	},
	text: {
		id: 'text',
		name: 'Text Widget',
		description: 'Write notes or reminders.',
		image: '@/../src/assets/gender.jpg',
		defaultW: 3,
		defaultH: 2,
		component: () => (
			<div className={cn('rounded-md p-4 shadow-sm border transition-colors', 'bg-white text-black border-gray-200', 'dark:bg-gray-900 dark:text-white dark:border-gray-700')}>
				Text Note
			</div>
		),
	},
};
