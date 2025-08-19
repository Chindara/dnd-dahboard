import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { WidgetKey, widgetRegistry } from '@/widgets/WidgetRegistry';
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
	const [selectedWidgetKey, setSelectedWidgetKey] = useState<WidgetKey | null>(null);
	const [editMode, setEditMode] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);

	// 🔹 Load from localStorage on mount
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

	// 🔹 Save to localStorage when Done is clicked
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
			<div ref={ref} className='h-full w-full'>
				{width && (
					<ResponsiveGridLayout
						className='layout grid-background'
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

			{/* Right-Side Widget Library */}
			<Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
				<SheetContent side='right' className='w-[400px] flex flex-col bg-white dark:bg-gray-900'>
					<SheetHeader>
						<SheetTitle>Add Widgets</SheetTitle>
					</SheetHeader>
					<SheetDescription>Make changes to your profile here. Click save when you&apos;re done.</SheetDescription>
					<div className='space-y-1 overflow-y-auto flex-1'>
						{Object.entries(widgetRegistry).map(([key, widget]) => (
							<div
								key={key}
								onClick={() => setSelectedWidgetKey(key as WidgetKey)}
								className={cn(
									'flex gap-2 items-start p-2 rounded-sm cursor-pointer transition',
									selectedWidgetKey === key ? 'bg-blue-100 dark:bg-blue-900/40 border-l-4 border-blue-500' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
								)}
							>
								<div className='w-1/3 aspect-square'>
									<img src={widget.image} alt={widget.name} className='w-full h-full object-cover rounded' />
								</div>
								<div className='w-2/3'>
									<h4 className='text-sm font-semibold text-gray-900 dark:text-gray-100'>{widget.name}</h4>
									<p className='text-sm text-gray-600 dark:text-gray-400'>{widget.description}</p>
								</div>
							</div>
						))}
					</div>

					<div className='pt-4 border-t mt-4'>
						<Button
							className='w-full'
							disabled={!selectedWidgetKey}
							onClick={() => {
								if (selectedWidgetKey) {
									handleAddWidget(selectedWidgetKey);
									setSelectedWidgetKey(null);
								}
							}}
						>
							Add Widget
						</Button>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default DashboardForm;
