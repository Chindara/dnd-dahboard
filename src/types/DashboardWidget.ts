export type DashboardWidget = {
	key: string;
	widgetKey: WidgetKey;
	w: number;
	h: number;
	x: number;
	y: number;
};

export type DashboardTab = {
	id: string;
	label: string;
	widgets: DashboardWidget[];
};

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
	| 'myAttendance'
	| 'totalSolarSales';

export type WidgetGroup = 'Analytics' | 'Charts' | 'Attendance' | 'Personal' | 'Sales';
