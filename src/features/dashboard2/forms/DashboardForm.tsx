import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Button } from '@/components/ui/button';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { WidgetKey, widgetRegistry } from '@/widgets/WidgetRegistry';
import { WidgetSheet } from '@/components/WidgetSheet'; // Import the new component
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useResizeDetector } from 'react-resize-detector';

type DashboardWidget = {
	key: string;
	widgetKey: WidgetKey;
	w: number;
	h: number;
	x: number;
	y: number;
};

const STORAGE_KEY = 'dashboard-widgets';

const ResponsiveGridLayout = WidthProvider(Responsive);

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const cols = { lg: 12, md: 2, sm: 6, xs: 4, xxs: 2 };

const DashboardForm = () => {
	const { width, ref } = useResizeDetector();
	const [dashboardWidgets, setDashboardWidgets] = useState<DashboardWidget[]>([]);
	const [editMode, setEditMode] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);

	// Load from localStorage on mount
	useEffect(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			try {
				const parsed = JSON.parse(saved) as DashboardWidget[];
				setDashboardWidgets(parsed);
			} catch {
				console.warn('Invalid dashboard data in localStorage');
			}
		}
	}, []);

	const handleAddWidget = (widgetKey: WidgetKey) => {
		const def = widgetRegistry[widgetKey];
		const newWidget: DashboardWidget = {
			key: Date.now().toString(),
			widgetKey,
			w: def.minW,
			h: def.minH,
			x: 0,
			y: Infinity, // lets react-grid-layout auto-place it
		};
		setDashboardWidgets((prev) => [...prev, newWidget]);
	};

	const handleRemoveWidget = (key: string) => {
		console.log(`Removing widget with key: ${key}`);
		setDashboardWidgets((prev) => prev.filter((w) => w.key !== key));
	};

	// Save to localStorage when Done is clicked
	const handleDone = () => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(dashboardWidgets));
		setEditMode(false);
		setDrawerOpen(false);
	};

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

	return (
		<div>
			{/* Header */}
			<div className='p-4 border-b flex justify-between items-center'>
				<h2 className='text-xl font-semibold'>My Dashboard</h2>
				<Button
					onClick={
						editMode
							? handleDone
							: () => {
									setEditMode(true);
									setDrawerOpen(true);
								}
					}
				>
					{editMode ? 'Done' : 'Edit'}
				</Button>
			</div>

			{/* Dashboard Grid */}
			<div ref={ref} className='h-full w-full mt-2'>
				{width && (
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
						onLayoutChange={(newLayout) => {
							if (editMode) {
								setDashboardWidgets((prev) =>
									prev.map((widget) => {
										const def = widgetRegistry[widget.widgetKey];
										const updated = newLayout.find((l) => l.i === widget.key);
										if (!updated) return widget;
										// If minH === maxH, always restore the original height
										const fixedH = def.minH === def.maxH ? def.minH : updated.h;
										// If minW === maxW, always restore the original width
										const fixedW = def.minW === def.maxW ? def.minW : updated.w;
										return {
											...widget,
											w: fixedW,
											h: fixedH,
											x: updated.x,
											y: updated.y,
										};
									})
								);
							}
						}}
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
												handleRemoveWidget(w.key);
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
				)}
			</div>

			{/* Widget Sheet Component */}
			<WidgetSheet open={drawerOpen} onOpenChange={setDrawerOpen} onAddWidget={handleAddWidget} />
		</div>
	);
};

export default DashboardForm;
