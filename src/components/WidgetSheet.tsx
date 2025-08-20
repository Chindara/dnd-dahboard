import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { widgetRegistry, WidgetKey, WidgetGroup } from '@/widgets/WidgetRegistry';

interface WidgetSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onAddWidget: (key: WidgetKey) => void;
}

export function WidgetSheet({ open, onOpenChange, onAddWidget }: WidgetSheetProps) {
	const [selectedWidgetKey, setSelectedWidgetKey] = useState<WidgetKey | null>(null);
	const [searchQuery, setSearchQuery] = useState('');

	// Group widgets by their group property and filter by search
	const groupedWidgets = useMemo(() => {
		const filtered = Object.entries(widgetRegistry).filter(([_, widget]) => widget.name.toLowerCase().includes(searchQuery.toLowerCase()));

		const grouped = filtered.reduce(
			(acc, [key, widget]) => {
				if (!acc[widget.group]) {
					acc[widget.group] = [];
				}
				acc[widget.group].push({ key: key as WidgetKey, ...widget });
				return acc;
			},
			{} as Record<WidgetGroup, Array<(typeof widgetRegistry)[WidgetKey] & { key: WidgetKey }>>
		);

		return grouped;
	}, [searchQuery]);

	// Define the order of groups
	const groupOrder: WidgetGroup[] = ['Analytics', 'Charts', 'Attendance', 'Personal', 'Sales'];

	// Handle widget addition
	const handleAddWidget = () => {
		if (selectedWidgetKey) {
			onAddWidget(selectedWidgetKey);
			setSelectedWidgetKey(null);
			// Don't close the sheet, just clear selection
		}
	};

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side='right' className='w-[640px] sm:max-w-[640px] flex flex-col bg-white dark:bg-gray-900'>
				<SheetHeader>
					<SheetTitle>Add Widgets</SheetTitle>
					<SheetDescription>Browse and add widgets to your dashboard. Use search to find specific widgets.</SheetDescription>
				</SheetHeader>

				{/* Search Box */}
				<div className='relative mt-4'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
					<Input
						type='text'
						placeholder='Search widgets by name...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='pl-9 pr-4 py-2 w-full border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				{/* Widget Groups */}
				<div className='flex-1 overflow-y-auto mt-4 space-y-6 pb-4'>
					{groupOrder.map((groupName) => {
						const widgets = groupedWidgets[groupName];
						if (!widgets || widgets.length === 0) return null;

						return (
							<div key={groupName} className='space-y-3'>
								{/* Group Header */}
								<div className='sticky top-0 bg-white dark:bg-gray-900 py-2 z-10'>
									<h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1'>{groupName}</h3>
								</div>

								{/* Widget Grid - 2 Columns */}
								<div className='grid grid-cols-2 gap-3'>
									{widgets.map((widget) => (
										<div
											key={widget.key}
											onClick={() => setSelectedWidgetKey(widget.key)}
											className={cn(
												'flex flex-col p-3 rounded-lg cursor-pointer transition-all duration-200 border',
												selectedWidgetKey === widget.key
													? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 shadow-md ring-2 ring-blue-500/20'
													: 'bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
											)}
										>
											{/* Widget Preview Image with Size Badge Overlay */}
											<div className='relative aspect-video w-full mb-3 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700'>
												<img src={widget.image} alt={widget.name} className='w-full h-full object-cover' />
												{/* Size Badge Overlay */}
												<span className='absolute top-2 right-2 inline-flex items-center px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm text-xs text-white font-medium'>
													{widget.minW}×{widget.minH}
												</span>
											</div>

											{/* Widget Info */}
											<div className='flex-1 space-y-1'>
												<h4 className='text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1'>{widget.name}</h4>
												<p className='text-xs text-gray-600 dark:text-gray-400 line-clamp-2 min-h-[2rem]'>{widget.description}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						);
					})}

					{/* No results message */}
					{Object.keys(groupedWidgets).length === 0 && (
						<div className='flex flex-col items-center justify-center py-16 text-gray-500'>
							<div className='rounded-full bg-gray-100 dark:bg-gray-800 p-4 mb-4'>
								<Search className='h-8 w-8 text-gray-400' />
							</div>
							<p className='text-sm font-medium'>No widgets found</p>
							<p className='text-xs mt-1'>Try searching with a different term</p>
						</div>
					)}
				</div>

				{/* Footer with Add Button */}
				<div className='pt-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'>
					<Button className='w-full' size='lg' disabled={!selectedWidgetKey} onClick={handleAddWidget}>
						{selectedWidgetKey ? `Add ${widgetRegistry[selectedWidgetKey].name}` : 'Select a Widget to Add'}
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
