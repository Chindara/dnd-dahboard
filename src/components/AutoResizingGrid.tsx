// src/components/AutoResizingGrid.tsx
import { WidgetKey, widgetRegistry } from '@/widgets/WidgetRegistry';
import { X } from 'lucide-react';
import React from 'react';
import GridLayout from 'react-grid-layout';
import { useResizeDetector } from 'react-resize-detector';

type DashboardWidget = {
	key: string;
	widgetKey: WidgetKey;
	w: number;
	h: number;
};

interface Props {
	dashboardWidgets: DashboardWidget[];
	setDashboardWidgets: React.Dispatch<React.SetStateAction<DashboardWidget[]>>;
}

export function AutoResizingGrid({ dashboardWidgets, setDashboardWidgets }: Props) {
	const { width, ref } = useResizeDetector();

	const layout = dashboardWidgets.map((w, index) => ({
		i: w.key,
		x: (index * 2) % 12,
		y: Infinity,
		w: w.w,
		h: w.h,
	}));

	return (
		<div ref={ref} className='h-full w-full overflow-auto'>
			{width && (
				<GridLayout
					className='layout'
					layout={layout}
					cols={12}
					rowHeight={100}
					width={width}
					isDraggable={editMode}
					isResizable={false}
					onLayoutChange={(newLayout) => {
						if (editMode) {
							setDashboardWidgets((prev) =>
								prev.map((widget) => {
									const updated = newLayout.find((l) => l.i === widget.key);
									return updated ? { ...widget, w: updated.w, h: updated.h } : widget;
								})
							);
						}
					}}
					draggableHandle='.widget-header'
				>
					{dashboardWidgets.map((w) => {
						const WidgetComponent = widgetRegistry[w.widgetKey].component;
						return (
							<div key={w.key} className='bg-white dark:bg-gray-900 rounded shadow-md relative overflow-hidden'>
								{editMode && (
									<button onClick={() => handleRemoveWidget(w.key)} className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 z-10'>
										<X size={16} />
									</button>
								)}
								<div className='p-2'>
									<WidgetComponent />
								</div>
							</div>
						);
					})}
				</GridLayout>
			)}
		</div>
	);
}
