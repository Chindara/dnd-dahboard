import { PolarGrid, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { WidgetCard } from './WidgetCard';

export const description = 'A radial chart with a grid';

const chartData = [
	{ browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
	{ browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
	{ browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
	{ browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
	{ browser: 'other', visitors: 90, fill: 'var(--color-other)' },
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

export function Widget7() {
	return (
		<WidgetCard title='Radial Chart - Grid' count={chartData.reduce((acc, curr) => acc + curr.visitors, 0)} unit='visitors'>
			<ChartContainer config={chartConfig} className='w-full h-full [&_.recharts-responsive-container]:!h-full'>
				<ResponsiveContainer width='100%' height='100%'>
					<RadialBarChart data={chartData} innerRadius={30} outerRadius={100}>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey='browser' />} />
						<PolarGrid gridType='circle' />
						<RadialBar dataKey='visitors' />
					</RadialBarChart>
				</ResponsiveContainer>
			</ChartContainer>
		</WidgetCard>
	);
}
