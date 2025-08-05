import { CartesianGrid, LabelList, Line, LineChart, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { WidgetCard } from './WidgetCard';

export const description = 'A line chart with a custom label';

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
		color: 'var(--chart-2)',
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

export function Widget5() {
	return (
		<WidgetCard title='Line Chart - Custom Label'>
			<ChartContainer config={chartConfig} className='w-full h-full [&_.recharts-responsive-container]:!h-full'>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 24,
							left: 24,
							right: 24,
						}}
					>
						<CartesianGrid vertical={false} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' nameKey='visitors' hideLabel />} />
						<Line
							dataKey='visitors'
							type='natural'
							stroke='var(--color-visitors)'
							strokeWidth={2}
							dot={{
								fill: 'var(--color-visitors)',
							}}
							activeDot={{
								r: 6,
							}}
						>
							<LabelList
								position='top'
								offset={12}
								className='fill-foreground'
								fontSize={12}
								dataKey='browser'
								formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
							/>
						</Line>
					</LineChart>
				</ResponsiveContainer>
			</ChartContainer>
		</WidgetCard>
	);
}
