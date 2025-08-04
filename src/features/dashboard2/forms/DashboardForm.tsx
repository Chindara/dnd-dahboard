import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { WidgetKey, widgetRegistry } from '@/widgets/WidgetRegistry';
import { EllipsisVertical, X } from 'lucide-react';
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
			w: def.defaultW,
			h: def.defaultH,
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

	const layout = dashboardWidgets.map((w) => ({
		i: w.key,
		x: w.x ?? 0,
		y: w.y ?? Infinity,
		w: w.w,
		h: w.h,
	}));

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
					<GridLayout
						layout={layout}
						cols={12}
						rowHeight={124}
						width={width}
						isDraggable={editMode}
						isResizable={false}
						onLayoutChange={(newLayout) => {
							if (editMode) {
								setDashboardWidgets((prev) =>
									prev.map((widget) => {
										const updated = newLayout.find((l) => l.i === widget.key);
										return updated ? { ...widget, w: updated.w, h: updated.h, x: updated.x, y: updated.y } : widget;
									})
								);
							}
						}}
					>
						{dashboardWidgets.map((w) => {
							const WidgetComponent = widgetRegistry[w.widgetKey].component;
							return (
								<div key={w.key} className='relative bg-green-500'>
									{editMode && (
										<Button className='absolute top-1 right-1 bg-red-500 text-white rounded-full z-50' onClick={() => handleRemoveWidget(w.key)}>
											<X />
										</Button>
									)}
									<WidgetComponent />
								</div>
							);
						})}
					</GridLayout>
				)}
			</div>

			{/* Right-Side Widget Library */}
			<Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
				<SheetContent side='right' className='w-[400px] flex flex-col bg-white dark:bg-gray-900'>
					<SheetHeader>
						<SheetTitle>Add Widgets</SheetTitle>
					</SheetHeader>
					<SheetDescription>Make changes to your profile here. Click save when you&apos;re done.</SheetDescription>
					<div className='space-y-2 overflow-y-auto flex-1'>
						{Object.entries(widgetRegistry).map(([key, widget]) => (
							<div
								key={key}
								onClick={() => setSelectedWidgetKey(key as WidgetKey)}
								className={cn(
									'flex gap-3 items-start p-3 rounded-sm cursor-pointer transition',
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
