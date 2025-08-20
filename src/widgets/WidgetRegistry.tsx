import { AverageCheckInTile } from './AverageCheckInTile';
import { AverageCheckOutTile } from './AverageCheckOutTile';
import { AverageHoursTile } from './AverageHoursTile';
import { MyAttendance } from './MyAttendance';
import { OnTimeArrivalTile } from './OnTimeArrivalTile';
import { TotalEmployeesChart } from './TotalEmployeesChart';
import { Widget2 } from './Widget2';
import { Widget3 } from './Widget3';
import { Widget4 } from './Widget4';
import { Widget5 } from './Widget5';
import { Widget6 } from './Widget6';
import { Widget7 } from './Widget7';
import { Widget8 } from './Widget8';

// src/widgets/widgetRegistry.tsx
export type WidgetKey =
	| 'totalEmployees'
	| 'widget2'
	| 'widget3'
	| 'widget4'
	| 'widget5'
	| 'widget6'
	| 'widget7'
	| 'widget8'
	| 'averageHours'
	| 'averageCheckIn'
	| 'averageCheckOut'
	| 'onTimeArrival'
	| 'myAttendance';

export type WidgetGroup = 'Analytics' | 'Charts' | 'Attendance' | 'Personal';

export interface WidgetConfig {
	id: string;
	name: string;
	description: string;
	image: string;
	group: WidgetGroup;
	minW: number;
	minH: number;
	maxW: number;
	maxH: number;
	component: () => JSX.Element;
}

export const widgetRegistry: Record<WidgetKey, WidgetConfig> = {
	totalEmployees: {
		id: 'totalEmployees',
		name: 'Total Employees',
		description: 'Total number of employees.',
		image: '@/../src/assets/Widget1.png',
		group: 'Analytics',
		minW: 1,
		minH: 2,
		maxW: 4,
		maxH: 6,
		component: () => <TotalEmployeesChart />,
	},
	widget2: {
		id: 'widget2',
		name: 'Bar Chart - Multiple',
		description: 'Bar Chart - Multiple.',
		image: '@/../src/assets/Widget2.png',
		group: 'Charts',
		minW: 2,
		minH: 2,
		maxW: 6,
		maxH: 4,
		component: () => <Widget2 />,
	},
	widget3: {
		id: 'widget3',
		name: 'Bar Chart - Custom Label',
		description: 'Bar Chart - Custom Label',
		image: '@/../src/assets/Widget3.png',
		group: 'Charts',
		minW: 2,
		minH: 2,
		maxW: 4,
		maxH: 4,
		component: () => <Widget3 />,
	},
	widget4: {
		id: 'widget4',
		name: 'Line Chart - Multiple',
		description: 'Line Chart - Multiple',
		image: '@/../src/assets/Widget4.png',
		group: 'Charts',
		minW: 3,
		minH: 2,
		maxW: 3,
		maxH: 4,
		component: () => <Widget4 />,
	},
	widget5: {
		id: 'widget5',
		name: 'Line Chart - Custom Label',
		description: 'Line Chart - Custom Label',
		image: '@/../src/assets/Widget5.png',
		group: 'Charts',
		minW: 2,
		minH: 2,
		maxW: 6,
		maxH: 4,
		component: () => <Widget5 />,
	},
	widget6: {
		id: 'widget6',
		name: 'Radar Chart - Lines Only',
		description: 'Radar Chart - Lines Only',
		image: '@/../src/assets/Widget6.png',
		group: 'Charts',
		minW: 2,
		minH: 2,
		maxW: 4,
		maxH: 4,
		component: () => <Widget6 />,
	},
	widget7: {
		id: 'widget7',
		name: 'Radial Chart - Grid',
		description: 'Radial Chart - Grid',
		image: '@/../src/assets/Widget7.png',
		group: 'Charts',
		minW: 4,
		minH: 4,
		maxW: 6,
		maxH: 8,
		component: () => <Widget7 />,
	},
	widget8: {
		id: 'widget8',
		name: 'Radial Chart - Stacked',
		description: 'Radial Chart - Stacked',
		image: '@/../src/assets/Widget8.png',
		group: 'Charts',
		minW: 2,
		minH: 2,
		maxW: 4,
		maxH: 4,
		component: () => <Widget8 />,
	},
	averageHours: {
		id: 'averageHours',
		name: 'Average Hours Worked',
		description: 'Average hours worked by employees.',
		image: '@/../src/assets/Widget8.png',
		group: 'Attendance',
		minW: 2,
		minH: 2,
		maxW: 2,
		maxH: 2,
		component: () => <AverageHoursTile />,
	},
	averageCheckIn: {
		id: 'averageCheckIn',
		name: 'Average Check-In Time',
		description: 'Average check-in time of employees.',
		image: '@/../src/assets/Widget9.png',
		group: 'Attendance',
		minW: 2,
		minH: 2,
		maxW: 2,
		maxH: 2,
		component: () => <AverageCheckInTile />,
	},
	averageCheckOut: {
		id: 'averageCheckOut',
		name: 'Average Check-Out Time',
		description: 'Average check-out time of employees.',
		image: '@/../src/assets/Widget10.png',
		group: 'Attendance',
		minW: 2,
		minH: 2,
		maxW: 2,
		maxH: 2,
		component: () => <AverageCheckOutTile />,
	},
	onTimeArrival: {
		id: 'onTimeArrival',
		name: 'On-Time Arrival Rate',
		description: 'On-time arrival rate of employees.',
		image: '@/../src/assets/Widget11.png',
		group: 'Attendance',
		minW: 2,
		minH: 2,
		maxW: 2,
		maxH: 2,
		component: () => <OnTimeArrivalTile />,
	},
	myAttendance: {
		id: 'myAttendance',
		name: 'My Attendance',
		description: 'View my attendance details.',
		image: '@/../src/assets/MyAttendance.png',
		group: 'Personal',
		minW: 3,
		minH: 4,
		maxW: 3,
		maxH: 4,
		component: () => <MyAttendance />,
	},
};
