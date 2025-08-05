import * as React from 'react';
import { Label, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { WidgetCard } from './WidgetCard';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export const description = 'A donut chart with text';

const chartData = [
	{ browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
	{ browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
	{ browser: 'firefox', visitors: 287, fill: 'var(--color-firefox)' },
	{ browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
	{ browser: 'other', visitors: 190, fill: 'var(--color-other)' },
];

const chartConfig = {
	visitors: {
		label: 'Visitors',
	},
	chrome: {
		label: 'Chrome',
		color: 'var(--chart-1)',
	},
	safari: {
		label: 'Safari',
		color: 'var(--chart-2)',
	},
	firefox: {
		label: 'Firefox',
		color: 'var(--chart-3)',
	},
	edge: {
		label: 'Edge',
		color: 'var(--chart-4)',
	},
	other: {
		label: 'Other',
		color: 'var(--chart-5)',
	},
} satisfies ChartConfig;

export function Widget1() {
	const totalVisitors = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
	}, []);

	return (
		<WidgetCard title='Pie Chart - Donut with Text'>
			<div className='flex items-end space-x-2'>
				<h1 className='text-3xl text-pretty font-bold tracking-tighter'>1125</h1>
				<span className='text-sm text-gray-500'>Visitors</span>
			</div>
			<ChartContainer config={chartConfig} className='w-full h-full [&_.recharts-responsive-container]:!h-full'>
				<ResponsiveContainer width='100%' height='100%'>
					<PieChart>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Pie data={chartData} dataKey='visitors' nameKey='browser' innerRadius={60} strokeWidth={5}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
												<tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold'>
													{totalVisitors.toLocaleString()}
												</tspan>
												<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
													Visitors
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</ChartContainer>
		</WidgetCard>
	);
}
