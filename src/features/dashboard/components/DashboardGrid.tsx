import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { widgetRegistry } from '@/widgets/WidgetRegistry';
import { WidgetKey } from '@/types/DashboardWidget';

type DashboardWidget = {
	key: string;
	widgetKey: WidgetKey;
	w: number;
	h: number;
	x: number;
	y: number;
};

const ResponsiveGridLayout = WidthProvider(Responsive);

type DashboardGridProps = {
	width: number;
	editMode: boolean;
	dashboardWidgets: DashboardWidget[];
	onWidgetsChange: (widgets: DashboardWidget[]) => void;
};

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const cols = { lg: 12, md: 2, sm: 6, xs: 4, xxs: 2 };

export const DashboardGrid: React.FC<DashboardGridProps> = ({ width, editMode, dashboardWidgets, onWidgetsChange }) => {
	// Layouts for all breakpoints
	const layouts = {
		lg: dashboardWidgets.map((w) => {
			const def = widgetRegistry[w.widgetKey];
			return {
				i: w.key,
				x: w.x ?? 0,
				y: w.y ?? 0,
				w: w.w,
				h: w.h,
				minW: def.minW,
				maxW: def.maxW,
				minH: def.minH,
				maxH: def.maxH,
			};
		}),
	};

	const handleLayoutChange = (newLayout: ReactGridLayout.Layout[]) => {
		if (!editMode) return;

		const updatedWidgets = dashboardWidgets.map((widget) => {
			const def = widgetRegistry[widget.widgetKey];
			const updated = newLayout.find((l) => l.i === widget.key);
			if (!updated) return widget;

			const fixedH = def.minH === def.maxH ? def.minH : updated.h;
			const fixedW = def.minW === def.maxW ? def.minW : updated.w;

			return { ...widget, w: fixedW, h: fixedH, x: updated.x, y: updated.y };
		});

		onWidgetsChange(updatedWidgets);
	};

	const handleRemove = (key: string) => {
		const updated = dashboardWidgets.filter((w) => w.key !== key);
		onWidgetsChange(updated);
	};

	return (
		<ResponsiveGridLayout
			className={cn('layout', editMode && 'grid-background')}
			layouts={layouts}
			verticalCompact={true}
			breakpoints={breakpoints}
			cols={cols}
			rowHeight={75}
			width={width - 32}
			margin={[4, 4]}
			containerPadding={[0, 0]}
			isDraggable={editMode}
			isResizable={editMode}
			draggableCancel='.widget-delete-btn'
			autoSize={true}
			onLayoutChange={handleLayoutChange}
		>
			{dashboardWidgets.map((w) => {
				const WidgetComponent = widgetRegistry[w.widgetKey].component;
				return (
					<div key={w.key} className='relative widget-container'>
						{editMode && (
							<Button
								className='widget-delete-btn absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white z-50 h-6 w-6 p-0'
								onClick={(e) => {
									e.stopPropagation();
									handleRemove(w.key);
								}}
								onMouseDown={(e) => e.stopPropagation()}
							>
								<X className='h-6 w-6' />
							</Button>
						)}
						<WidgetComponent />
					</div>
				);
			})}
		</ResponsiveGridLayout>
	);
};
