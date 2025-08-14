import React from 'react';

interface LegendItem {
	label: string;
	value: number;
	color: string;
}

interface CustomChartLegendProps {
	items: LegendItem[];
	width?: number;
}

export const CustomChartLegend: React.FC<CustomChartLegendProps> = ({ items, width }) => {
	return (
		<div className={`flex flex-col justify-center items-left gap-2 h-full w-${width}`}>
			{items.map((entry, index) => (
				<div key={index} className='flex items-center gap-2'>
					<span className='w-3 h-3 rounded-sm' style={{ backgroundColor: entry.color }} />
					<span className='text-sm text-foreground'>{entry.value}</span>
					<span className='text-sm text-muted-foreground'>{entry.label}</span>
				</div>
			))}
		</div>
	);
};
