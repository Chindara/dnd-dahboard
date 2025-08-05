import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { WidgetCard } from './WidgetCard';

export const description = 'A multiple line chart';

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

export function Widget4() {
	return (
		<WidgetCard title='Line Chart - Multiple'>
			<ChartContainer config={chartConfig} className='w-full h-full [&_.recharts-responsive-container]:!h-full'>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<Line dataKey='desktop' type='monotone' stroke='var(--color-desktop)' strokeWidth={2} dot={false} />
						<Line dataKey='mobile' type='monotone' stroke='var(--color-mobile)' strokeWidth={2} dot={false} />
					</LineChart>
				</ResponsiveContainer>
			</ChartContainer>
		</WidgetCard>
	);
}
