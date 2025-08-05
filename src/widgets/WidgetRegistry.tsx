import { Widget1 } from './Widget1';
import { Widget2 } from './Widget2';
import { Widget3 } from './Widget3';
import { Widget4 } from './Widget4';
import { Widget5 } from './Widget5';
import { Widget6 } from './Widget6';
import { Widget7 } from './Widget7';
import { Widget8 } from './Widget8';

// src/widgets/widgetRegistry.tsx
export type WidgetKey = 'widget1' | 'widget2' | 'widget3' | 'widget4' | 'widget5' | 'widget6' | 'widget7' | 'widget8';

export const widgetRegistry = {
	widget1: {
		id: 'widget1',
		name: 'Pie Chart - Donut with Text',
		description: 'Pie Chart - Donut with Text.',
		image: '@/../src/assets/weather.jpg',
		defaultW: 3,
		defaultH: 2,
		component: () => <Widget1 />,
	},
	widget2: {
		id: 'widget2',
		name: 'Bar Chart - Multiple',
		description: 'Bar Chart - Multiple.',
		image: '@/../src/assets/chart.jpg',
		defaultW: 3,
		defaultH: 2,
		component: () => <Widget2 />,
	},
	widget3: {
		id: 'widget3',
		name: 'Bar Chart - Custom Label',
		description: 'Bar Chart - Custom Label',
		image: '@/../src/assets/gender.jpg',
		defaultW: 3,
		defaultH: 2,
		component: () => <Widget3 />,
	},
	widget4: {
		id: 'widget4',
		name: 'Line Chart - Multiple',
		description: 'Line Chart - Multiple',
		image: '@/../src/assets/gender.jpg',
		defaultW: 3,
		defaultH: 2,
		component: () => <Widget4 />,
	},
	widget5: {
		id: 'widget5',
		name: 'Line Chart - Custom Label',
		description: 'Line Chart - Custom Label',
		image: '@/../src/assets/gender.jpg',
		defaultW: 3,
		defaultH: 2,
		component: () => <Widget5 />,
	},
	widget6: {
		id: 'widget6',
		name: 'Radar Chart - Lines Only',
		description: 'Radar Chart - Lines Only',
		image: '@/../src/assets/gender.jpg',
		defaultW: 3,
		defaultH: 2,
		component: () => <Widget6 />,
	},
	widget7: {
		id: 'widget7',
		name: 'Radial Chart - Grid',
		description: 'Radial Chart - Grid',
		image: '@/../src/assets/gender.jpg',
		defaultW: 3,
		defaultH: 2,
		component: () => <Widget7 />,
	},
	widget8: {
		id: 'widget8',
		name: 'Radial Chart - Stacked',
		description: 'Radial Chart - Stacked',
		image: '@/../src/assets/gender.jpg',
		defaultW: 3,
		defaultH: 2,
		component: () => <Widget8 />,
	},
};
