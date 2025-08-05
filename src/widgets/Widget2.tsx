'use client';

// import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from 'recharts';

import { WidgetCard } from './WidgetCard';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export const description = 'A multiple bar chart';

const chartData = [
	{ month: 'January', desktop: 186, mobile: 80 },
	{ month: 'February', desktop: 305, mobile: 200 },
	{ month: 'March', desktop: 237, mobile: 120 },
	{ month: 'April', desktop: 73, mobile: 190 },
	{ month: 'May', desktop: 209, mobile: 130 },
	{ month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'var(--chart-1)',
	},
	mobile: {
		label: 'Mobile',
		color: 'var(--chart-2)',
	},
} satisfies ChartConfig;

export function Widget2() {
	return (
		<WidgetCard title='Avg. Energy Consumption'>
			<div className='flex items-end space-x-1'>
				<h1 className='text-3xl text-pretty font-bold tracking-tighter'>2,589</h1>
				<span className='text-sm text-gray-500 tracking-tight'>bpm per day</span>
			</div>
			<ChartContainer config={chartConfig} className='w-full h-full [&_.recharts-responsive-container]:!h-full'>
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey='month' tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dashed' />} />
						<Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
						<Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
					</BarChart>
				</ResponsiveContainer>
			</ChartContainer>
		</WidgetCard>
	);
}
