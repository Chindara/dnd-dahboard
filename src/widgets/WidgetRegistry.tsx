import { WidgetGroup, WidgetKey } from '@/types/DashboardWidget';
import { AverageCheckInTile } from './AverageCheckInTile';
import { AverageCheckOutTile } from './AverageCheckOutTile';
import { AverageHoursTile } from './AverageHoursTile';
import { MyAttendance } from './MyAttendance';
import { OnTimeArrivalTile } from './OnTimeArrivalTile';
import { TotalEmployeesChart } from './TotalEmployeesChart';
import { TotalSolarSales } from './TotalSolarSales';
import { Widget2 } from './Widget2';
import { Widget3 } from './Widget3';
import { Widget4 } from './Widget4';
import { Widget5 } from './Widget5';
import { Widget6 } from './Widget6';
import { Widget7 } from './Widget7';
import { Widget8 } from './Widget8';

import imgTotalSolarSales from '@/assets/totalSolarSales.png';
import imgWidget1 from '@/assets/Widget1.png';
import imgWidget2 from '@/assets/Widget2.png';
import imgWidget3 from '@/assets/Widget3.png';
import imgWidget4 from '@/assets/Widget4.png';
import imgWidget5 from '@/assets/Widget5.png';
import imgWidget6 from '@/assets/Widget6.png';
import imgWidget7 from '@/assets/Widget7.png';
import imgWidget8 from '@/assets/Widget8.png';
import imgAverageHours from '@/assets/averageHours.png';
import imgAverageCheckIn from '@/assets/averageCheckIn.png';
import imgAverageCheckOut from '@/assets/averageCheckOut.png';
import imgOnTimeArrival from '@/assets/onTimeArrival.png';
import imgMyAttendance from '@/assets/myAttendance.png';

// src/widgets/widgetRegistry.tsx

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
	totalSolarSales: {
		id: 'totalSolarSales',
		name: 'Total Solar Sales',
		description: 'Total solar sales made.',
		image: imgTotalSolarSales,
		group: 'Sales',
		minW: 2,
		minH: 2,
		maxW: 2,
		maxH: 2,
		component: () => <TotalSolarSales />,
	},

	totalEmployees: {
		id: 'totalEmployees',
		name: 'Total Employees',
		description: 'Total number of employees.',
		image: imgWidget1,
		group: 'Analytics',
		minW: 2,
		minH: 3,
		maxW: 4,
		maxH: 6,
		component: () => <TotalEmployeesChart />,
	},
	widget2: {
		id: 'widget2',
		name: 'Revenue Chart',
		description: 'A chart showing revenue over time.',
		image: imgWidget2,
		group: 'Charts',
		minW: 4,
		minH: 4,
		maxW: 6,
		maxH: 4,
		component: () => <Widget2 />,
	},
	widget3: {
		id: 'widget3',
		name: 'Bar Chart - Custom Label',
		description: 'Bar Chart - Custom Label',
		image: imgWidget3,
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
		image: imgWidget4,
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
		image: imgWidget5,
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
		image: imgWidget6,
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
		image: imgWidget7,
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
		image: imgWidget8,
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
		image: imgAverageHours,
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
		image: imgAverageCheckIn,
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
		image: imgAverageCheckOut,
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
		image: imgOnTimeArrival,
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
		image: imgMyAttendance,
		group: 'Personal',
		minW: 3,
		minH: 4,
		maxW: 3,
		maxH: 4,
		component: () => <MyAttendance />,
	},
};
