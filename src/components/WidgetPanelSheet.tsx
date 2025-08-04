import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type WidgetKey = string;

type Widget = {
	key: WidgetKey;
	name: string;
	description: string;
	image: string;
};

interface WidgetPanelSheetProps {
	open: boolean;
	onClose: () => void;
	widgets: Widget[];
	onAdd: (key: WidgetKey) => void;
}

export function WidgetPanelSheet({ open, onClose, widgets, onAdd }: WidgetPanelSheetProps) {
	const [selectedWidgetKey, setSelectedWidgetKey] = useState<WidgetKey | null>(null);

	return (
		<Sheet open={open} onOpenChange={onClose}>
			<SheetContent side='right' className='w-[400px] flex flex-col'>
				<SheetHeader>
					<SheetTitle>Select a Widget</SheetTitle>
				</SheetHeader>

				<div className='flex-1 overflow-y-auto mt-4 space-y-2 pr-2'>
					{widgets.map((widget) => (
						<div
							key={widget.key}
							onClick={() => setSelectedWidgetKey(widget.key)}
							className={cn(
								'flex gap-3 items-start p-3 rounded-sm cursor-pointer transition',
								selectedWidgetKey === widget.key ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-100'
							)}
						>
							<div className='w-1/3'>
								<img src={widget.image} alt={widget.name} className='w-full h-auto object-contain' />
							</div>
							<div className='w-2/3'>
								<h4 className='text-sm font-semibold text-gray-900'>{widget.name}</h4>
								<p className='text-sm text-gray-600'>{widget.description}</p>
							</div>
						</div>
					))}
				</div>

				<div className='p-4 border-t mt-2'>
					<Button
						className='w-full'
						disabled={!selectedWidgetKey}
						onClick={() => {
							if (selectedWidgetKey) {
								onAdd(selectedWidgetKey);
								setSelectedWidgetKey(null);
								onClose();
							}
						}}
					>
						Add Widget
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
